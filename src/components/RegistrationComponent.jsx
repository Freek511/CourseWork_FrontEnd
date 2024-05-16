import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {registerUser} from "../services/AuthService.js";
import useSignIn from "react-auth-kit/hooks/useSignIn";


const RegistrationComponent = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [regError, setRegError] = useState(null);
    const role = 'USER'

    const navigator =  useNavigate()
    const signIn = useSignIn()

    const [errors,setErrors] = useState({
        login: '',
        email: '',
        password: '',
    })
    function validForm(){
        let valid = true;
        const errorsCopy = {... errors}

        if(login.trim()){
            errorsCopy.login = ''
        }
        else{
            errorsCopy.login = 'Login is required'
            valid = false;
        }
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

    function registerSubmit(e){
        e.preventDefault()
        setRegError(null)
        const user = {login, email, password, role}
        console.log(user)

        if(validForm()){
            registerUser(user).then((response) => {

                console.log(response)
                signIn({
                    auth:{
                        token: response.data.token,
                        type: 'Bearer',
                    },
                    userState:{
                        email: user.email,
                        role: user.role
                    }
                })
                navigator('/playgrounds')
            }).catch((error) => {
                console.log(error.response)
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
                                <label htmlFor="name" className="form-label">Login</label>
                                <input
                                    type="text"
                                    value={login}
                                    placeholder="Enter Login"
                                    className={`form-control ${errors.login || regError ? `is-invalid` : ''}`}
                                    onChange={(e) => setLogin(e.target.value)}
                                >
                                </input>
                                {errors.login && <div className='invalid-feedback'> {errors.login}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email || regError ? `is-invalid` : ''}`}
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
                                    className={`form-control ${errors.password || regError ? `is-invalid` : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
                                {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
                            </div>
                            <p>If you already have an account just
                                <a href="" onClick={()=> navigator('/login')}
                                   className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">
                                    Sign In!</a></p>

                            <button className="btn btn-dark" onClick={registerSubmit}>Register</button>
                            {regError && <div className="text-center text-dark mt-1"> {regError}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationComponent;