import { useEffect, useState } from "react";
import { getOrders } from "../../FoodService/FoodService";
import { toast } from "react-toastify";

function OrderHistory() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const response = await getOrders();
    if (response.status === 200) {
      setOrders(response.data);
    } else {
      toast.error("Failed to fetch orders.");
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  function reloadHistory(){
    fetchOrders();
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Orders</h3>
      <div className="row">
        {orders.map((order) => (
          <div className="col-md-6 mb-4" key={order.transactionId}>
            <div className="card border-primary shadow-lg rounded-3">
              <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                <span>
                  <strong>Order #{order.orderId}</strong>
                </span>
                <i
                  className="bi bi-arrow-clockwise fs-5 text-white"
                  style={{ cursor: "pointer" }}
                  title="Reload"
                  onClick={reloadHistory}
                ></i>
              </div>
              <div className="card-body">
                <p className="mb-2">
                  <strong>Name:</strong> {order.fullName}
                </p>
                <p className="mb-2">
                  <strong>Address:</strong> {order.address}, {order.state},{" "}
                  {order.zip}
                </p>
                <p className="mb-0">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge px-3 py-2 ${
                      order.orderStatus === "Preparing"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
