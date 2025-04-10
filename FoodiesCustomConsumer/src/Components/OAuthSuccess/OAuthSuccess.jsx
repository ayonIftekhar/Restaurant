import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function OAuthSuccess(){
    const navigate = useNavigate();
     const { token } = useParams();
    useEffect(()=>{
        sessionStorage.setItem("jwt", token);
        navigate("/home");
    },[])
    
}
export default OAuthSuccess;