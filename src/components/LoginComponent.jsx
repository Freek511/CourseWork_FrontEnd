import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../services/AuthService.js";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {jwtDecode} from "jwt-decode";


const RegistrationComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regError, setRegError] = useState(null);

    const navigator =  useNavigate()
    const signIn = useSignIn()

    const [errors,setErrors] = useState({
        email: '',
        password: '',
    })
    function validForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(email.trim()){
            errorsCopy.email = ''
        }
        else{
            errorsCopy.email = 'Email is required'
            valid = false;
        }
        if(password.trim()){
            errorsCopy.password = ''
        }
        else{
            errorsCopy.password = 'Password is required'
            valid = false;
        }

        setErrors(errorsCopy)
        return valid;
    }

    function loginSubmit(e){
        e.preventDefault()
        const user = {email, password}
        console.log(user)

        if(validForm()){
            loginUser(user).then((response) => {


                console.log(response.data)
                signIn({
                    auth:{
                        token: response.data.token,
                        type: 'Bearer',
                    },
                    userState:{
                        email: user.email,
                        role: jwtDecode(response.data.token).cred[0].authority
                    }
                })
                navigator('/playgrounds')
            }).catch((error) => {
                console.log(error.response.data.token)
                setRegError(error.response.data.token)
            })
        }
    }


    return (
        <div className="container mt-2">
            <div className="row">
                <div className="card col-md-6 offset-md-3 ">
                    <h1 className="text-center">Registration</h1>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email ? `is-invalid` : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </input>
                                {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="text"
                                    value={password}
                                    placeholder="Enter Password"
                                    className={`form-control ${errors.password ? `is-invalid` : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
                                {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
                            </div>

                            <button className="btn btn-success" onClick={loginSubmit}>Login</button>
                            {regError && <div className="text-center text-dark"> {regError}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationComponent;