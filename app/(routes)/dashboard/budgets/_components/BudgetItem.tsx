import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface budgetlistProps {
  amount: number;
  createdBy: string;
  icon: string | null;
  id: number ;
  name: string;
  totalItems: number;
  totalspend: number;
}

const BudgetItem = ({ budget , className} : { budget : budgetlistProps , className ?: string }) => {  
  return (
    <Link href={`/dashboard/expenses/`+ budget.id}>
    <div className={cn("w-[23rem] p-2 rounded-md border-2 border-gray-200 flex flex-col justify-between min-h-[10rem] cursor-pointer hover:bg-gray-300/10 col-span-1", className)}>
        <div className="flex items-start justify-between">
            <div className="flex gap-3">
                <div className="rounded-full border-2 border-gray-200 w-10 h-10 items-center  flex justify-center">
                    {budget.icon}
                </div>
                <div className="flex flex-col">
                    <small>{budget.name}</small>
                    <small>{budget.totalItems} items</small>
                </div>
            </div>
            <small className="font-bold">${budget.amount}</small>
        </div>

        <div className="w-full p-2 flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
             <small>$ {budget.totalspend ? budget.totalspend : 0 } spent </small> 
             <small>$ {(budget.amount) - budget.totalspend} Remaining </small> 
          </div>   
          <div className="w-full ">
           {/* <input type="range" min={budget.totalspend} max={(budget.amount - budget.totalspend)} className="w-full" readOnly/> */}
           {/* <Slider defaultValue={[budget.totalspend]} max={budget.amount - budget.totalspend} step={1} /> */}
             <p>
                <progress className={`h-2 rounded-md w-full`} value={budget.totalspend} max={budget.amount}></progress>
             </p>
             
             
          </div> 
        </div> 
    </div>
    </Link>
  );
};

export default BudgetItem;



