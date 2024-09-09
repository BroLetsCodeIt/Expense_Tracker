"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import db from "@/app/utils/dbConfig";
import { budgets, expenses } from "@/app/utils/schema";
import { getTableColumns, sql, eq, desc, and } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "./_components/AddExpense";
import ExpenseListTable from "./_components/ExpenseListTable";
import { Trash } from "lucide-react";
import { Pencil } from 'lucide-react';

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EditBudget from "./_components/EditBudget";
interface BudgetInfoProps {
  id: number;
  amount: number;
  createdBy: string;
  icon: string ;
  name: string;
  totalItems: number;
  totalspend: number;
}
interface expensesShowProps {
  id: number;
  amount: number;
  ename: string;
  budgetId?: number;
  createdAt: string;
}

// interface BudgetInfoProps {
//   id: number;
//   amount: number;
//   createdBy: string;
//   icon: string;
//   name: string;
// }

const ExpensePage = ({ params }: { params: { id: number } }) => {
  const { user } = useUser();

  const router = useRouter() ;

  const [budgetInfo, setBudgetInfo] = useState<BudgetInfoProps>();

  const [expensesInfo, setExpensesInfo] = useState<expensesShowProps[]>([]);

  useEffect(() => {
    if (user) {
      getExpenseInfo();
    }
  }, ); // removed [user]

  const getExpenseInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(budgets),
        totalspend: sql`sum(${expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${expenses.id})`.mapWith(Number),
        amount: sql`${budgets.amount}::numeric`.mapWith(Number),
        icon : sql `${budgets.icon}::varchar`.mapWith(String)
      })
      .from(budgets)
      .leftJoin(expenses, eq(budgets.id, expenses.budgetId))
      .where(
        and(
          eq(budgets.createdBy, `${user?.primaryEmailAddress?.emailAddress}`),
          eq(budgets.id, params.id)
        )
      )
      .groupBy(budgets.id)
      .orderBy(desc(budgets.id));

    setBudgetInfo(result[0]);

    getExpensesList();
    //   console.log("result " , result);
  };

  const getExpensesList = async () => {
    const result = await db
      .select({
        id : expenses.id , 
        ename : expenses.ename , 
        amount: sql`${expenses.amount}::numeric`.mapWith(Number),
        createdAt : expenses.createdAt
      })
      .from(expenses)
      .where(eq(expenses.budgetId, params.id))
      .orderBy(desc(expenses.id));

    setExpensesInfo(result);

    // console.log("result", result);
  };

   // each budget is connected to some expenses . so first we need to delete all expenses then we will delete the budget . 
  const deleteBudget = async () => { 

       const deleteExpenseResult = await db.delete(expenses)
       .where(eq(expenses.budgetId , params.id))
       .returning()

    
       if(deleteExpenseResult) { 
         const result = await db.delete(budgets).where(eq(budgets.id , params.id)).returning();
         console.log(result);
       } 

       toast("Budget Deleted Successfully");

       router.replace('/dashboard/budgets');


   
       
  }

  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <h2 className="text-4xl font-bold tracking-tighter pb-10">
          My Expenses.
        </h2>
        <div className="flex items-center gap-4">
          { budgetInfo && 
         <EditBudget budgetInfo = {budgetInfo}  refereshData={() => getExpenseInfo() }/>
           }
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="bg-red-400 px-2 py-1 rounded-md text-sm flex items-center gap-2 justify-between tracking-tighter">
              Delete <Trash className="size-4" />{" "}
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Budget and all of its expenses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>  
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          [1].map((_, ind) => {
            return (
              <div
                className="rounded-md bg-slate-200 p-10 w-[23rem] h-[10rem] animate-pulse "
                key={ind}
              ></div>
            );
          })
        )}
        <AddExpense
          budgetId={params.id}
          refereshData={() => getExpenseInfo()}
        />
      </div>
      <div>
        <ExpenseListTable
          expensesInfo={expensesInfo}
          refereshData={() => getExpenseInfo()}
        />
      </div>
    </div>
  );
};

export default ExpensePage;
