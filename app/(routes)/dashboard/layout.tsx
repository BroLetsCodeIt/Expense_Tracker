"use client";
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect } from 'react'
import Sidebar from './_components/Sidebar'
import DashboardHeader from './_components/DashboardHeader'
import db from '@/app/utils/dbConfig';
import { budgets } from '@/app/utils/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({children} : {children : React.ReactNode}) => {

  const { user } = useUser();
  const emailaddressofuser = user && user?.primaryEmailAddress?.emailAddress;
  
  const router = useRouter();

  useEffect(() => {
    user &&  checkbudgets();
  }) ; // removed user

  const checkbudgets = async () =>{
    //  const result = await db.select().from(budgets).where(eq(budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
     const createdby = budgets.createdBy ;
     const result = await db.select().from(budgets).where(eq(createdby ,`${emailaddressofuser}`));
     
     if(result?.length == 0){
       router.replace('/dashboard/budgets');
     }

  }

  return (
    <div className='flex'>
        {/* sidebar component */}
        <div className='h-screen border-r-2 border-gray-200 w-[15%]'>
            <Sidebar/>
        </div>   

        <div className='flex-1'> 
            <div className='flex flex-col items-start justify-start'>
              {/* header component */}
               
              <DashboardHeader/> 

              {/* all the dynamic content renderd as children */}
              <div className='w-full flex-1'>
                 {children}
              </div>
            </div>
        </div>

    </div>
  )
}

export default DashboardLayout;
