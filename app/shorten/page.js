"use client";
import { React, useState } from "react";
import Link from "next/link";

const Shorten = () => {
    const [url, seturl] = useState("");
    const [shorturl, setshorturl] = useState("");
    const [links, setLinks] = useState([]);
    const [editId, setEditId] = useState(null);

    const generate = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            url,
            shorturl,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/api/generate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                const newLink = {
                    id: editId || Date.now(),
                    url,
                    shorturl,
                    generated: `${process.env.NEXT_PUBLIC_HOST}/${shorturl}`,
                };

                // Update or Add link in the list
                setLinks((prevLinks) =>
                    editId
                        ? prevLinks.map((link) => (link.id === editId ? newLink : link))
                        : [...prevLinks, newLink]
                );

                // Clear inputs and reset edit state
                seturl("");
                setshorturl("");
                setEditId(null);

                // Show appropriate alert message
                const message = editId ? "URL updated!" : result.message;
                alert(message);
            })
            .catch((error) => console.error(error));
    };

    const editLink = (link) => {
        seturl(link.url);
        setshorturl(link.shorturl);
        setEditId(link.id);
    };

    const deleteLink = (id) => {
        setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    };

    return (
        <div className="mx-auto max-w-xl rounded-lg bg-zinc-100 my-16 p-7 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Generate your short URLs</h1>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    value={url}
                    className="p-4 focus:outline-zinc-600"
                    placeholder="Enter your URL"
                    onChange={(e) => seturl(e.target.value)}
                />
                <input
                    type="text"
                    value={shorturl}
                    className="p-4 focus:outline-zinc-600"
                    placeholder="Enter your preferred short URL"
                    onChange={(e) => setshorturl(e.target.value)}
                />
                <button
                    onClick={generate}
                    className="bg-stone-500 shadow-lg rounded-lg font-bold p-2 text-white text-lg"
                >
                    {editId ? "Update" : "Generate"}
                </button>
            </div>

            {links.length > 0 && (
                <div className="mt-5">
                    <h2 className="text-lg font-bold">Your Links</h2>
                    <ul className="space-y-3">
                        {links.map((link) => (
                            <li
                                key={link.id}
                                className="flex justify-between items-center bg-white p-3 rounded shadow"
                            >
                                <span>
                                    <Link target="_blank" href={link.generated}>
                                        {link.generated}
                                    </Link>
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => editLink(link)}
                                        className="bg-blue-500 text-center h-auto rounded-lg w-auto text-white p-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteLink(link.id)}
                                        className="bg-red-500 text-center h-auto rounded-lg w-auto text-white p-2"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Shorten;
