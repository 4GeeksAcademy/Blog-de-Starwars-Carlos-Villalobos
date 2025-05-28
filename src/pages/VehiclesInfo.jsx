import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const VehiclesInfo = () => {
    const { uid } = useParams();
    // const { store, dispatch } = useGlobalReducer();
    const [Info, setInfo] = useState();

    function infoApi() {
        fetch("https://www.swapi.tech/api/vehicles/" + uid)
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
                        src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/vehicles/${uid}.jpg`}
                        className="img-info vehicle-img"
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
                    <h4>Climate</h4>
                    <p>{Info && Info.cargo_capacity}</p>
                </div>
               
                  <div className="col-md-2">
                    <h4>Created</h4>
                    <p>{Info && Info.consumables}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Diameter</h4>
                    <p>{Info && Info.cost_in_credits}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Gravity</h4>
                    <p>{Info && Info.model}</p>
                </div>

                  <div className="col-md-2">
                    <h4>Orbital period</h4>
                    <p>{Info && Info.crew}</p>
                </div>

            </div>
        </div>
    )
}