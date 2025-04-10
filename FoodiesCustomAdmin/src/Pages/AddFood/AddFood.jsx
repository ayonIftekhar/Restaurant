import {toast} from 'react-toastify'
import React, { useState } from "react";
import assets from "../../assets/Assets";
import addFood from "../../FoodServices/FoodService";

function AddFood() {

    const [ image , setImage ] = useState(false);
    const [ data , setData ] = useState(
        {
            name        : '',
            description : '',
            category    : '',
            price       : '',
        }
    )

    function onChangeHandler( event ){
        const name  = event.target.name;
        const value = event.target.value;
        setData( data => ({...data, [name]:value } ) )
    }

    async function onSubmitHandler( event ){
        event.preventDefault();
        if( !image ){                         // JS validation , better than html validation (required)
            alert('Please Enter An Image.')
            return;
        }
        // const formData = new FormData();
        // formData.append('food' , JSON.stringify(data));
        // formData.append('file' , image);
        try{
            //const response =await axios.post("http://localhost:8869/api/foods" , formData , {headers : {"Content-Type": "multipart/form-data"}})
            const response =await addFood(data , image)
            
            if(response.status === 200){
                //alert('food added successfully!')
                toast.success("Food added succesfully!")
                setData({name:'' , description:'' , category:'' ,price:''})
                setImage(false)
            }
        }catch(error){
            toast.error("Food addition failed!")
        }
    }   

    return (
      <>
        <div className="container mt-2">
          <div className="row justify-content-center">
            <div className="card col-md-6 mb-5">
              <div className="card-body">
                <h2 className="mb-4 mt-4 text-center">Add Food</h2>
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3 text-center">
                    <label htmlFor="image" className="form-label">
                      <img
                        src={image ? URL.createObjectURL(image) : assets.upload}
                        alt="Upload Image"
                        height={100}
                        width={100}
                      ></img>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      required
                      hidden
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      {" "}
                      Name :{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Chicken Burger"
                      id="name"
                      name="name"
                      required
                      onChange={onChangeHandler}
                      value={data.name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      {" "}
                      Description :{" "}
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="add some description here..."
                      id="description"
                      name="description"
                      rows="5"
                      required
                      onChange={onChangeHandler}
                      value={data.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      {" "}
                      Category :{" "}
                    </label>
                    <select
                      name="category"
                      id="category"
                      placeholder="Burger"
                      className="form-control"
                      onChange={onChangeHandler}
                      value={data.category}
                    >
                      <option value=""></option>
                      <option value="Pizza">Pizza</option>
                      <option value="Burger">Burger</option>
                      <option value="Momos">Momos</option>
                      <option value="Biriyani">Biriyani</option>
                      <option value="Roll">Roll</option>
                      <option value="Ice-Cream">Ice Cream</option>
                      <option value="Cake">Cake</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      {" "}
                      Price :{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="50 (Tk)"
                      id="price"
                      name="price"
                      required
                      onChange={onChangeHandler}
                      value={data.price}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default AddFood;