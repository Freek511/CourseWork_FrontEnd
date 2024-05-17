import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {loginUser} from "../services/AuthService.js";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import {jwtDecode} from "jwt-decode";


const RegistrationComponent = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logError, setLogError] = useState(null);

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
        setLogError(null)
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
                console.log(error.response)
                setLogError('Bad email or password!')
            })
        }
    }


    return (
        <div className="container mt-2">
            <div className="row">
                <div className="card col-md-6 offset-md-3 ">
                    <h1 className="text-center">Login</h1>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder="Enter Email"
                                    className={`form-control ${errors.email || logError ? `is-invalid` : ''}`}
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
                                    className={`form-control ${errors.password || logError ? `is-invalid` : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                >
                                </input>
                                {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
                            </div>
                            <p> Don't have an account? <a href="" onClick={() => navigator('/register')}
                                  className="link-body-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">
                                Create it right now!</a></p>

                            <button className="btn btn-dark"
                                    onClick={loginSubmit}>Login</button>
                            {logError && <div className="text-center text-black mt-1"> {logError}</div>}
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RegistrationComponent;