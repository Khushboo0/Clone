import  React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link } from 'react-router-dom';



const AdminDashboard = ()=>{
    const {user:{name,email,role}}=isAuthenticated() ;

    const AdminLinks =()=>{
        return (
            <div className="card">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>

                    </li>
                    <li className="list-group-item">
                    <Link className="nav-link" to="/create/product">Create product</Link>

                    </li>
                    
                </ul>
            </div>
        );
    };



    const AdminInfor=()=>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{role}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role===1 ? "Admin":"Registered User"}</li>
                </ul>
            </div>

        )
    };


    return (
        <Layout title="Dashboard" description={`Hey there!!! I'm ${name}`} className="container">
            <div className="row">
                <div className="col-3">
                    {AdminLinks()}
                </div>
                <div className="col-9">
                    {AdminInfor()}
                    
                </div>
            </div>
            
            
        </Layout>
    )
};

export default AdminDashboard;