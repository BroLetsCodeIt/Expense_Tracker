"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from './_components/CardInfo';
import db from '@/app/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { budgets, expenses } from '@/app/utils/schema';
import BarChart from './_components/BarChart';
import BarChartComponent from './_components/BarChart';
import BudgetList from './budgets/_components/BudgetList';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/[id]/_components/ExpenseListTable';

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
const Dashboard = () => {
  const { user } = useUser();

  const [ budgetlist  , setBudgetlist ] = useState<Array<budgetlistProps>>([]);

  const [ expenselist , setExpenselist ] = useState<Array<expensesInfoProps>>([]);
  
  useEffect(() => {
    user && getBudgetList();
 },); 


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
    //  console.log(result);
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
    <div className='p-4' > 
        <p className='text-4xl font-bold tracking-tighter'>Hi 👋, {user?.fullName} </p>
        <small>Here&apos;s what happening with your money, Lets Manage your expenses.</small>
        <CardInfo budgetlist = {budgetlist}/>

        {/* graph */}
        <div className='grid grid-cols-1 md:grid-cols-3 pt-4'>
           <div className='md:col-span-2'>
             {/* <span className='font-semibold text-3xl tracking-tighter'>Chart.</span> */}
             <BarChartComponent budgetlist = {budgetlist }/>
           </div>
           <div className='md:col-span-1 pl-4 flex flex-col gap-2 items-start'>
             <strong>Latest Budgets -{`>`}</strong>
             {       
                  budgetlist.length >= 1 ? (    
                  <BudgetItem budget={budgetlist[0]} className={'w-[25rem]'}/>
                ) : ("No Budgets are Created yet.")}
           </div>
        </div>
        <div>
          
                <ExpenseListTable expensesInfo={expenselist} refereshData={() => getBudgetList()} className='md:col-span-3'/>
        </div>
    </div>
  )
}

export default Dashboard
