import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

interface BudgetListProps {
  id: number ;
  name: string;
  amount: number;
  icon: string | null;
  createdBy: string;
  totalItems: number;
  totalspend: number;
}

const CardInfo = ({ budgetlist }: { budgetlist: BudgetListProps[] }) => {
  
  const [totalSPENT, setTotalSpent] = useState<number>(0);
  const [totalBUDGET, setTotalBudget] = useState<number>(0);

  useEffect(() => {
    //  calculateBudget();
  let totalbudget = 0;
  let totalspent = 0;

  const calculateBudget = () => {
    for (let i = 0; i < budgetlist.length; i++) {
      let val = budgetlist[i].amount;
      totalbudget = totalbudget + Number(val);
      totalspent += budgetlist[i].totalspend;
    }
    setTotalBudget(totalbudget);
    setTotalSpent(totalspent);
    // console.log(totalSPENT);
  };

  calculateBudget();
  } , [budgetlist]);



  

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm">Total Budget</h2>
          <h2 className="font-bold text-2xl">${totalBUDGET ? totalBUDGET : <p className="animate-pulse">...</p>}</h2>
        </div>
        <PiggyBank className=" p-3 h-12 w-12 rounded-sm" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm"> Total Spend</h2>
          <h2 className="font-bold text-2xl">${totalSPENT ? totalSPENT : <p className="animate-pulse">...</p>}</h2>
        </div>
        <ReceiptText className=" p-3 h-12 w-12 rounded-sm" />
      </div>
      <div className="p-7 border rounded-lg flex items-center justify-between">
        <div>
          <h2 className="text-sm"> No. of Budget</h2>
          <h2 className="font-bold text-2xl">{budgetlist.length ? budgetlist.length : <p className="animate-pulse">...</p>}</h2>
        </div>
        <Wallet className="p-3 h-12 w-12 rounded-sm" />
      </div>
    </div>
  );
};

export default CardInfo;
