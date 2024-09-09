"use client";
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './[id]/_components/ExpenseListTable'
import { budgets, expenses } from '@/app/utils/schema'
import { useUser } from '@clerk/nextjs';
import db from '@/app/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';

interface  budgetlistProps  {
   amount : number ,
   createdBy : string , 
   icon : string |null , 
   id : number , 
   name : string , 
   totalItems : number , 
   totalspend : number 
 }
 type expensesInfoProps = {
   id : number ; 
   ename : string ; 
   amount : number ; 
   budgetId ?: number  ; 
   createdAt : string ; 
 }

const ExpensePage = () => {

    const { user } = useUser();

    const [ budgetlist  , setBudgetlist ] = useState<Array<budgetlistProps>>([]);
  
    const [ expenselist , setExpenselist ] = useState<Array<expensesInfoProps>>([]);
    
    useEffect(() => {
      user && getBudgetList();
   }); // removed [user] 
  
  
   const getBudgetList  = async  () =>{
       const result  = await db.select({
          ...getTableColumns(budgets), // budgets ka all columns we are getting 
          totalspend : sql `sum(${expenses.amount})`.mapWith(Number), // we also need this column from expense table , but we want total sum only 
          totalItems : sql  `count(${expenses.id})`.mapWith(Number),
          amount: sql`${budgets.amount}::numeric`.mapWith(Number),
       }).from(budgets)          // from first table budgets then we need to do left join with expense table
       .leftJoin(expenses , eq(budgets.id , expenses.budgetId))
       .where(eq(budgets.createdBy , `${user?.primaryEmailAddress?.emailAddress}`))
       .groupBy(budgets.id)
       .orderBy(desc(budgets.id))
  
       setBudgetlist(result); 
       GetAllExpenses();
       console.log(result);
   }
  
  
   const GetAllExpenses = async () => {
       const result  = await db.select({
          id : expenses.id , 
          ename : expenses.ename , 
          amount: sql`${expenses.amount}::numeric`.mapWith(Number),
          createdAt : expenses.createdAt
       }).from(budgets)
       .rightJoin(expenses , eq(budgets.id , expenses.budgetId))
       .where(eq(budgets.createdBy , `${user?.primaryEmailAddress?.emailAddress}`))
       .orderBy(desc(expenses.id))
  
       setExpenselist(result);
  
   }  
  return (
    <div>
       <ExpenseListTable expensesInfo={expenselist} refereshData={() => getBudgetList()} className='w-full'/>
    </div>
  )
}

export default ExpensePage
