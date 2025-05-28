
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect } from "react";
import { Character } from "../components/Character.jsx";
import { Planets } from "../components/Planets.jsx";
import { Vehicle } from "../components/Vehicle.jsx";

export const Home = () => {

	const api = "https://www.swapi.tech/api/"

	const { store, dispatch } = useGlobalReducer()
	function apiPeople() {
		fetch(api + "people")
			.then(res => res.json())
			.then((data) => {
				dispatch({
					type: "getCharacter",
					payload: { character: data.results }
				})
			})
			.catch(err => console.error(err))
	}

	function apiPlanets() {
		fetch(api + "planets")
			.then(res => res.json())
			.then((data) => {
				dispatch({
					type: "getPlanet",
					payload: { planet: data.results }
				})
			})
			.catch(err => console.error(err))
	}

	function apiVehicle() {
		fetch(api + "vehicles")
			.then(res => res.json())
			.then((data) => {
				dispatch({
					type: "getVehicle",
					payload: { vehicle: data.results }
				})
			})
			.catch(err => console.error(err))
	}


	useEffect(() => {
		apiPeople()
		apiPlanets()
		apiVehicle()
	}, [])


	console.log(store.characters);

	return (
		<div >
			<div className="text-center d-flex flex-row overflow-scroll mt-5">
				{store.characters.map((value, index) => {
					return (<Character key={index} people={value} />)
				})}
			</div>
			<div className="text-center d-flex flex-row overflow-scroll mt-5">
				{store.planets.map((value, index) => {
					return (<Planets key={index} planeta={value} />)
				})}
			</div>
			<div className="text-center d-flex flex-row overflow-scroll mt-5">
				{store.vehicles.map((value, index) => {
					return (<Vehicle key={index} vehicle={value} />)
				})}
			</div>

		</div>
	);
}; 