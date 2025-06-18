import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { handleError, handleSuccess } from "../utlis";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProductes = async () => {
    try {
      const url = "https://auth-on-mern.vercel.app/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const respone = await fetch(url, headers);
      const result = await respone.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    fetchProductes();
  }, []);

  return (
    <>
      <div>
        <h1>Welcome, {loggedInUser}</h1>
        <button onClick={handleLogout}>Logout</button>

        <div>
          {products.length > 0 ? (
            products.map((item, index) => (
              <ul key={index}>
                <li>
                  {item.name}: {item.price}
                </li>
              </ul>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
