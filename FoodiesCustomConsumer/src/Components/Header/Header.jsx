import { Link } from "react-router-dom";

function Header(){
    return (
        <div className="container d-flex flex-column align-items-start mb-5 mt-5">
            <h1 className="mt-5 fw-bolder">Order Your Favourite Food Here</h1>
            <p> Discover the best food and drink in Dhaka</p>
            <Link to='/explore'><button className="btn btn-primary">Explore</button></Link>
        </div>
    )
}

export default Header;