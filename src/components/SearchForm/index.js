import React from 'react'
import css from './SearchForm.module.css'
import { useLocation } from 'wouter'
import useForm from './hook';

const RATINGS = ['g', 'pg', 'pg-13', 'r'];

function SearchForm ({
    initialKeyword = '',  
    initialRating = RATINGS[0]
}) {
    
    const [, pushLocation] = useLocation()
    
    const { keyword, rating, times, updateKeyword, updateRating} = useForm({ initialKeyword, initialRating, });

    const handleChange = (evt) => {
        updateKeyword(evt.target.value)
    };

    const handleSubmit = (evt) => {
        evt.preventDefault()
         //navegar a otra ruta
         pushLocation(`/search/${keyword}/${rating}`);
    };

     const handleChangeRating = (evt) => {
        updateRating(evt.target.value)
     }

    return (
        <form onSubmit={handleSubmit} className={css["c-search"]}>
            <button className={css["c-search-btn"]}>Buscar</button>
            <input  className={css["c-search-input"]} 
            placeholder="Search a gif here..." 
            onChange={handleChange} 
            type='text' 
            value= {keyword} />
            <select onChange={handleChangeRating} value={rating}>
                <option disabled>Rating type</option>
                {RATINGS.map((rating)=> (
                <option key = {rating}>{rating}</option>
                ))}
            </select>
            <small>{times}</small>
        </form>
    );
}

export default React.memo(SearchForm)