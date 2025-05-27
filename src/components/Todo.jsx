import React, { useEffect } from "react";
import { useState } from "react";

//include images into your bundle

//create your first component
const Lista = () => {
    const [favorites, setFavorites] = useState([]);
    const [entrada, setEntrada] = useState('');

    const crearUsuario = () => {
        fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => console.log(data.todos));
        // .catch((error)=>console.log(error))
    }

    const traerUsuario = () => {
        fetch('https://playground.4geeks.com/todo/users/CarlosVillalobos', {
            method: "GET",
        })
            .then(response => {
                if (response.status === 404) {
                    crearUsuario()
                }

                return response.json()
            })
            .then(data => setFavorites(data.todos));
    }


    useEffect(() => {

        traerUsuario()

    }, [])



    const insertFav = (evento) => {
        setEntrada(evento.target.value);
    }


    const addFav = () => {
        fetch('https://playground.4geeks.com/todo/todos/CarlosVillalobos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: entrada,
                is_done: false
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo agregar favorito");

                }
                return response.json()
            })
            .then(data => {
                if (data) {
                    setFavorites([...favorites, data]);
                    setEntrada('');
                }

            })
            .catch(error => console.log(error))

    }

    const deleteFav = (tareaId) => {

        fetch(`https://playground.4geeks.com/todo/todos/${tareaId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },

        })

            .then(res => {
                if (!res.ok) {
                    throw new Error("No se pudo eliminar favorito");

                }
                const result = favorites.filter(item => item.id != tareaId)
                setFavorites(result)
            })
            .catch(error => console.log(error))


    }




    return (
        <div className="lista text-center container row d-flex justify-content-center">
            <input className="insertar-favorites col-12" type="text" onChange={insertFav} onKeyDown={(e) => {
                // console.log(e.key);

                if (e.key == 'Enter') {
                    addFav()

                }
            }} value={entrada} />
            <div className="container">
                <ol className="text-center container row justify-content-center">
                    {favorites.map((tarea) => (
                        <div key={tarea.uid} className="tarea-item-wrapper d-flex align-items-center my-2">
                            <li className="col-11 favorites">{tarea.name}</li>
                            <button
                                type="button"
                                className="col-1 boton "
                                onClick={() => deleteFav(tarea.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}

                </ol>
            </div>

            <div>
                <p>favorites restantes: {favorites.length}</p>
            </div>

        </div>
    );
};

export default Lista;