import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {assets} from '../../assets/assets.js'
import { FoodsContext } from '../../Context/Context.jsx';
import './Menubar.css'

export function Menubar(){
    const {counts,setCounts} = useContext(FoodsContext);
    const numberOfItems = Object.values(counts).filter((count)=>count>0).length;

    const [active, setActive] = useState('');
    const navigate = useNavigate();

    function isAuthorized() {
        return !!sessionStorage.getItem("jwt");
    }

    function logout() {
        sessionStorage.removeItem("jwt");
        setCounts({});
        navigate('/login')
    }
    
    function orders() {
        navigate("/order-history")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link to='/'><img src={assets.logo} height={48} width={48} alt="" className='me-2'></img></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className={"nav-item me-3"}>
                            <Link className={ active === 'home' ? "nav-link fw-bold active" : "nav-link"} aria-current="page" to="/home" onClick={()=>setActive('home')}>Home</Link>
                            </li>
                            <li className={"nav-item me-3"}>
                            <Link className={ active === 'explore' ? "nav-link fw-bold active" : "nav-link"} to="/explore" onClick={()=>setActive('explore')}>Explore</Link>
                            </li>
                            {
                                isAuthorized() ? 
                                    <li className={"nav-item me-3"}>
                                        <Link className={ active === 'contact-us' ? "nav-link fw-bold active" : "nav-link"} to="/contact-us" onClick={()=>setActive('contact-us')}>Contact Us</Link>
                                    </li>
                                    :
                                    <></>
                            }
                        </ul>
                        <div className='d-flex gap-4 align-items-center'>
                            <Link to="/cart">
                                <div className='position-relative'>
                                    <img src={assets.cart} height={32} width={32} className=''></img>
                                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning' > {numberOfItems} </span>
                                </div>
                            </Link>
                            {
                                isAuthorized() ?
                                    <>
                                        <button className='btn btn-outline-primary' onClick={orders}> Orders </button>
                                        <button className='btn btn-outline-primary' onClick={logout}> Log Out </button>
                                    </>
                                        :
                                    <>
                                        <button className='btn btn-outline-primary' onClick={()=>navigate("/login")}> Log In </button>
                                        <button className='btn btn-outline-success' onClick={()=>navigate("/register")}> Register </button>
                                    </>
                            }

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
