import db from "@/app/utils/dbConfig";
import { budgets, expenses } from "@/app/utils/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const AddExpense = ( {budgetId  , refereshData} : {budgetId : number , refereshData : () => void} ) => {

  const [ expensename , setExpensesName ] = useState<string>("") ; 
  
  const [ expenseamount , setExpenseAmount ] = useState<number>(0) ; 

  const addNewExpense = async () => {
     
        const result = await db.insert(expenses).values({
          amount : expenseamount.toString(), 
          ename : expensename , 
           budgetId : budgetId  , 
           createdAt : new Date().toLocaleDateString()
        }).returning({ insertedId : budgets.id})

        if(result){
            refereshData();
            toast("New Expenses Created Successfully");
        } 

        setExpenseAmount(0);
        setExpensesName('');


  }

  return (
    <div className="border-2 border-gray-100 rounded-md py-5 px-4 col-span-2">
      <div className="flex flex-col gap-2 w-full">
        <small className="text-black font-semibold"> Expense Name : </small>
        
        <Input
          placeholder="e.g Home Decor"
          className="text-black  text-sm"
          required
          value={expensename}
          onChange={(e) => {
            setExpensesName(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-full mt-2">
        <small className="text-black font-semibold">Expense Amount : </small>
        <Input
          placeholder="e.g 2000"
          className="text-black text-sm"
          type="number"
          required
          value={expenseamount}
          onChange={(e) => {
            setExpenseAmount(parseInt(e.target.value));
          }}
        />
      </div>
      <Button className="bg-blue-600 mt-3 w-full" disabled={!(expenseamount&&expensename)} onClick={() => addNewExpense()}>Add Expense</Button>
    </div>
  );
};

export default AddExpense;
