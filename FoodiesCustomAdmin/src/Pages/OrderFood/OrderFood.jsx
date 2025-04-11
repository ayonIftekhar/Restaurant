import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders } from "../../FoodServices/FoodService";

function OrderFood(){
    
    const [orders , setOrders] = useState([]);

    async function retireveOrders(){
        const response  = await getOrders();
        if(response.status === 200){
            setOrders(response.data);
            console.log(response.data);
        }else{
            window.alert("Failed loading orders!")
        }
    }

    useEffect(()=>{
        retireveOrders();
    },[])

    const handleStatusChange = (index, newStatus) => {
      const updated = [...orders];
      updated[index].orderStatus = newStatus;
      setOrders(updated);
    };

    const updateStatus = async (orderId, newStatus) => {
      try {
        await axios.put(
          `https://restaurant-gwgl.onrender.com/api/all-orders/${orderId}`,
          {
            status: newStatus,
          }
        );
        toast.success("Status updated!");
      } catch (err) {
       toast.error("failed upadting status")
      }
    };

    return (
      <div className="container mt-4">
        <h3 className="mb-4">Order List</h3>
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark text-center">
            <tr>
              <th>Order ID</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.fullName}</td>
                <td>{order.address}</td>
                <td>
                  <select
                    className="form-select"
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(idx, e.target.value)}
                  >
                    <option>Preparing</option>
                    <option>Prepared</option>
                    <option>On the way</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      updateStatus(order.orderId, order.orderStatus)
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default OrderFood;