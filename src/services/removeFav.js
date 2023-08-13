const ENDPOINT = 'http://localhost:8000'

export default function removeFavService ({ id, jwt }) {
    return fetch(`${ENDPOINT}/favorites/${id}`,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    });
}