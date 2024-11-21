import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("ashenpath");
    const collection = db.collection("url");

    // Check if short URL already exists
    const existingDoc = await collection.findOne({ shorturl: body.shorturl });

    if (existingDoc) {
        if (existingDoc.url === body.url) {
            // If the same URL with the same short URL already exists, return a message
            return new Response(
                JSON.stringify({ success: false, error: true, message: 'URL already exists!!' }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        } else {
            // If the short URL exists but the URL is different, update the URL
            const updated = await collection.updateOne(
                { shorturl: body.shorturl },
                { $set: { url: body.url } }
            );

            if (updated.modifiedCount > 0) {
                return new Response(
                    JSON.stringify({ success: true, error: false, message: 'URL updated successfully!!' }),
                    { status: 200, headers: { "Content-Type": "application/json" } }
                );
            } else {
                return new Response(
                    JSON.stringify({ success: false, error: true, message: 'Failed to update the URL.' }),
                    { status: 500, headers: { "Content-Type": "application/json" } }
                );
            }
        }
    }

    // If short URL does not exist, create a new entry
    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl,
    });

    return new Response(
        JSON.stringify({ success: true, error: false, message: 'URL generated successfully!!' }),
        { status: 201, headers: { "Content-Type": "application/json" } }
    );
}

export async function DELETE(request) {
    const { shorturl } = await request.json();
    const client = await clientPromise;
    const db = client.db("ashenpath");
    const collection = db.collection("url");

    // Check if the short URL exists
    const existingDoc = await collection.findOne({ shorturl });

    if (!existingDoc) {
        return new Response(
            JSON.stringify({ success: false, error: true, message: 'Short URL not found!' }),
            { status: 404, headers: { "Content-Type": "application/json" } }
        );
    }

    // Delete the entry with the given short URL
    const deleted = await collection.deleteOne({ shorturl });

    if (deleted.deletedCount > 0) {
        return new Response(
            JSON.stringify({ success: true, error: false, message: 'URL deleted successfully!' }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }

    return new Response(
        JSON.stringify({ success: false, error: true, message: 'Failed to delete the URL.' }),
        { status: 500, headers: { "Content-Type": "application/json" } }
    );
}
