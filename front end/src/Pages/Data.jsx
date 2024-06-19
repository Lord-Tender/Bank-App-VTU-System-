import React, { useEffect, useState } from "react";
import Siderbar from "../Components/Siderbar";
import Rightbar from "../Components/Rightbar";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Data = () => {
  let navigate = useNavigate();
  const [user, setuser] = useState("")
  const [dataPlan, setdataPlan] = useState("")

  useEffect(() => {
    getNetworks()
    let token = localStorage.getItem("token");
    let url = "http://localhost:5000/user/page_auth";

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setuser(res.data.userResult);
        if (res.data.emailVerified == false) {
          navigate("/user/not-verify");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.error.name == "TokenExpiredError") {
          toast.error("Session expired!!!");
          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/user/login");
          }, 3000);
        } else if (err) {
          navigate("/user/login");
        }
      });
  }, []);

  const getNetworks = () => {
    let url = 'http://localhost:5000/user/get_plans'
    axios.get(url)
      .then((res) => {
        setdataPlan(res.data.plans)
      })
      .catch((err) => {
      })
  }

  return (
    <>
      <section className="mainSection flex relative w-full ">

        <Siderbar />

        <div className='w-full lg:w-[60%] md:w-[60%] bg-gray-100 static lg:absolute px-7 sm:px-3 md:fixed left-[20%] ' style={{ fontFamily: '"Josefin Sans", sans-serif' }}>

        </div>

        <Rightbar />
      </section>
    </>
  )
};

export default Data;
