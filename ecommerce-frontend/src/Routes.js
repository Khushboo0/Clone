import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
// import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
// import AdminRoute from './auth/AdminRoutes';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';


require('dotenv').config();



const Routes = ()=>{
    return(<BrowserRouter>
    
        <Switch>
            <Route path = "/signin" exact component={Signin} />
            <Route path = "/signup" exact component={Signup} />
            <Route path = "/" exact component={Home} />
            <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/admin/dashboard" exact component={AdminDashboard} />

        </Switch>
    </BrowserRouter>);
};




export default Routes;