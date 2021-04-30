import React,{useState} from 'react';
import {Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../auth"
import Layout from "../core/Layout";

const Signin = () => {
    const [value,setValues] = useState({
        email:'',
        password:'',
        error:'',
        loading:false,
        redirectToReferrer:false,
    });

    const {email,password,error,loading,redirectToReferrer}=value

    const {user}= isAuthenticated()
    // higher order function (fucn returning func) name is just like self uch bhi naam rakh sakte

    const handleChange = name => event =>{
        setValues({...value,error:false,[name]:event.target.value });


    };


;

    const clickSubmit=(event)=>{
        event.preventDefault();
        setValues({...value,error: false,loading:true});
        signin({email,password}).then(data=>{
            if(data.err){
                setValues({...value,error: data.err,loading:false});
            }
            else{
                authenticate(data,()=>{
                    setValues({
                        ...value,
                        redirectToReferrer:true
    
                    });

                });
                
            }
        })

    };


    const signUpForm=()=>(
        <form>
            
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
    const showLoading = ()=>(
        loading && (<div className="alert alert-info">
            <h2>
                Loading...
            </h2>
        </div>)

    );

    const redirectUser=()=>{
        if(redirectToReferrer){
            if(user && user.role===1){
                return <Redirect to="/admin/dashboard"/>
            }else{
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()){
            return <Redirect to="/" />
        }
    };
    return (
        (
            <Layout title="Signin Page" description="Node Ecom Signin" className="container col-md-8 offset-md-2">
                {showLoading()}
                {showError()}
                {signUpForm()}
                {redirectUser()}

                
            </Layout>
        )
    )
};


export default Signin;


