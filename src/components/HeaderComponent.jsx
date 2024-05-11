import React from 'react';

const HeaderComponent = () => {
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <h1 className="text-white">Some text</h1>
                <a href='/register'> Register</a>
                <a href='/playgrounds'> Playgrounds</a>
            </nav>
        </div>
    );
};

export default HeaderComponent;