import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer()


	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/">
					<img className="logo" src="https://brandemia.org/contenido/subidas/2021/05/portada-starwars-imagenes-brandemia-blog-1000x670.jpg" alt="StarWars Logo" />
				</Link>
				<div className="ml-auto">

					<div className="dropdown">
						<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites ({store.favorites.length})
						</button>
						<ul className="dropdown-menu">
							
							{store.favorites && store.favorites.length > 0 ? store.favorites.map((favorite, index) => {
								return (<Link to={`/${favorite.type}info/${favorite.uid}`}><li key={index}>{favorite.name}</li></Link> )
							}) : <li>No hay favoritos</li>}

						</ul>
					</div>


					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};