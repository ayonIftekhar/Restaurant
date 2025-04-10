
import './Register.css'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { register } from '../../FoodService/FoodService';
import { toast } from 'react-toastify';

function Register() {


  const [userData, setUserData] = useState({
    'name': '',
    'email': '',
    'phone': '',
    'password': ''
  })
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()

  function changeEmail(e) {
    setUserData(prev => ({
      ...prev, ['email']: e.target.value
    }))
  }

  function changePhone(e) {
    setUserData((prev) => ({
      ...prev,
      ['phone']: e.target.value,
    }));
  }

  function changePassword(e) {
    setUserData(prev => ({
      ...prev,['password'] : e.target.value
    }))
  }

  async function confirmRegister() {
    
    const finalUser = {
      ...userData,
      'name': `${firstName} ${lastName}`,
    };

    if (!firstName || !lastName || !userData.password || !userData.phone || !userData.email) return;
    try {
      const response = await register(finalUser);
      if (response.status === 202) {
        toast.success("Registration Successful! " + response.data.name)
        navigate('/login');
      }
    } catch (e) {
       toast.error("An Error Occurred! Try Again...")
    }
  }

    return (
      <div>
        <section className="vh-90" style={{ "backgroundColor": "#9A616D" }}>
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ "borderRadius": "15px" }}
                >
                  <div className="card-body p-4 p-md-5 ">
                    <span className="h1 fw-bold mb-0 d-flex justify-content-center">
                      <img
                        src={assets.logo}
                        alt="login form"
                        className="img-fluid"
                        style={{ "borderRadius ": "1rem 0 0 1rem" }}
                        height={80}
                        width={80}
                      />
                    </span>
                    <div className="text-center mt-3 mb-5">
                      <h3 className=" fw-bold text-dark">
                        <span className="text-warning fst-italic">Caffe 69</span>
                        <span className="text-muted fs-5 fst-italic">, Dhaka</span>
                      </h3>
                    </div>

                    <form onSubmit={(e)=>e.preventDefault()}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              value={firstName}
                              onChange={(e)=>setFirstName(e.target.value)}
                              placeholder="eg. John"
                              className="form-control form-control-md"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              value={lastName}
                              onChange={(e)=>setLastName(e.target.value)}
                              className="form-control form-control-md"
                              placeholder="eg. Doe"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div data-mdb-input-init className="form-outline">
                            <label
                              className="form-label"
                              htmlFor="emailAddress"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="emailAddress"
                              onChange={(e) => changeEmail(e)}
                              value={userData.email}
                              className="form-control form-control-md"
                              placeholder="eg. John@example.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div data-mdb-input-init className="form-outline">
                            <label className="form-label" htmlFor="phoneNumber">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phoneNumber"
                              value={userData.phone}
                              onChange={(e)=>changePhone(e)}
                              className="form-control form-control-md"
                              placeholder="eg. 01711...."
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          value={userData.password}
                          onChange={(e)=>changePassword(e)}
                          className="form-control form-control-md"
                          placeholder="eg. johnDoe6"
                          required
                        />
                      </div>

                      <div className="mt-4 pt-2 d-flex justify-content-center">
                        <input
                          data-mdb-ripple-init
                          className="btn btn-dark btn-md"
                          type="submit"
                          value="Register"
                          onClick={confirmRegister}
                        />
                      </div>
                      <p
                        className="pb-lg-2 text-center mt-4"
                        style={{ color: "#393f81" }}
                      >
                        Already have an account?{" "}
                        <Link to="/login" style={{ color: "#393f81" }}>
                          Log In
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Register;