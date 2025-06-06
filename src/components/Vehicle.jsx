import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

export const Vehicle = ({ vehicle }) => {

    const { store, dispatch } = useGlobalReducer()
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const navigate = useNavigate();

    function apiDetalles(id) {


        fetch(`https://www.swapi.tech/api/vehicles/${id}`)

            .then(res => res.json())
            .then(data => setVehicleDetails(data.result.properties))
            .catch(err => console.error(err))
    }

    function addFavorite(favorite) {

        const isFavorite = store.favorites.some(item => item.name == favorite.name)

        if (isFavorite) {
            dispatch({ type: "set_favorites", payload: { favorites: store.favorites.filter(item => item.name != favorite.name) } })

        } else {
            dispatch({ type: "set_favorites", payload: { favorites: [...store.favorites,  { ...favorite, type: 'vehicles' }] } })

        }
    }


    useEffect(() => {

        if (vehicle && vehicle.uid) {
            apiDetalles(vehicle.uid);
        }
    }, [vehicle.uid]);

    const isCurrentCharacterFavorite = store.favorites.some(item => item.name === vehicle.name);

    return (
        <div className="card m-2" style={{ width: "18rem", flexShrink: 0 }}>
            <img
                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${vehicle.uid}.jpg`}
                className="card-img-top"
                alt={vehicle.name}
            />
            <div className="card-body">
                <h5 className="card-title">{vehicle.name}</h5>


                <p className="card-text">
                    Cargo capacity: {vehicleDetails.cargo_capacity ? vehicleDetails.cargo_capacity : "N/A"}
                </p>
                <p className="card-text">
                    Consumables: {vehicleDetails.consumables ? vehicleDetails.consumables : "N/A"}
                </p>
                <div className="d-flex justify-content-between">
                    <button onClick={() => { navigate(`/vehiclesinfo/${vehicle.uid}`) }} href="#" className="btn btn-primary">Go somewhere</button>
                    <button onClick={() => addFavorite(vehicle)} className={`btn ${isCurrentCharacterFavorite ? 'text-danger' : 'text-secondary'}`}><i className="fa-solid fa-heart" ></i></button>
                </div>


            </div>
        </div>
    );
};