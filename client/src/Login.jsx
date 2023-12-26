import React, { useState, useEffect } from "react";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  const [msg, setMst] = useState("Not send");
  const [homedata, sethomedata] = useState()
  const [status, setstatus] = useState(null)

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setMst("req sent");
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMst("waiting for response....");
      if (response.status === 200) {
        setMst("Login Success");
        setstatus(true)
      } else {
        setMst("Login Failed");
      }
    } catch (e) {
      setMst("Error Occured");
      console.log("error", e);
    }
  };

  const handleLogout = () =>{
    setFormData({
      email : "",
      password :""
    });
    setMst("Please Login")
  }

  useEffect(()=>{
    if(status === true){
    try {
      const response = fetch("http://localhost:4000", {
        method: "GET"
      });
      if (response.status === 200) {
        sethomedata('data recieved')
      } else {
        sethomedata('data recieving failed')
      }
    } catch (e) {
      sethomedata('error')
      console.log("error", e);
    }}
  },[status])
  return (
    <>
      <h1>Login Form</h1>
      <input name="email" placeholder="Email" onChange={handleInput}></input>
      <input
        name="password"
        placeholder="Password"
        onChange={handleInput}
      ></input>
      <button onClick={handleLogin}>Login</button>
      <h6>entered email : {formdata.email}</h6>
      <h6>entered passworrd : {formdata.password}</h6>
      <h6>Response Msg : {msg}</h6>
      <button onClick={handleLogout}>logout</button>

      <h6>HomeData: {homedata}</h6>

    </>
  );
};

export default Login;
