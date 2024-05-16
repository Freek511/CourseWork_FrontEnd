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
    function showPlayground(id) {
        navigator(`/playgrounds/` + id)
        console.log(id)
    }
     const getRandom = (min, max)=>{
        return Math.floor(Math.random() * (max - min)) + min
     }



    return (
        <div className="container-lg">
            <h1 className="text-center mb-2 mt-2">List of Playgrounds</h1>
            { userRole === 'ADMIN' &&
                <button type="button" className="btn btn-dark m-1" onClick={addPlayground}>Add Playground</button>}
            <div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
                {
                    playgrounds.map(playground =>
                        <div key={playground.id} className="col">
                            <div className="card border-black text-dark bg-light mb-3 h-100"
                                 style={{width: 18 + 'rem'}}>
                                <img onClick={() => showPlayground(playground.id)}
                                     src={`/image${getRandom(1,10)}.jpg`} className="card-img-top" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">Playground {playground.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{playground.description}</h6>
                                    <p className="card-text">Price: {playground.price} $</p>
                                    <p className="card-text">Area: {playground.area} m<sup><small>2</small></sup></p>
                                    <p className="card-text">Max capacity: {playground.capacity} people</p>
                                    <div className="btn-group-vertical">
                                        <a href="" className="btn btn-dark mt-1"
                                           onClick={() => showPlayground(playground.id)}
                                        >More Info</a>
                                        {userRole === 'ADMIN' &&
                                            <a href="" className="btn btn-dark mt-1 "
                                               onClick={() => updatePlayground(playground.id)}>
                                                Update</a>}
                                        {userRole === 'ADMIN' &&
                                            <a href="" className="btn btn-danger mt-1 "
                                               onClick={() => removePlayground(playground.id)}
                                            >Delete</a>}

                                    </div>
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