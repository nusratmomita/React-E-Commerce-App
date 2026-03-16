import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { addToLS } from '../Utilities/localStorageUtility';
import { toast, ToastContainer } from 'react-toastify';

const ProductsPage = () => {
  const productData = useLoaderData();
  // console.log(productData);

  // for details modal
  const [selectedProduct,setSelectedProduct] = useState(null);

  const addItems = (product) => {

    const newItem = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productQuantity: 1,
      addedOn: new Date().toISOString().split("T")[0]
    }

    const addingItem = addToLS(newItem);
    window.dispatchEvent(new Event("cartUpdated"));

    if(!addingItem){
      toast.error("You already added this item.")
    }

    else{
      toast.success("You successfully added a new item!");
    }
  }

 return (
    <>
      <ToastContainer position="bottom-left"></ToastContainer>
      <div className='my-15'>
        <h2 className='section_title text-center text-3xl font-bold mb-2 text-[#0A400C] relative'>Products</h2>
        <p className='text-xl font-medium text-center w-162.5 mx-auto mb-15'>Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it</p>
        <div className='grid gap-3.75 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {productData.map((product) => (
            <div key={product.id} className='p-3 rounded-sm border border-gray-600 cursor-pointer group hoverr:bg-[#0a400C]/75 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl'>
              <div className='object-cover transition-transform duration-300 group-hover:scale-104 relative'>
                <img className='rounded-sm' src={product.image} alt="product_image" />
                <div className='absolute top-2 left-2 hidden group-hover:block'>
                  <button 
                    onClick={() => addItems(product)}
                    className='shadow-[0_15px_15px_rgba(0,0,0,0.10)] bg-[#0a400C]/75 text-white p-1 text-md font-semibold rounded-md cursor-pointer'>
                    Add To Cart
                  </button>
                </div>
              </div>
              <div>
                <div className='flex justify-between items-center mt-2'>
                  <h3 className='my-2 text-xl font-bold text-[#0A400C] group-hoverr:text-white'>{product.name}</h3>
                  <h2 className='text-xl font-bold text-[#0A400C] group-hoverr:text-white'>{product.price}$</h2>
                </div>

                <div className='flex gap-1 items-center text-xl'>
                  <h4 className='text-lg font-medium text-gray-600 group-hoverr:text-white'>Average Rating:</h4>
                  {[1,2,3,4,5].map((star) => (
                    <span key={star}>
                      {
                        star <= product.rating ? <FaStar className='text-green-900 group-hoverr:text-white'/> : <FaRegStar className='group-hoverr:text-white'/>
                      }
                    </span>
                  ))}
                </div>

                <h3 className='mt-2 font-bold group-hoverr:text-white'> <span className='italic font-medium'>Max Discount: </span>{product.discount}%</h3>
                <div className="mt-4 border-t-2 border-dashed border-gray-600 group-hoverr:border-white"></div>

                <div className='mt-4 mb-2'>
                  <button onClick={
                    ()=>{
                      setSelectedProduct(product);
                      document.getElementById('detailsModal').showModal()
                    }}
                    className='bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer group-hover:bg-[#0A400C] group-hover:text-white transition-all duration-300'>
                      View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <dialog id="detailsModal" className="modal">
          <div className="modal-box">
            {
              selectedProduct && 
              <>
                <img src={selectedProduct.detail_image} alt="detailImage" />
                <p className='font-semibold text-lg mb-3 text-[#0A400C] mt-2'>Item Description: <span className='text-black font-normal not-italic'>{selectedProduct.description}</span></p>

                <div className='grid grid-cols-1 gap-y-1'>
                  <div className='flex justify-between items-center gap-2'>
                    <h3 className='w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Category:  <span className='font-normal not-italic'>{selectedProduct.category}</span></h3>
                    <h3 className='w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Brand:  <span className='font-normal not-italic'>{selectedProduct.brand}</span></h3>
                  </div>

                  <div className='flex justify-around items-center gap-2'>
                    <h3 className='w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Total Buys: <span className='font-normal not-italic'>{selectedProduct.totalBuys}</span></h3>
                    <h3 className='w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Total Reviews: <span className='font-normal not-italic'>{selectedProduct.reviews}</span></h3>
                  </div>
                </div>  

                <h3 className='mt-5 font-semibold text-lg text-[#0A400C]'>Max Discount: <span className='text-black font-normal not-italic'>{selectedProduct.discount}%</span></h3>

                <h3 className='font-semibold text-lg text-[#0A400C]'>Vendor: <span className='text-black font-normal not-italic'>{selectedProduct.vendor_company}</span></h3>

                <h3 className='font-semibold text-lg mb-5 text-[#0A400C]'>In stock: <span className='text-black font-normal not-italic'>{selectedProduct.stock}</span></h3>

                <form method="dialog" className='flex gap-3'>
                  <button 
                    onClick={() => addItems(selectedProduct)}
                    className='bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer group-hover:bg-[#0A400C] group-hover:text-white transition-all duration-300 w-[50%]'>
                    Add To Cart
                  </button>
                  <button className="bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer group-hover:bg-[#0A400C] group-hover:text-white transition-all duration-300 w-[50%]">Close</button>
                </form>
              </>
            }
          </div>
        </dialog>
      </div>
    </>
  );
}

export default ProductsPage
