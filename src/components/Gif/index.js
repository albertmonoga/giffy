import React from 'react';
import { Link } from 'wouter';
import './Gif.css';
import Fav from 'components/Fav';

function Gif ({title, id, url}) {
    return (
        <div  className="Gif">
            <div className='Gif-button'>
                <Fav id={id}></Fav>
            </div>
            <Link to={`/gif/${id}`} className='Gif-link'>
            <h4>{title}</h4>
            <img alt={title} src={url} />
            </Link>
        </div>
    )
}

export default React.memo(Gif, (prevProps,  nextProps) => {
    return prevProps.id === nextProps.id
})