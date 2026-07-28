import React, { use } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const { user, loading } = use(AuthContext)
    const location=useLocation()
    
        if (loading) {
            return <span className="loading loading-bars loading-xl"></span>
    }
    
    if (!user) {
         return <Navigate to="/login" state={location} replace></Navigate>; 
    }
    return children

   
    
};

export default PrivateRoute;