"use client"
import { React, useState } from 'react'
import Link from 'next/link'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState("")

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "url": url,
            "shorturl": shorturl
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setgenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
                seturl("")
                setshorturl("")
                console.log(result)
                alert(result.message)
            })
            
            .catch((error) => console.error(error));
    }


    return (
        <div className='mx-auto max-w-xl rounded-lg bg-zinc-100 my-16 p-7 flex flex-col gap-5'>
            <h1 className='text-2xl font-bold '>Generate your short URLs</h1>
            <div className='flex flex-col gap-3 '>
                <input type="text"
                    value={url}
                    className='p-4 focus:outline-zinc-600'
                    placeholder='Enter your URL' name="" id=""
                    onChange={e => { seturl(e.target.value) }} />

                <input type="text"
                    value={shorturl}
                    className='p-4 focus:outline-zinc-600'
                    placeholder='Enter your preferred short URL' name="" id=""
                    onChange={e => { setshorturl(e.target.value) }} />
                <button onClick={generate} className='bg-stone-500 shadow-lg rounded-lg font-bold p-2 text-white text-lg'>Generate</button>
            </div>

            {generated && <>
            <span className='font-semibold text-lg'>Your Link</span> <code><Link target='_blank' href={generated}>{generated}</Link></code>
            </> }
                
        </div>
    )
}

export default Shorten
