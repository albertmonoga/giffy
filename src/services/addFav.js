const ENDPOINT = 'http://localhost:8000'

export default function addFav ({ id, jwt }) {
    return fetch(`${ENDPOINT}/favorites`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${jwt}`,
        },
        body: JSON.stringify({ id })
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        console.log({res})
        const { favs } = res
        return favs.map(f => f.id)
    })
}