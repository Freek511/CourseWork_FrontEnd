import React, {useEffect, useState} from 'react';
import {createPlayground, getPlayground, updatePlayground} from "../services/PlaygroundService.js";
import {useNavigate, useParams} from "react-router-dom";

const PlaygroundComponent = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');

    const {id} = useParams();
    const navigator =  useNavigate()
    useEffect(() =>{
        if(id){
            getPlayground(id).then((response) =>{
                setArea(response.data.area)
                setPrice(response.data.price)
                setName(response.data.name)
                setCapacity(response.data.capacity)
                setDescription(response.data.description)
            }).catch((error) =>{
                console.log(error)
            })

        }
    }, [id])

    const [errors,setErrors] = useState({
        name: '',
        description: '',
        area: '',
        price: '',
        capacity: ''
    })

    function saveOrUpdatePlayground(e){
        e.preventDefault();
        const playground = {name, description, area, price, capacity};
        console.log(playground);

        if(validForm()){
            if(id){
                updatePlayground(id, playground).then((response) => {
                    console.log(response.data)
                    navigator('/playgrounds')
                }).catch((error) => {
                    console.log(error)
                })
            }
            else{
                createPlayground(playground).then((response) =>{
                    console.log(response.data);
                    navigator('/playground')
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }

    function validForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(name.trim()){
            errorsCopy.name = ''
        }
        else{
            errorsCopy.name = 'Name is required'
            valid = false;
        }
        if(description.trim()){
            errorsCopy.description = ''
        }
        else{
            errorsCopy.description = 'Description is required'
            valid = false;
        }
        if(price.trim()){
            errorsCopy.price = ''
        }
        else{
            errorsCopy.price = 'Price is required'
            valid = false;
        }
        if(area.trim()){
            errorsCopy.area = ''
        }
        else{
            errorsCopy.area = 'Area is required'
            valid = false;
        }
        if(capacity.trim()){
            errorsCopy.capacity = ''
        }
        else{
            errorsCopy.capacity = 'Capacity is required'
            valid = false;
        }
        setErrors(errorsCopy)
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update Playground</h2>
        }
        else {
            <h2 className="text-center">Add Playground</h2>
        }

    }

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="card col-md-6 offset-md-3 ">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Enter Playground Name"
                                    className={`form-control ${errors.name ? `is-invalid` : ''}`}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                {errors.name && <div className='invalid-feedback'> {errors.name }</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    placeholder="Enter Description"
                                    className={`form-control ${errors.description ? `is-invalid` : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </input>
                                {errors.description && <div className='invalid-feedback'> {errors.description }</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Area</label>
                                <input
                                    type="number"
                                    value={area}
                                    placeholder="Enter Area"
                                    className={`form-control ${errors.area ? `is-invalid` : ''}`}
                                    onChange={(e) => setArea(e.target.value)}
                                >
                                </input>
                                {errors.area && <div className='invalid-feedback'> {errors.area }</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="name" className="form-label">Price</label>
                                <input
                                    type="number"
                                    value={price}
                                    placeholder="Enter Price"
                                    className={`form-control ${errors.price ? `is-invalid` : ''}`}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </input>
                                {errors.price && <div className='invalid-feedback'> {errors.price }</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="number" className="form-label">Capacity</label>
                                <input
                                    type="number"
                                    value={capacity}
                                    placeholder="Enter Capacity"
                                    className={`form-control ${errors.capacity ? `is-invalid` : ''}`}
                                    onChange={(e) => setCapacity(e.target.value)}
                                >
                                </input>
                                {errors.capacity && <div className='invalid-feedback'> {errors.capacity }</div>}
                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdatePlayground}>Apply</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PlaygroundComponent;