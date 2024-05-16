import React from 'react';

const FooterComponent = () => {
    return (
        <div className="container">
            <footer className="page-footer font-small blue pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="row">
                        <div className="col-md-6 mt-md-0 mt-3">
                            <h5 className="text-uppercase">PBTOP</h5>
                            <p>From Russia With Love</p>
                        </div>

                        <hr className="clearfix w-100 d-md-none pb-0"/>

                        <div className="col-md-6 mb-md-0 mb-3">
                            <h5 className="text-uppercase">Links</h5>
                            <ul className="list-unstyled">
                                <li><a className="link-dark" href="https://github.com/Freek511">GitHub</a></li>
                                <li><a className="link-dark" href="https://t.me/j1nkis">Telegram</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="footer-copyright text-center py-3">© 2024 Copyright:
                    <a href="https://t.me/j1nkis" className="link-dark"> Matveev A.A</a>
                </div>

            </footer>
        </div>
    );
};

export default FooterComponent;