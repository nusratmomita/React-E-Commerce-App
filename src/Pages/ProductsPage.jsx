import React from 'react'
import { useLoaderData } from 'react-router'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const ProductsPage = () => {
  const productData = useLoaderData();
  // console.log(productData);

 return (
    <div className='my-15'>
      <h2 className='section_title text-center text-3xl font-bold mb-2 text-[#0A400C] relative'>Products</h2>
      <p className='text-xl font-medium text-center w-162.5 mx-auto mb-15'>Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it</p>
      <div className='grid gap-3.75 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
        {productData.map((product) => (
          <div key={product.id} className='p-3 rounded-xl border border-gray-600 cursor-pointer group hover:bg-[#0a400C]/75 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl'>
            <div className='object-cover transition-transform duration-300 group-hover:scale-104'>
              <img className='rounded-2xl' src={product.image} alt="product_image" />
            </div>
            <div>
              <div className='flex justify-between items-center mt-2'>
                <h3 className='my-2 text-xl font-bold text-[#0A400C] group-hover:text-white'>{product.name}</h3>
                <h2 className='text-xl font-bold text-[#0A400C] group-hover:text-white'>{product.price}$</h2>
              </div>

              <div className='flex gap-1 items-center text-xl'>
                <h4 className='text-lg font-medium text-gray-600 group-hover:text-white'>Average Rating:</h4>
                {[1,2,3,4,5].map((star) => (
                  <span key={star}>
                    {
                      star <= product.rating ? <FaStar className='text-green-900 group-hover:text-white'/> : <FaRegStar className='group-hover:text-white'/>
                    }
                  </span>
                ))}
              </div>

              <h3 className='mt-2 font-bold  group-hover:text-white'> <span className='italic font-medium'>Max Discount: </span>{product.discount}%</h3>
              <div className="mt-4 border-t-2 border-dashed border-gray-600 group-hover:border-white"></div>

              <div className='mt-4 mb-2'>
                <button onClick={()=>document.getElementById('detailsModal').showModal()} className='bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer  group-hover:bg-[#0A400C] group-hover:text-white transition-all duration-300'>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <dialog id="detailsModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ProductsPage
