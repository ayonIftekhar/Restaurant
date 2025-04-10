import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets'
import { FoodsContext } from '../../Context/Context';
import { login } from '../../FoodService/FoodService';

function LogIn() {

  const { setCounts } = useContext(FoodsContext);
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    'email': '',
    'password': '',
  })

  function setEmail(e) {
    setUserData(prev => ({
      ...prev , ['email'] : e.target.value
    }))
  }

  function setPassword(e) {
    setUserData((prev) => ({
      ...prev,
      ["password"]: e.target.value,
    }));
  }

  async function handleLogIn() {
    if (userData.email === "" || userData.password === "") return;
    try {
      const response = await login(userData);
      //console.log(userData)
      if (response.status === 200) {
        sessionStorage.setItem("jwt", response.data.token);
        setCounts(response.data.cart)
        toast.success("Welcome Back!")
        navigate('/home')
      }
    } catch (e) {
      toast.error("Wrong Email or Password!")
    }
  }
    return (
      <section className="vh-90" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                      style={{ "borderRadius ": "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="d-flex justify-content-center align-items-center mb-3 pb-1">
                          <i
                            className="fas fa-cubes fa-2x me-3"
                            style={{ color: "#ff6219" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">
                            <img
                              src={assets.logo}
                              alt="login form"
                              className="img-fluid"
                              style={{ "borderRadius ": "1rem 0 0 1rem" }}
                              height={80}
                              width={80}
                            />
                          </span>
                        </div>
                        <div className="text-center mt-3 mb-2">
                          <h3 className=" fw-bold text-dark">
                            <span className="text-warning fst-italic">
                              Caffe 88
                            </span>
                            <span className="text-muted fs-5 fst-italic">
                              , Dhaka
                            </span>
                          </h3>
                        </div>

                        <div
                          data-mdb-input-init
                          className="form-outline mb-4 mt-5"
                        >
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Email address
                          </label>
                          <input
                            type="email"
                            id="form2Example17"
                            value={userData.email}
                            onChange={(e) => setEmail(e)}
                            placeholder="eg. john@example.com"
                            className="form-control form-control-md"
                            required
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            value={userData.password}
                            onChange={(e) => setPassword(e)}
                            className="form-control form-control-md"
                            placeholder="eg. johnDoe6"
                            required
                          />
                        </div>

                        <div className="pt-1 mb-4 d-flex justify-content-center align-items-center">
                          <button
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-dark btn-lg btn-block"
                            type="button"
                            onClick={handleLogIn}
                          >
                            Login
                          </button>
                        </div>
                        <p
                          className="pb-lg-2 text-center"
                          style={{ color: "#393f81" }}
                        >
                          Don't have an account?{" "}
                          <Link to="/register" style={{ color: "#393f81" }}>
                            Register here
                          </Link>
                        </p>
                        <div className="text-center mt-3">
                          <p>Or login with</p>
                          <a
                            href="http://localhost:8869/oauth2/authorization/google"
                            className="btn btn-outline-danger btn-md"
                          >
                            <i className="fab fa-google me-2"></i> Login with
                            Google
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default LogIn;