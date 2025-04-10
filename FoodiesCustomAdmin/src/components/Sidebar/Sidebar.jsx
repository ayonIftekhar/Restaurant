import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/Assets";
import './Sidebar.css';


function Sidebar({ sidebar }) {
    return (
        <div className={`border-end bg-white ${sidebar ? '' : 'd-none'}`} id="sidebar-wrapper">
            <div className="p-3 border-bottom bg-light d-flex align-items-center gap-2">
                <img src={assets.logo} height={32} width={48} alt="Logo" />
                <span className="fw-bold fs-5 m-0">Foodies 2.0</span>
            </div>
            <div className="list-group list-group-flush">
                <Link className="list-group-item list-group-item-action p-3" style={{ backgroundColor: '#f0f8ff' }} to="/list-foods">
                    <i className="bi bi-list-ul me-2"></i>List of Foods
                </Link>
                <Link className="list-group-item list-group-item-action p-3" style={{ backgroundColor: '#f0f8ff' }} to="/add-food">
                    <i className="bi bi-plus-circle me-2"></i>Add Food
                </Link>
                <Link className="list-group-item list-group-item-action p-3" style={{ backgroundColor: '#f0f8ff' }} to="/order-food">
                    <i className="bi bi-cart-plus me-2"></i>Order Food
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
