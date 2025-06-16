import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utlis";

const Signup = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    const copySignUpInfo = { ...signUpInfo };
    copySignUpInfo[name] = value;
    setSignUpInfo(copySignUpInfo);
  };
  // console.log(`signUpInfo ->`, signUpInfo);

  const handleSignup = async (event) => {
    event.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:3000/auth/signup";
      const respone = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await respone.json();
      // console.log(result)
      const { success, message, error } = result;
      if(success){
        handleSuccess(message)
        setTimeout(()=>{
          navigate("/login")
        },1000)
      }else if(error){
        const details = error?.details[0].message
        handleError(details)
      }else if(!success){
        handleError(message)
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>SignUp</h1>
        <form onSubmit={handleSignup}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              autoFocus
              placeholder="Enter your name"
              value={signUpInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={signUpInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={signUpInfo.password}
            />
          </div>
          <button type="submit">Sign up</button>
          <span>
            Already have an account?
            <Link to="/login">Log in</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
