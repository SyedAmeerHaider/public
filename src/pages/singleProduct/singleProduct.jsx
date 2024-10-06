import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cartCount, serCartCount] = useState(0);
  const navigate = useNavigate();

  const fetchProductDetail = () => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((resolve) => resolve.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  };

  const handleAddToCart = () => {
    const prevItems = JSON.parse(localStorage.getItem("cart"));
    console.log(prevItems);

    localStorage.setItem("cart", JSON.stringify([...prevItems, product]));
    toast.success("Product added to cart");
    getCartCount();
  };

  const getCartCount = () => {
    const totalCount = JSON.parse(localStorage.getItem("cart"));
    console.log(totalCount.length);
    serCartCount(totalCount.length);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    getCartCount();
    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="font-sans">
        <ToastContainer />
        <h1 className="mt-20 text-3xl ms-20 mb-20">
          No of item in cart:{cartCount}
        </h1>
        <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
            <div className="w-full lg:sticky top-0 sm:flex gap-2">
              <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                <img
                  src={product.image}
                  alt="Product1"
                  className="w-full cursor-pointer rounded-md outline"
                />
                <img
                  src={product.image}
                  alt="Product2"
                  className="w-full cursor-pointer rounded-md"
                />
                <img
                  src={product.image}
                  alt="Product3"
                  className="w-full cursor-pointer rounded-md"
                />
                <img
                  src={product.image}
                  alt="Product4"
                  className="w-full cursor-pointer rounded-md"
                />
              </div>
              <img
                src={product.image}
                alt="Product"
                className="w-4/5 rounded-md object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.title}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-gray-800 text-xl font-bold">${product.price}</p>
                <p className="text-gray-400 text-xl">
                  <strike>${product.price * 1.2}</strike>{" "}
                  <span className="text-sm ml-1.5">Tax included</span>
                </p>
              </div>

              <div className="flex space-x-2 mt-4">
                {[...Array(Math.floor(product.rating.rate))].map((_, index) => (
                  <svg
                    key={index}
                    className="w-5 fill-blue-600"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    type="button"
                    className="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0"
                  >
                    SM
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border-2 hover:border-blue-600 border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0"
                  >
                    MD
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0"
                  >
                    LG
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0"
                  >
                    XL
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                type="button"
                className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
              >
                Add to cart
              </button>
              <button
                onClick={handleViewCart}
                type="button"
                className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
              >
                View Cart
              </button>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">About the item</h3>
                <ul className="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                  <li>{product.description}</li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800">Reviews</h3>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">
                      {product.rating.rate}
                    </p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-2/3 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">4.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/3 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">3.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/6 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">2.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-1/12 h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                  </div>

                  <div className="flex items-center">
                    <p className="text-sm text-gray-800 font-bold">1.0</p>
                    <svg
                      className="w-5 fill-blue-600 ml-1.5"
                      viewBox="0 0 14 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    <div className="bg-gray-300 rounded-md w-full h-2 ml-3">
                      <div className="w-[6%] h-full rounded-md bg-blue-600"></div>
                    </div>
                    <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md"
                >
                  Read all reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
