import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router'
import { FaPlus, FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { addToLS, getItemsFromLS } from '../Utilities/localStorageUtility';
import { toast, ToastContainer } from 'react-toastify';
import { FiMinus } from 'react-icons/fi';

const ProductsPage = () => {
  const productData = useLoaderData();
  // console.log(productData);

  // for showing updated stock number
  const [cartProducts,setCartProducts] = useState(getItemsFromLS());
  
  // for details modal
  const [selectedProduct,setSelectedProduct] = useState(null);

  // for range price
  const [priceRange,setPriceRange] = useState({
    min: 0,
    max:1000
  });


  useEffect(() => {
    const handleCartUpdate = () => {
      setCartProducts(getItemsFromLS());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const addItems = (product) => {

    const cartQty = getProductQuantity(product.id);

    if(product.stock - cartQty <= 0){
      toast.error("This product is out of stock right now.");
      return;
    }

    const newItem = {
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      productInStock: product.stock,
      productQuantity: 1,
      addedOn: new Date().toISOString().split("T")[0]
    }

    console.log(newItem)

    const addingItem = addToLS(newItem);


    if(!addingItem){
      toast.error("You already added this item.")
    }

    else{
      toast.success("You successfully added a new item!");
      setCartProducts(getItemsFromLS());
    }

    window.dispatchEvent(new Event("cartUpdated"));
  }

  const updateItemQuantity = (productId,type) => {
    const items = getItemsFromLS();

    let updateItems = items.map((item)=>{
      if(item.productId === productId){
        if(type === "increase" && item.productQuantity < item.productInStock){
          return { ...item, productQuantity: item.productQuantity + 1 };
        }
        if(type === "decrease"){
          return { ...item, productQuantity: item.productQuantity - 1 };
        }
      }
      return item
    })

    updateItems = updateItems.filter(item => item.productQuantity > 0);

    localStorage.setItem("items",JSON.stringify(updateItems));

    return updateItems;
  }

  const updateQuantity = (productId, type) => {
    const updated = updateItemQuantity(productId, type);

    setCartProducts(updated);

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const getProductQuantity = (id) => {
    const item = cartProducts.find((item) => item.productId === id);
    return item ? item.productQuantity : 0;
  }

  const filteredProducts = productData.filter((product) => {
    return product.price >= priceRange.min && product.price <= priceRange.max;
  })

  const percentage = (priceRange.max / 1000) * 100;


 return (
    <>
      <ToastContainer position="bottom-left"></ToastContainer>
      <div className='my-15'>
        <h2 className='section_title text-center text-2xl lg:text-3xl font-bold mb-2 text-[#0A400C] relative'>Products</h2>
        <p className='text-lg lg:text-xl font-medium text-center lg:w-162.5 mx-auto mb-15 px-2 md:px-2 lg:px-0'>Lorem Ipsum has been the industry's standard dummy text, when an unknown printer took a galley of type and scrambled it</p>
        <div className="w-75">
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#0A400C]"
            style={{
            background: `linear-gradient(to right, #0A400C ${percentage}%, #e5e7eb ${percentage}%)`
          }}
          />
          <label className="block mb-2 font-semibold text-gray-700 whitespace-nowrap">
            Max Price: 
            <span className="ml-1 text-[#0A400C] font-bold">
              ${priceRange.max}
            </span>
          </label>
        </div>
        <div className='grid gap-3.75 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 md:px-10 lg:px-10 xl:px-0'>
          {
            filteredProducts.map((product) => (
              <div key={product.id} className='cursor-pointer transition-all duration-300 hover:shadow-lg group'>
                <div className='object-cover relative'>
                  <img className='rounded-2xl' src={product.image} alt="product_image" />
                  {
                    getProductQuantity(product.id) === 0 ?
                      <div className='absolute top-4 left-4'>
                        <button 
                          onClick={() => addItems(product)}
                          className='shadow-[0_15px_15px_rgba(0,0,0,0.10)] bg-[#0a400C] text-white px-4 py-1 text-sm font-medium rounded-2xl cursor-pointer'>
                          Add To Cart
                        </button>
                      </div>
                      :
                      <div className='bg-[#0a400C] flex justify-center items-center gap-2 whitespace-nowrap absolute top-4 left-4  px-4 py-1 text-sm font-medium rounded-2xl'>
                        <span>
                          <FiMinus onClick={() => updateQuantity(product.id, "decrease")} className='bg-gray-200 rounded-sm text-gray-800 cursor-pointer text-xl p-1'></FiMinus>
                        </span>
                        <span className='text-lg text-white'>{getProductQuantity(product.id)}</span>
                        <span>
                          <FaPlus onClick={() => updateQuantity(product.id, "increase")} className='bg-gray-200 rounded-sm text-gray-800 cursor-pointer text-xl p-1'></FaPlus>
                        </span>
                      </div>
                  }
                </div>
                <div className='p-3 shadow-[0_5px_5px_rgba(0,0,0,0.10)] rounded-md'>
                  <div className='flex justify-between items-center mt-2'>
                    <h3 className='my-2 text-xl font-bold text-[#0A400C]'>{product.name}</h3>
                    <h2 className='text-xl font-bold text-[#0A400C]'>{product.price}$</h2>
                  </div>

                  <div className='flex gap-1 items-center text-xl'>
                    <h4 className='text-md md:text-lg lg:text-lg font-medium text-[#0A400C]'>Average Rating:</h4>
                    {
                      [1,2,3,4,5].map((star) => (
                        <span key={star}>
                          {
                            star <= product.rating ? <FaStar className='text-green-900 text-lg md:text-xl lg:text-xl'/> : <FaRegStar className='text-lg md:text-xl lg:text-xl'/>
                          }
                        </span>
                      ))
                    }
                  </div>

                  <h3 className='mt-2 font-bold'> <span className='font-medium text-[#0A400C]'>Max Discount: </span>{product.discount}%</h3>

                  <div className="mt-4 border-t-2 border-dashed border-gray-600"></div>

                  <div className='mt-4 mb-2'>
                    <button onClick={
                      ()=>{
                        setSelectedProduct(product);
                        document.getElementById('detailsModal').showModal()
                      }}
                      className='bg-transparent text-[#0A400C] border border-[#0A400C] w-full py-2 text-md font-medium rounded-3xl cursor-pointer group-hover:bg-[#0A400C] group-hover:text-white transition-all duration-300'>
                        View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        <dialog id="detailsModal" className="modal">
          <div className="modal-box">
            {
              selectedProduct && 
              <>
                <img src={selectedProduct.detail_image} alt="detailImage" />
                <p className='font-semibold text-md md:text-lg lg:text-lg mb-5 text-[#0A400C] mt-2'>Item Description: <span className='text-black font-normal not-italic'>{selectedProduct.description}</span></p>

                <div className='grid grid-cols-1 gap-y-1'>
                  <div className='flex justify-between items-center gap-2 flex-col md:flex-row lg:flex-row'>
                    <h3 className='text-center md:text-left lg:text-left w-full lg:w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Category:  <span className='font-normal not-italic'>{selectedProduct.category}</span></h3>
                    <h3 className='text-center md:text-left lg:text-left w-full lg:w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Brand:  <span className='font-normal not-italic'>{selectedProduct.brand}</span></h3>
                  </div>

                  <div className='flex justify-between items-center gap-2 flex-col md:flex-row lg:flex-row2'>
                    <h3 className='text-center md:text-left lg:text-left w-full lg:w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Total Buys: <span className='font-normal not-italic'>{selectedProduct.totalBuys}</span></h3>
                    <h3 className='text-center md:text-left lg:text-left w-full lg:w-75 font-semibold italic bg-[#0A400C] text-yellow-100 p-3 rounded-lg'>Total Reviews: <span className='font-normal not-italic'>{selectedProduct.reviews}</span></h3>
                  </div>
                </div>  

                <h3 className='mt-5 font-semibold text-md md:text-lg lg:text-lg text-[#0A400C]'>Max Discount: <span className='text-black font-normal not-italic'>{selectedProduct.discount}%</span></h3>

                <h3 className='font-semibold text-md md:text-lg lg:text-lg text-[#0A400C]'>Vendor: <span className='text-black font-normal not-italic'>{selectedProduct.vendor_company}</span></h3>

                <h3 className='font-semibold text-md md:text-lg lg:text-lg mb-5 text-[#0A400C]'>In stock: <span className='text-black font-normal not-italic'>{selectedProduct.stock - getProductQuantity(selectedProduct.id)}</span></h3>

                <form method="dialog" className='flex gap-3'>
                  {
                    getProductQuantity(selectedProduct.id) === 0 ?
                      <div className='w-[50%]'>
                        <button 
                          onClick={() => addItems(selectedProduct)}
                          className='bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer w-full'>
                          Add To Cart
                        </button>
                      </div>
                      :
                      <div className='bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer flex justify-center items-center gap-2 whitespace-nowrap px-4 py-1 text-sm font-medium  w-[50%]'>
                        <span>
                          <FiMinus onClick={() => updateQuantity(selectedProduct.id, "decrease")} className='rounded-sm text-gray-800 cursor-pointer text-3xl p-1'></FiMinus>
                        </span>
                        <span className='text-3xl text-[#0A400C]'>{getProductQuantity(selectedProduct.id)}</span>
                        <span>
                          <FaPlus onClick={() => updateQuantity(selectedProduct.id, "increase")} className='rounded-sm text-gray-800 cursor-pointer text-3xl p-1'></FaPlus>
                        </span>
                      </div>
                  }
                  <button className="w-[50%] bg-transparent text-gray-800 border-2 border-[#0A400C] rounded-lg p-2 cursor-pointer">Close</button>
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
