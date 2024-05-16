import React, {useEffect, useState} from 'react';
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {deleteOrder, getAllOrdersByUser, getAllOrdersForAdmin} from "../services/OrderService.js";
import {useNavigate} from "react-router-dom";
import {sendEmail} from "../services/EmailService.js";



const ListOrdersComponent = () => {


    const config = {
        headers: {
            Authorization: useAuthHeader()
        }
    }
    const [orders, setOrders] = useState([])
    const authUser = useAuthUser()
    const userRole = authUser.role
    const userEmail = authUser.email
    const navigator =  useNavigate()

    useEffect(()=> {
        getAllOrders()
    }, [])

    function getAllOrders(){
        if(userRole === 'ADMIN'){
            getAllOrdersForAdmin(config).then((response) => {
                console.log(response)
                setOrders(response.data)
            }).catch((error) => {
                console.error(error)
            })
        }
        else {
            getAllOrdersByUser(config).then((response) => {
                console.log(response)
                setOrders(response.data)
            }).catch((error) => {
                console.error(error)
            })
        }
    }

    function deleteOrderHandler(id){
        console.log(id)
        deleteOrder(id, config).then(() =>{
            getAllOrders();
        }).catch((error) =>{
            console.log(error)
        })
    }

    function updateOrderHandler(id){
        console.log(id)
        navigator('/edit-order/'+id)
    }

    function acceptOrderHandler(id){
        sendEmail(id).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        }).finally(() =>{
            deleteOrderHandler(id)
            alert("Check your email for details")
        })
    }

    function pageTitle(email){
        if (userRole === 'ADMIN'){
            return <h2 className="mt-2">List of order for Admin with email - {email}</h2>
        }
        else{
            return  <h2 className="mt-2">List of orders for User with email - {email}</h2>
        }
    }


    return (
        <div>
            {pageTitle(userEmail)}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th scope="col">Order id</th>
                    {userRole === 'ADMIN' && <th scope="col">Owner Email</th>}
                    <th scope="col">Playground Name</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.map((order) =>
                        <tr key={order.id}>
                            <th scope="row">{order.id}</th>
                            {userRole === 'ADMIN' && <td>{order.user_id}</td>}
                            <td> {order.playground_id}</td>
                            <td>{order.orderDate}</td>
                            <td>price</td>
                            <td>
                                <button className="btn btn-success m-1"
                                        onClick={() => acceptOrderHandler(order.id)}>
                                    Accept
                                </button>
                                <button className="btn btn-dark m-1"
                                        onClick={() => updateOrderHandler(order.id)}>
                                    Update
                                </button>
                                <button className="btn btn-danger m-1"
                                        onClick={() => deleteOrderHandler(order.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    )

                }

                </tbody>
            </table>
            {orders.length === 0 && (
                <p> Don't have any orders? <a href="/playgrounds"
                className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">
                Add it right now!</a></p>)
            }

        </div>
    );
};

export default ListOrdersComponent;