"use client ";
import React, { useEffect, useState } from "react";

import { Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import db from "@/app/utils/dbConfig";
import { budgets } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

interface BudgetInfoProps {
  id: number;
  amount: number;
  createdBy: string;
  icon: string ;
  name: string;
}



const EditBudget= ({budgetInfo , refereshData }: { budgetInfo: BudgetInfoProps,  refereshData : () => void } ) => {
 
    
    const [emoji, setEmoji] = useState<string>(budgetInfo?.icon || "🤔");

    const [emojipicker, setEmojiPicker] = useState<boolean>(false);

    const [budgetname, setBudgetName] = useState<string>(budgetInfo?.name || "");

    const [budgetamount, setBudgetAmount] = useState<number>(budgetInfo?.amount || 0);
 
    const  { user } = useUser() ; 


    useEffect(() => {
      setEmoji(budgetInfo?.icon) ;
      setBudgetName(budgetInfo?.name);
      setBudgetAmount(budgetInfo?.amount); 

    } , [budgetInfo])
   
    const onUpdateBudget = async () => {
        
        const result = await db.update(budgets).set({
           name : budgetname , 
           amount : budgetamount?.toString() ,
           icon : emoji , 
           createdBy :  user?.primaryEmailAddress?.emailAddress , 
        }).where(eq(budgets.id , budgetInfo.id))
        .returning()


        if(result){
          toast("Updated Successfully");
          refereshData() ;
        }
    } 
    

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button className="bg-blue-400 px-2 py-1 rounded-md text-sm flex items-center gap-2 justify-between tracking-tighter">
            Edit <Trash className="size-4" />{" "}
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update New Budget 💸</DialogTitle>
            <DialogDescription>
              <div className="pt-3 flex flex-col items-start gap-3">
                <Button
                  variant={"outline"}
                  size={"lg"}
                  onClick={() => {
                    setEmojiPicker(!emojipicker);
                  }}
                >
                  {emoji}
                </Button>
                <div className="absolute top-12 left-20 z-10">
                  <EmojiPicker
                    open={emojipicker}
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-black font-semibold">
                    Budget Name :{" "}
                  </span>
                  <Input
                    placeholder="e.g Home Decor"
                    className="text-black font-semibold"
                    required
                    value={budgetname}
                    onChange={(e) => {
                      setBudgetName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <span className="text-black font-semibold">
                    Budget Amount :{" "}
                  </span>
                  <Input
                    placeholder="e.g 2000"
                    className="text-black font-semibold"
                    type="number"
                    required
                    value={budgetamount}
                    onChange={(e) => {
                      setBudgetAmount(parseInt(e.target.value));
                    }}
                  />
                </div>
                <DialogClose asChild>
                  <Button
                    className="py-1 w-full bg-blue-600 hover:opacity-50 transition-all"
                    disabled={!(budgetamount && budgetname)}
                    onClick={() => onUpdateBudget()}
                  >
                    Update Budget
                  </Button>
                </DialogClose>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditBudget;
