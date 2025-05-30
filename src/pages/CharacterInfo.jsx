import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Character } from "../components/Character";

export const CharacterInfo = () => {
    const { uid } = useParams();
    // const { store, dispatch } = useGlobalReducer();
    const [Info, setInfo] = useState();

    function infoApi() {
        fetch("https://www.swapi.tech/api/people/" + uid)
            .then(res => res.json())
            .then(data => setInfo(data.result.properties))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        infoApi()
    }, [])

    return (
        <div className="container">
            <div className="row w-100 my-4 d-flex justify-content-between ">
                <div className="col-md-6">
                    <img
                        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/people/${uid}.jpg`}
                        className="img-info"
                    />
                </div>
                <div className="col-md-6 text-light">
                    <h1>{Info && Info.name}</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur accusamus dolorem, voluptate quasi voluptatibus hic praesentium sint modi earum autem itaque nam consequuntur beatae, et dolore? Vel possimus veniam adipisci.
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore similique libero, facilis nisi quia porro, tempora recusandae iusto illo laudantium autem tenetur est hic aut repellat mollitia magnam nesciunt earum.</p>
                </div>
            </div>
            <div className="border-top  border-danger text-danger row">
                <div className="col-md-2">
                    <h4>Name</h4>
                    <p>{Info && Info.name}</p>
                </div>
                
                  <div className="col-md-2">
                    <h4>Gender</h4>
                    <p>{Info && Info.gender}</p>
                </div>
               
                  <div className="col-md-2">
                    <h4>Birh year</h4>
                    <p>{Info && Info.birth_year}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Height</h4>
                    <p>{Info && Info.height}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Eye Color</h4>
                    <p>{Info && Info.eye_color}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Hair color</h4>
                    <p>{Info && Info.hair_color}</p>
                </div>

            </div>
        </div>
    )
}