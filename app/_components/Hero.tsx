import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl tracking-tighter">
            Manage Your Expense.
            <strong className="font-extrabold text-blue-700 sm:block pt-1">
              {" "}
              Control Your Money{" "}
            </strong>
          </h1>
          <p className="mt-4 sm:text-xl/relaxed md:text-sm">
            Starting creating your budget, saves lots of money
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={"/dashboard"}
              className='className="block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500"'
            >
              Get Started Now -{`>`}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
