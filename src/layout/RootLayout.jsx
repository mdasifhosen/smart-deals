import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/NavBar/Navbar';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto mt-5'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;