import React from 'react'
import siteLogo from '../assets/e-commerceIcon.png';
import { PiShoppingCartBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>All Products</li>
          </ul>
        </div>
        <div className='flex justify-center items-center'>
          <img className='w-12 h-12 -mr-1' src={siteLogo} alt="siteLogo" />
          <a className="text-xl font-bold italic text-[#0A400C]">Shopify</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className='text-xl font-bold'>All Products</li>
        </ul>
      </div>
      <div className="navbar-end">
        <PiShoppingCartBold className='text-xl mr-4'></PiShoppingCartBold>
        <a className="btn">Logout</a>
      </div>
    </div>
  )
}

export default Navbar;