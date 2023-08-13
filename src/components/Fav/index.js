import useUser from "hooks/useUser";
import React, {useState} from "react";
import { useLocation } from "wouter";
import './Fav.css';
import Modal from "components/Modal";
import Login from "components/Login";

export default function Fav ({id}) {
    const { isLogged, addFav, removeFav, favs } = useUser()
    const [, navigate] = useLocation()
    const [showModal, setShowModal] = useState(false)

    const isFaved = favs.some(favId => favId === id)

    const handleClick = () => {
        if (!isLogged) return setShowModal(true)
        if (isFaved) return removeFav({id})
        addFav({id});
    };

    const handleClose= () => {
        setShowModal(false)
    }

    const handleLogin = () => {
        setShowModal(false)
    }

    const [
        label,
        emoji
    ] = isFaved
    ? [
        'Remove Gif from favorites',
        '❌'
    ] : [
        'Add Gif to favorites',
        '💖'
    ]

    return(
        <>
            <button className= 'gf-Fav' onClick={handleClick}>
                <span role='img' aria-label={label}>{emoji}</span>
            </button>
            {showModal && (
                <Modal onClose={handleClose}>
                    <Login onLogin={handleLogin}/>
                </Modal>
            )}
        </>
    );
}