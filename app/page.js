import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <main  className="bg-zinc-100 my-7">
    <section className="grid grid-cols-2 h-[50vh]">
      <div className="flex flex-col gap-4 items-center justify-center">
        <p className="text-3xl font-bold pl-28 text-center my-4">Why take the long way when you can cut to the chase? Our URL shortener trims your links and your worries—short, sweet, and to the point!</p>
        <p className="pl-28 text-center"> Tired of long, clunky URLs ruining your flow? Our URL shortener turns chaos into clarity! With lightning-fast processing, detailed analytics, and a dash of humor, we make your links short, sweet, and powerful. Perfect for creators, marketers, and anyone who loves efficiency—with us, your links will never drag on again!</p>

      <div className='flex gap-3 my-2 justify-start ml-28'>
            <Link href='/generate'><button className='bg-stone-500 shadow-lg rounded-lg font-bold p-2 text-white'>Try Now</button></Link>
            <Link href='/github'><button className='bg-stone-500 shadow-lg rounded-lg font-bold p-2 text-white'>Github</button></Link>
        </div>
      </div>
      <div className="flex justify-start relative" >
        <Image className="mix-blend-darken" src={"/vector.jpg"} fill={true} alt="Vector image"/>
      </div>
    </section>
   </main>
  );
}
