import React from "react"
import { useParams } from "react-router-dom"

export const CharacterInfo = () => {
    const { store, dispatch } = useGlobalReducer()
    return (
        <div>
            <img
                src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${people.uid}.jpg`}
                className="card-img-top"
                alt={people.name} 
            />
        </div>
    )
}