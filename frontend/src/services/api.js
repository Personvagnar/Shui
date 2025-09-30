const API_URL = "https://vzcjtfer6l.execute-api.eu-north-1.amazonaws.com"

export async function getMessages() {
    const url = `${API_URL}/messages`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
}

export async function postMessage(message) {
    const url = `${API_URL}/create`;
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(message),
    });
    if (!res.ok) throw new Error("Failed to create message");
    return res.json(); 
}