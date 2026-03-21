import React, { useEffect, useState } from 'react'
import siteLogo from '../assets/e-commerceIcon.png';
import { PiShoppingCartBold } from "react-icons/pi";
import { getItemsFromLS } from '../Utilities/localStorageUtility';
import { NavLink } from 'react-router';

const Navbar = () => {

  const [allItems , setAllItems] = useState([]);
  
  useEffect(()=>{
    const updateCart = () => {
      const items = getItemsFromLS();
      setAllItems(items);
  };

  updateCart();

  window.addEventListener("cartUpdated", updateCart);

  return () => {
    window.removeEventListener("cartUpdated", updateCart);
  };
  },[])

  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 z-1 mt-3 w-52 p-2 shadow">
            <li className='font-bold'> <NavLink className="text-lg hover:bg-white" to='/'>All Products</NavLink></li>
          </ul>
        </div>
        <div className='flex justify-center items-center cursor-pointer'>
          <img className='w-12 h-12 -mr-1 hidden lg:block' src={siteLogo} alt="siteLogo" />
          <a className="text-xl font-bold italic text-[#0A400C]">Shopify</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">
          <li className='text-xl font-bold'> <NavLink className="hover:bg-white" to='/'>All Products</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink to='/myCart' className='relative cursor-pointer'>
          <PiShoppingCartBold className='text-xl lg:text-3xl mr-4'></PiShoppingCartBold>
          {allItems.length > 0 && (
            <h4 className="absolute -top-3 right-1.5 text-md lg:text-xl font-semibold">
              {allItems.length}
            </h4>
          )}
        </NavLink>
        <a className="btn ml-2  bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-4 cursor-pointer hover:bg-[#0A400C] hover:text-white transition-all duration-300">Logout</a>
      </div>
    </div>
  )
}

export default Navbar;