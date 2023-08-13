import React from 'react'
//import StaticContext from 'context/StaticContext'
import Gif from 'components/Gif'
import useSingleGit from 'hooks/useSingleGif'
import Spinner from 'components/Spinner'
import { Redirect } from 'wouter'
import { Helmet } from 'react-helmet'

export default function Detail ({ params }) {
    //const staticConfig = useContext(StaticContext)
    //console.log(staticConfig)
    const {gif, isLoading, isError} = useSingleGit({id: params.id})
    const title = gif ? gif.title : ''
   
    if (isLoading) {
        return (
            <>
                <Helmet>
                    <title>Cargando...</title>
                </Helmet>
                <Spinner />
            </>
        )
     }

    if (isError) return <Redirect to='/404' />
    if (!gif) return null
   
    return <>
        <Helmet>
            <title>{title} || Giffy</title>
        </Helmet>
        <h3 className='App-title'>{gif.title}
        </h3>
        <Gif {...gif} />
    </>
}