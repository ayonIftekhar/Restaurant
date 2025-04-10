import React from "react";

function Menubar( {sidebarToggle} ) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button className="btn btn-primary" id="sidebarToggle" onClick={sidebarToggle}>
                            <i className="bi bi-list"></i>
                        </button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item active me-5"><a className="nav-link" href="#!">Log Out</a></li>
                            </ul>
                        </div>
                    </div>
            </nav>
        </>
    )
}

export default Menubar;