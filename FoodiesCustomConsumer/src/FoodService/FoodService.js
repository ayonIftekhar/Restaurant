import axios from "axios"

const URL = 'http://localhost:8869/api'

export async function getAllFoods(){
    const response = await axios.get(URL + '/foods');
    return response;
}

export async function getFoodById(id){
    const response = await axios.get(URL + '/foods/' + id)
    return response;
}

export async function register(userData) {
    const response = await axios.post(URL + '/register', userData, {
        headers: {
            'Content-Type':'application/json',
        },
    })
    return response;
}

export async function login(userData) {
    const response = await axios.post(URL + '/login', userData, {
        headers: {
            'Content-Type':'application/json',
        },
    })
    return response;
}

export async function updateCart(newCart) {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.put(URL + '/cart', newCart, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response;
}

export async function getCart() {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(URL + '/cart', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export async function getOrders(){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.get(URL + '/orders', {
        headers: {
            Authorization : `Bearer ${token}`
        },
    })
    return response;
}

export async function getPaymentURL(creds) {
    const token = sessionStorage.getItem("jwt");
    const response = await axios.post(URL + '/payment/init', creds, {
        headers: {
            Authorization : `Bearer ${token}`
        },
    })
    return response;
}

export async function sendMessage(data){
    const token = sessionStorage.getItem("jwt");
    const response = await axios.post(URL + '/contact', data , {
        headers :{
            Authorization : `Bearer ${token}`,
        },
    })
    return response;
}