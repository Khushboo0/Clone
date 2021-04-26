import React,{useState} from 'react';
import {Link} from "react-router-dom";
import {signup} from "../auth"
import Layout from "../core/Layout";

const Signup = () => {
    const [value,setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        success:false
    });

    const {name,email,password,error,success}=value
    // higher order function (fucn returning func) name is just like self uch bhi naam rakh sakte

    const handleChange = name => event =>{
        setValues({...value,error:false,[name]:event.target.value });


    };


;

    const clickSubmit=(event)=>{
        event.preventDefault();
        signup({name,email,password}).then(data=>{
            if(data.error){
                setValues({...value,error: data.error,success:false});
            }
            else{
                setValues({
                    ...value,
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    success:true
                })
            }
        })

    };


    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="text" className="form-control" value={email}/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );


    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error?'':'none'}}>
            {error}
        </div>

    );
    const showSuccess = ()=>(
        <div className="alert alert-info" style={{display:success?'':'none'}}>
            New user is created. Please signin
        </div>

    );

    return (
        (
            <Layout title="Signup Page" description="Node Ecom Signup" className="container col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {signUpForm()}
                
            </Layout>
        )
    )
};


export default Signup;


