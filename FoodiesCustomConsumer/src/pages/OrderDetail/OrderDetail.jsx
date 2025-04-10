import { assets } from '../../assets/assets'
import { useContext, useState } from 'react';
import { FoodsContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import { getPaymentURL } from '../../FoodService/FoodService';

function OrderDetail() {

  //calculating cart details

  const { foods, counts, increment, decrement, resetCount } =
    useContext(FoodsContext);
  const filteredFoods = foods.filter((food) => (counts[food.id] || 0) > 0);

  const shippingCharge = 80;
  const subTotal = filteredFoods.reduce(
    (acc, food) => acc + food.price * (counts[food.id] || 0),
    0
  );
  const vat = subTotal * 0.05;

  const total = subTotal + vat + shippingCharge;

  // collecting Form data

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    country: "",
    zip: "",
    state: "",
    items: counts,
    totalPrice : total,
  });

  // handling form submission

  async function onSubmitHandler(e) {

    e.preventDefault();
    const response = await getPaymentURL(userData);

    if (response.status === 200) {
      window.location.href = response.data.url;
    } else {
      toast.error("Failed updating orders !");
    }
    
  }

  return (
    <div className="container">
      <div className="py-2 text-center">
        <img
          className="d-block mx-auto mb-4"
          src={assets.logo}
          alt=""
          width="72"
          height="72"
        />
        <h4>Cafe 69,Dhaka</h4>
      </div>

      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {filteredFoods.map((food, id) => (
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div key={id}>
                  <h6 className="my-0">{ food.name }</h6>
                  <small className="text-muted">Qty. { counts[food.id] }</small>
                </div>
                <span className="text-muted">Tk. { food.price * counts[food.id] }</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">Shipping Charge</h6>
              </div>
              <span className="text-muted">Tk.{ shippingCharge }</span>
            </li>
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">VAT.</h6>
              </div>
              <span className="text-muted">Tk. {vat }</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (BDT)</span>
              <strong>Tk.{ total}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Eg. John"
                  onChange={(e)=>setUserData(prev=>({...prev,['firstName']:e.target.value}))}
                  value={userData.firstName}
                  required
                />
                <div className="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Eg. Doe"
                  onChange={(e)=>setUserData(prev=>({...prev,['lastName']:e.target.value}))}
                  value={userData.lastName}
                  required
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Required)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="you@example.com"
                value={userData.email}
                onChange={(e)=>setUserData(prev=>({...prev,['email']:e.target.value}))}
                required
              />
              <div className="invalid-feedback">
                Please enter a valid email address htmlFor shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 Main St"
                onChange={(e) => setUserData(prev => ({ ...prev, ['address']: e.target.value }))}
                value={userData.address}
                required
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="custom-select d-block w-100"
                  id="country"
                  onChange={(e)=>setUserData(prev=>({...prev,['country']:e.target.value}))}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Bangladesh</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="custom-select d-block w-100"
                  id="state"
                  onChange={(e)=>setUserData(prev=>({...prev,['state']:e.target.value}))}
                  required
                >
                  <option value="">Choose...</option>
                  <option>Dhaka</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  onChange={(e) => setUserData(prev => ({ ...prev, ['zip']: e.target.value }))}
                  value={userData.zip}
                  required
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />
            <button
              className="btn btn-primary btn-lg btn-block mb-5"
              type="submit"
            >
              Continue to checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;