import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-20 flex justify-between px-3 items-center text-white bg-zinc-700'>
        <div className="logo font-bold text-xl glow-title text-white">
        <Link className='text-white' href="/"><li>AshenPath</li></Link>
        </div>
        <ul className='flex justify-center items-center gap-4'>
            <Link href="/"><li>Home</li></Link>
            <Link href="/about"><li>About</li></Link>
            <Link href="/shorten"><li>Shorten</li></Link>
            <Link href="/contact"><li>Contact Us</li></Link>
        <li className='flex gap-3'>
            <Link href='/shorten'><button className='bg-stone-500 shadow-lg rounded-lg font-bold p-2'>Try Now</button></Link>
            <Link href='/github'><button className='bg-stone-500 shadow-lg rounded-lg font-bold p-2'>Github</button></Link>
        </li>
        </ul>
    </nav>
  )
}

export default Navbar
