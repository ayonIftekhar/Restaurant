import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { sendMessage } from "../../FoodService/FoodService";


function ContactUs(){

    const navigate = useNavigate();

    const [formData , setFormData] = useState({
        name : "",
        email: "",
        message : "",
    });

    const [recaptchaToken, setRecaptchaToken] = useState(null);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {

      e.preventDefault();
      if (!recaptchaToken) {
        alert("Please complete the reCAPTCHA.");
        return;
      }
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        recaptchaToken: recaptchaToken,
      };

      const response = await sendMessage(payload);
      if(response.status === 200){
        toast.success("Opinion Registered successfully!")
        navigate("/home");
      }else{
        toast.error("Error registering opinion...")
      }

      console.log(payload);
    };

    return (
      <section id="contact" className="py-5">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 col-xl-6 text-center">
              <h2 className="mt-0">Let's Get In Touch!</h2>
              <hr className="divider" />
              <p className="text-muted mb-5">
                Ready to start your journey with us? Send us a message and we
                will get back to you as soon as possible!
              </p>
            </div>
          </div>
          <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    id="message"
                    type="text"
                    placeholder="Enter your message here..."
                    style={{ height: "10rem" }}
                    onChange={handleChange}
                    required
                  ></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                <div className="d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey="6LeyrxIrAAAAAI2PSXZwAqP6067K6_aiDnbRg83e"
                    onChange={(token) => setRecaptchaToken(token)}
                    className="mb-3"
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary btn-xl" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
}
export default ContactUs;