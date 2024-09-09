import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <>
       <div className="md:container w-full md:mx-auto  ">
          <Header/>
          <Hero/>
          <div className="h-screen">     
          </div>
      </div>
    </>
  );
}




