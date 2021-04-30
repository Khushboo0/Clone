//all method that will call backend method
import { API } from '../config';


export const createCategory =(userId,token,category)=>{
    // console.log(name,email,password);
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: JSON.stringify(category)
    })
    .then(Response=>{
        return Response.json();
    })
    .catch(err=>{
        console.log(err);
        return err;

    })
};



export const createProduct =(userId,token,product)=>{
    // console.log(name,email,password);
    return fetch(`${API}/product/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`

        },
        body: product
    })
    .then(Response=>{
        return Response.json();
    })
    .catch(err=>{
        console.log(err);
        return err;

    })
}




export const getCategories =()=>{
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
}