import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Character = ({ people }) => {

    const { store, dispatch } = useGlobalReducer()
    const [characterDetails, setCharacterDetails] = useState([]);
    const navigate = useNavigate();

    function apiDetalles(id) {


        fetch(`https://www.swapi.tech/api/people/${id}`)

            .then(res => res.json())
            .then(data => setCharacterDetails(data.result.properties))
            .catch(err => console.error(err))
    }

    function addFavorite(favorite) {

        const isFavorite = store.favorites.some(item => item.name == favorite.name)
        console.log(isFavorite);

        if (isFavorite) {
            dispatch({ type: "set_favorites", payload: { favorites: store.favorites.filter(item => item.name != favorite.name) } })

        } else {
            dispatch({ type: "set_favorites", payload: { favorites: [...store.favorites,  { ...favorite, type: 'character' }] } })

        }
    }


    useEffect(() => {

        if (people && people.uid) {
            apiDetalles(people.uid);
        }
    }, [people.uid]);

    const isCurrentCharacterFavorite = store.favorites.some(item => item.name === people.name);

    return (
        <div className="card m-2" style={{ width: "18rem", flexShrink: 0 }}>
            <img
                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${people.uid}.jpg`}
                className="card-img-top"
                alt={people.name}
            />
            <div className="card-body">
                <h5 className="card-title">{people.name}</h5>


                <p className="card-text">
                    Gender: {characterDetails.gender ? characterDetails.gender : "N/A"}
                </p>
                <p className="card-text">
                    Eye Color: {characterDetails.eye_color ? characterDetails.eye_color : "N/A"}
                </p>
                <div className="d-flex justify-content-between">
                    <button onClick={() => { navigate(`/characterinfo/${people.uid}`) }} href="#" className="btn btn-primary">Go somewhere</button>
                    <button onClick={() => addFavorite(people)} className={`btn ${isCurrentCharacterFavorite ? 'text-danger' : 'text-secondary'}`}><i className="fa-solid fa-heart" ></i></button>
                </div>


            </div>
        </div>
    );
};