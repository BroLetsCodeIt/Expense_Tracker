"use client ";
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import db from '@/app/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { budgets, expenses } from '@/app/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem';
import Link from 'next/link';




interface  budgetlistProps  {
    amount : number ,
    createdBy : string , 
    icon : string |null , 
    id : number , 
    name : string , 
    totalItems : number , 
    totalspend : number 
}

const BudgetList = () => {
  const { user }  = useUser();

  const [ budgetlist , setbudgetlist ] = useState<Array<budgetlistProps>>([])


  useEffect(() => {
     user && getBudgetList();
  }); 

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

     
      setbudgetlist(result); 
      // console.log(result);
  }
  return  (
   <div>
        <div className='flex flex-wrap gap-3'> 
        <CreateBudget refreshData={ () => {getBudgetList();}} /> 
        {
          budgetlist.length >= 1 ?  budgetlist.map(( budgets   ,  ind ) => {
              
              return(
                  <>
                    <BudgetItem budget={budgets}  key={ind}/>       
                  </>
              )
           })
           : 
            [1,2,3,4,5,6,7,8].map((_,ind) => { 
               return( 
                
                    <div className="rounded-md bg-slate-200 p-10 w-[23rem] h-[10rem] animate-pulse " key={ind} >
                    </div> 
                
               )
            })
           
          }
        </div>
        </div>
  )
}

export default BudgetList
