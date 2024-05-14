import React from 'react';
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {useNavigate} from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const HeaderComponent = () => {

    const logout = useSignOut()
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()

    function handleLogout() {
        logout()
        navigate('/login')
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-black bg-black">
                <div className="container-fluid">
                    <a className="navbar-brand text-white" href="#">PGTOP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link text-white" href="/playgrounds">Playgrounds</a>
                            {!isAuthenticated &&
                                <a className="nav-link text-white" href="/login">Login</a>}
                            {!isAuthenticated &&
                                <a className="nav-link text-white" href="/register">Registration</a>}
                            {isAuthenticated &&
                                <a className="nav-link text-white" href="#">Orders</a>}
                            {isAuthenticated &&
                                <a className="nav-link text-white" href="" onClick={handleLogout}>Logout</a>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HeaderComponent;