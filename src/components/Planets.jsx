import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Planets = ({ planeta }) => {

    const { store, dispatch } = useGlobalReducer()
    const [planetDetails, setPlanetDetails] = useState([]);
    const navigate = useNavigate();

    function apiDetalles(id) {

        fetch(`https://www.swapi.tech/api/planets/${id}`)

            .then(res => res.json())
            .then(data => setPlanetDetails(data.result.properties))
            .catch(err => console.error(err))
    }

    function addFavorite(favorite) {

        const isFavorite = store.favorites.some(item => item.name == favorite.name)
        console.log(isFavorite);

        if (isFavorite) {
            dispatch({ type: "set_favorites", payload: { favorites: store.favorites.filter(item => item.name != favorite.name) } })

        } else {
            dispatch({ type: "set_favorites", payload: { favorites: [...store.favorites, { ...favorite, type: 'planeta' } ] } })

        }
    }
    

    useEffect(() => {

        if (planeta && planeta.uid) {
            apiDetalles(planeta.uid);
        }
    }, [planeta.uid]);

    const isCurrentCharacterFavorite = store.favorites.some(item => item.name === planeta.name);

    return (
        <div className="card m-2" style={{ width: "18rem", flexShrink: 0 }}>
            <img
                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/planets/${planeta.uid}.jpg`}
                className="card-img-top"
                alt={planeta.name}
            />
            <div className="card-body">
                <h5 className="card-title">{planeta.name}</h5>


                <p className="card-text">
                    Climate: {planetDetails.climate ? planetDetails.climate : "N/A"}
                </p>
                <p className="card-text">
                    Diameter: {planetDetails.diameter ? planetDetails.diameter : "N/A"}
                </p>
                <div className="d-flex justify-content-between">
                    <button onClick={() => { navigate(`/planetainfo/${planeta.uid}`) }} href="#" className="btn btn-primary">Go somewhere</button>
                    <button onClick={() => addFavorite(planeta)} className={`btn ${isCurrentCharacterFavorite ? 'text-danger' : 'text-secondary'}`}><i className="fa-solid fa-heart" ></i></button>
                </div>

            </div>
        </div>
    );
};