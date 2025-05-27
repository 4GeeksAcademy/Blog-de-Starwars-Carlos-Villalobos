import React, { useEffect, useState } from "react"; 
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Character = ({ people }) => {

    const {store, dispatch} = useGlobalReducer()
    const [characterDetails, setCharacterDetails] = useState([]);

    async function apiDetalles(id) {
        try {

            const res = await fetch(`https://www.swapi.tech/api/people/${id}`);

            if (!res.ok) {
            
                throw new Error(`HTTP error! status: ${res.status} - ${res.statusText}`);
            }

            const data = await res.json();
        
            setCharacterDetails(data.result.properties); 
        } catch (err) {
            console.error("Error al obtener detalles del personaje:", err);
            setError(err); 
        } finally {
            setLoading(false); 
        }
    }

    function addFavorite(favorite) {
        
        const isFavorite = store.favorites.some(item => item.uid == favorite.uid)
        console.log(isFavorite);
        let color = "red"
        if (isFavorite) {
            dispatch({type: "set_favorites", payload: {favorites: store.favorites.filter(item => item.uid != favorite.uid)}})
                                       
        }else{
            dispatch({type: "set_favorites", payload: {favorites: [...store.favorites, favorite]}})
    
        }
    }
    

    useEffect(() => {
    
        if (people && people.uid) {
            apiDetalles(people.uid);
        }
    }, [people.uid]); 

     const isCurrentCharacterFavorite = store.favorites.some(item => item.uid === people.uid);

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
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                            <button onClick={() => addFavorite(people)} className={`btn ${isCurrentCharacterFavorite ? 'text-danger' : 'text-secondary'}`}><i class="fa-solid fa-heart" ></i></button>
                        </div>
                
                
            </div>
        </div>
    );
};