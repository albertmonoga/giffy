const ENDPOINT = 'http://localhost:8000'

export default function getFavs ({ jwt }) {
    return fetch(`${ENDPOINT}/favorites`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        console.log({res})
        return res.map(f => f.id)
    })
}