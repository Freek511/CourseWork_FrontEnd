import React, {useEffect, useState} from 'react';
import {deletePlayground, listOfPlaygrounds} from "../services/PlaygroundService.js";
import {useNavigate} from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ListPlaygroundsComponent = () => {

    const config = {
        headers: {
            Authorization: useAuthHeader()
        }
    }

    const navigator = useNavigate();
    const [playgrounds, setPlaygrounds] = useState([])
    const authUser = useAuthUser()
    const userRole = authUser.role


    useEffect(()=> {
        getAllPlaygrounds()
    }, [])

    function getAllPlaygrounds(){
        listOfPlaygrounds(config).then((response) => {
            console.log(response)
            setPlaygrounds(response.data);
        }).catch((error) => {
            console.error(error);
        })
    }


    function addPlayground(){
        navigator('/add-playground')
    }
    function updatePlayground(id){
        navigator(`/edit-playground/` + id)
        console.log(id)
    }
    function removePlayground(id){
        console.log(id)
        deletePlayground(id).then(() =>{
            getAllPlaygrounds();
        }).catch((error) =>{
            console.log(error)
        })

    }


    return (
        <div className="container-lg">
            <h1 className="text-center">List of Playgrounds</h1>
            { userRole === 'ADMIN' &&
                <button type="button" className="btn btn-dark m-1" onClick={addPlayground}>Add Playground</button>}
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    playgrounds.map(playground =>
                        <div key={playground.id} className="col">
                            <div className="card text-dark bg-light mb-3" style={{width: 18 + 'rem'}}>
                                <div className="card-body">
                                    <h5 className="card-title">{playground.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{playground.description}</h6>
                                    <p className="card-text">Price {playground.price}</p>
                                    <p className="card-text">Area {playground.area}</p>
                                    <p className="card-text">Capacity {playground.capacity}</p>
                                    {userRole === 'ADMIN' &&
                                        <a href="" className="card-link"
                                        onClick={() => updatePlayground(playground.id)}>
                                        Изменить</a>}
                                    {userRole === 'ADMIN' &&
                                        <a href="" className="card-link"
                                        onClick={() => removePlayground(playground.id)}
                                    >Удалить</a>}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ListPlaygroundsComponent