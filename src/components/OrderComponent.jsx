import React, {useEffect, useState} from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {useNavigate, useParams} from "react-router-dom";
import {getPlayground} from "../services/PlaygroundService.js";
import {createOrder, getOrderById, updateOrder} from "../services/OrderService.js";

const OrderComponent = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [capacity, setCapacity] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [createOrUpdateError, setCreateOrUpdateError] = useState(null);
    const [errors,setErrors] = useState({
        date: '',
        time: '',
    })
    const {order_id} = useParams();
    const {id} = useParams()
    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: useAuthHeader()
        }
    }
    const getDate = (pos) =>{
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate() + pos;

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
    }

    function renderPlayground(playground_id){
        getPlayground(playground_id, config).then((response) =>{
            setArea(response.data.area)
            setPrice(response.data.price)
            setName(response.data.name)
            setCapacity(response.data.capacity)
            setDescription(response.data.description)
        }).catch((error) =>{
            console.log(error)
        })
    }
    function renderOrder(order_id){
        getOrderById(order_id, config).then((response) =>{
            const oldDate = response.data.orderDate.split(' ')
            console.log(response.data)
            setDate(oldDate[1])
            setTime(oldDate[0])
            renderPlayground(response.data.playground_id)
        }).catch((error) =>{
            console.log(error)
        })
    }

    useEffect(() =>{
        if(id){
           renderPlayground(id)
        }
        else if (order_id){
            renderOrder(order_id)
        }
    }, [id, order_id])

    function validForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(date === '' || date === 'Choose..' ){
            errorsCopy.date = ''
            errorsCopy.date = 'Date is required'
            valid = false;
        }
        else{
            errorsCopy.date = ''
        }
        if(time === '' || time === 'Choose..' ){
            errorsCopy.time = ''
            errorsCopy.time = 'Time is required'
            valid = false;
        }
        else{
            errorsCopy.time = ''
        }

        setErrors(errorsCopy)
        return valid;
    }

    function saveOrUpdateOrder(e){
        e.preventDefault()
        const orderDate = time + " " + date
        const playground_id = id
        const order = {playground_id, orderDate}
        setCreateOrUpdateError(null)
        console.log(order)

        if(validForm()){
            if(order_id){
                updateOrder(order_id, order, config).then((response) => {
                    console.log(response.data)
                    navigate('/orders')
                }).catch((error) =>{
                    setCreateOrUpdateError(error.response.data)
                    console.log(error)
                })
            }
            else{
                createOrder(order, config).then((response) => {
                    console.log(response)
                    navigate('/orders')
                }).catch((error) => {
                    console.log(error)
                    setCreateOrUpdateError(error.response.data)
                })
            }
        }


    }


    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-8">Must be a image</div>
                <div className="col-4 align-self-center">
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>{price}</p>
                    <p>{area}</p>
                    <p>{capacity}</p>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Date</label>
                        <select className={`form-select form-control ${errors.date || createOrUpdateError ? `is-invalid` : ''}`}
                                id="inputGroupSelect01"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}>
                            <option>Choose..</option>
                            <option value={getDate(1)}>{getDate(1)}</option>
                            <option value={getDate(2)}>{getDate(2)}</option>
                            <option value={getDate(3)}>{getDate(3)}</option>
                            <option value={getDate(4)}>{getDate(4)}</option>
                            <option value={getDate(5)}>{getDate(5)}</option>
                        </select>
                        {errors.date && <div className='invalid-feedback'> {errors.date}</div>}
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Time</label>
                        <select className={`form-select form-control ${errors.time || createOrUpdateError ? `is-invalid` : ''}`}
                                id="inputGroupSelect01"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}>
                            <option>Choose..</option>
                            <option value="10.00">10.00</option>
                            <option value="13.00">13.00</option>
                            <option value="16.00">16.00</option>
                            <option value="19.00">19.00</option>
                            <option value="22.00">22.00</option>
                        </select>
                        {errors.time && <div className='invalid-feedback'> {errors.time}</div>}
                    </div>
                    <button className="btn btn-dark"
                            onClick={saveOrUpdateOrder}>{order_id ? `Update order` : `Add to cart`}</button>
                    {createOrUpdateError && <div className="text-center text-danger mt-1"> {createOrUpdateError}</div>}
                </div>
            </div>
        </div>
    );
};

export default OrderComponent;