import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import db from '@/app/utils/dbConfig';
import { eq  } from 'drizzle-orm';
import { expenses } from '@/app/utils/schema';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';


type expensesInfoProps = {
    id : number ; 
    ename : string ; 
    amount : number ; 
    budgetId?: number ; 
    createdAt : string ; 
}


const ExpenseListTable = ({ expensesInfo , refereshData , className } : { expensesInfo : expensesInfoProps[] , refereshData : () => void  , className ?: string}) => {

  const DeleteExpense = async (invoice : { id : number }) => {
       
     const result = await db.delete(expenses)
     .where(eq(expenses.id , invoice.id))
     .returning();

     if(result){
        
        toast('Expense Deleted!');
        refereshData();
     }      
  }

  return (
     <div className={cn(`pt-10 ` , className )}>
         <Table>
      <TableCaption>A list of your recent expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Expense Name</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expensesInfo.map((invoice , ind ) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.ename}</TableCell>
            <TableCell>{invoice.amount}</TableCell>
            <TableCell>{invoice.createdAt}</TableCell> 
            <TableCell className='flex gap-2'>
                {/* <Button className='px-2 h-fit'>Edit 🖋️</Button> */}
                <Button variant={'destructive'} className='px-2 h-fit' onClick={() => DeleteExpense(invoice)}>Delete 🗑️</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      
    </Table>        
     </div>
  )
}

export default ExpenseListTable
