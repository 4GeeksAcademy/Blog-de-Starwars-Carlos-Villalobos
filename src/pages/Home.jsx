
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { Character } from "../components/Character.jsx";

export const Home = () => {

	const api = "https://www.swapi.tech/api/"

	const { store, dispatch } = useGlobalReducer()
	function apiPeople() {
		fetch(api +"people")
			.then(res => res.json())
			.then((data) => {
				dispatch({
					type: "getCharacter",
					payload:{character: data.results}
				})
			} )
			.catch(err => console.error(err))
	}


	useEffect(() => {
		apiPeople()
	}, [])

	
	console.log(store.characters);

	return (
		<div className="text-center d-flex flex-row overflow-scroll mt-5">
			{store.characters.map((value, index)=>{
				return(<Character key={index} people = {value}  />)
			})}
			

		</div>
	);
}; 