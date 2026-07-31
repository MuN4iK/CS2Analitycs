export async function handler(event) {
    console.log("Function called");
    const path = event.queryStringParameters.path;
    const res = await fetch(
        "https://api.pandascore.co" + path,
        {
            headers: {
                Authorization: `Bearer ${process.env.PANDASCORE_KEY}`
            }
        }
    )

    if (!res.ok) {
        return {
            statusCode: res.status,
            body: JSON.stringify(await res.json())
        };
    }

    const data = await res.json()

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}