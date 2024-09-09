"use client";
import React from 'react'
import BudgetList from './_components/BudgetList'
import CreateBudget from './_components/CreateBudget'


const Budgets = () => {
  return (
    <div className='p-10' >
         <h1 className='font-extrabold text-3xl pb-4'>My Budgets.</h1>
         <BudgetList/>     
    </div>
  )
}

export default Budgets
