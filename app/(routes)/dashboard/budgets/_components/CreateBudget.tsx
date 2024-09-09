"use client";
import React, { useEffect, useState } from "react";
import BudgetDialog from "./BudgetDialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import db from "@/app/utils/dbConfig";
import { budgets } from "@/app/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const CreateBudget = ({refreshData} : { refreshData : ()=>void }) => {
    const [emoji, setEmoji] = useState<string>("🤔");

    const [emojipicker, setEmojiPicker] = useState<boolean>(false);

    const [budgetname, setBudgetName] = useState<string>("");

    const [budgetamount, setBudgetAmount] = useState<number>(0);

    // console.log(budgetname , budgetamount);
    const { user} = useUser() ;

    const createdByEmail = user?.primaryEmailAddress?.emailAddress ?? "unknown@email.com";



    // used to create new budget.
    const onCreateBudget = async () =>{
        const result = await db.insert(budgets).values({
            name : budgetname , 
            amount : budgetamount.toString(), 
            icon : emoji , 
            createdBy : createdByEmail ,
        }).returning({insertedId : budgets.id})

        if(result){
             refreshData();
             toast('New Budget created Succesffully');
        }

    }
    
    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    {" "}
                    <div className="border-2 border-gray-400 border-dashed rounded-md bg-slate-100 flex items-center flex-col p-10 cursor-pointer w-[23rem]">
                        <h2 className="p-2 bg-gray-200 rounded-full w-10 h-10 border-solid border-b-4 border-gray-400 active:border-none">
                            ➕
                        </h2>
                        <h2 className="pt-3 font-bold">Create New Budget 💸</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget 💸</DialogTitle>
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
                                    onClick={() => onCreateBudget()}
                                    >
                                    Create Budget
                                </Button>
                                    </DialogClose>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateBudget;
