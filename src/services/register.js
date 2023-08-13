const ENDPOINT = 'http://localhost:8000'

export default function register ({ username, password, name }) {
    return fetch(`${ENDPOINT}/auth/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, name })
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return true
    });
}