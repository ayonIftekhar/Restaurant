import { useEffect, useState } from "react";
import { getAllFoods, getCart, updateCart } from "../FoodService/FoodService";
import React from 'react'
import { toast } from "react-toastify";

export const FoodsContext = React.createContext(null);

function Context(props){

    const [foods , setFoods] = useState([])
    const [counts , setCounts ] = useState({})

    async function increment(id) {
        const newCounts = {
            ...counts,
            [id]: (counts[id] || 0) + 1,
        };
        setCounts(newCounts);
        await updateCart(newCounts);
    }


    async function decrement(id) {
        const newCounts = {
            ...counts,
            [id]: counts[id] > 0 ? counts[id] - 1 : 0,
        };
        setCounts(newCounts);
        await updateCart(newCounts);
    }

    async function resetCount(id, num) {
        const newCounts = {
            ...counts,
            [id]: num,
        };
        setCounts(newCounts);
        await updateCart(newCounts);
    }


    async function retrieveFoods(){
        try{
            const response = await getAllFoods();
            if( response.status === 200){
                setFoods(response.data)
            }else{
                toast.error("Error Loading Foods!")
            }
        }catch(error){
            toast.error('Error Performing operation, Error Code :' + response.status)
        }
    }

    async function retrieveCart() {
        try {
          const response = await getCart();
          if (response.status === 200) {
              setCounts(response.data);
          } else {
            toast.error("Error Loading Cart!");
          }
        } catch (error) {
          toast.error("Error Loading Cart!");
        }
    }

    useEffect( ()=> {
        retrieveFoods();
        if(!!sessionStorage.getItem("jwt")) retrieveCart();
    }, [] )

    return (
      <FoodsContext.Provider
        value={{ foods, counts, increment, decrement, resetCount, setCounts }}
      >
        {props.children}
      </FoodsContext.Provider>
    );
}

export default Context;