import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar';
// import Footer from '../Components/Footer';

const Root = () => {
    
    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-screen max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </main>
            {/* <Footer></Footer> */}
        </div>
    );
};

export default Root;