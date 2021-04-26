import React,{Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth'


// somewhere using fragment instead of div for thr align ment you switch between them to see the difference

const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return { color: '#ff9900'};
    }
    else{
        return {color:'#ffffff'};
    }
};



const Menu = ({history})=>(
    <div>
        <ul className="nav nav-tabs bg-success">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/')} to="/">
                    Home
                </Link>
            </li>
            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">
                    Signup
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link"style={isActive(history,'/signin')} to="/signin">
                    Signin
                </Link>
            </li>

                </Fragment>



            )}

            {isAuthenticated() &&(
                <Fragment>
                    <li className="nav-item">
                <Link className="nav-link"style={{cursor:'pointer',color:'#ffffff'}} onClick={()=>signout(()=>{
                    history.push('/');
                })}>
                    signout
                </Link>
            </li>

                </Fragment>
            )}
            
            
        </ul>
    
    </div>
);

export default withRouter(Menu);