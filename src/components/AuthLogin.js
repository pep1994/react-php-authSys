export async function auth(token) {
    const url = "http://localhost:8888/authLogged.php";
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            token: token
        })
    }
    const rawData = await fetch(url, options);
    const data = await rawData.json();
    console.log(data)
    return data;
    
}