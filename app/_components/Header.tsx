"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { SignUpButton } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs'
const Header = () => {

  const  { user , isSignedIn} = useUser() ; 
  return (
    <div className='flex items-center justify-between border-b-2 border-l-2 border-r-2 px-2 border-gray-200 py-1 rounded-b-md sticky top-0 w-full  backdrop-filter  backdrop-blur-md bg-opacity-40 shadow-sm shadow-blue-200'>
        <Image src={'/logo.svg'} alt='logo' width={50} height={50} className='aspect-square'/>
        <Link href={'/dashboard'}>
         { isSignedIn ?  
         <div className='flex items-center justify-center gap-3'>
          <div className='border-2 border-gray-200 rounded-full w-[2.3rem] h-[2.3rem] flex items-center justify-center'>

           <UserButton/> 
          </div>
         <GetStartedButton/> 
         </div> :
         <SignUpButtonCustom/>
         }
         
        </Link> 
    </div>
  )
}


const GetStartedButton = () =>{
    return (
      <Button variant={'outline'}>
          Go to Dashboard -{`>`}
        </Button>
    )
}


const SignUpButtonCustom = () => {
  return(
       <button className='border border-gray-200 px-3 py-1 rounded-md hover:bg-gray-200 hover:transition-all'>
        <SignInButton/>   
       </button>  
  )
}

export default Header
