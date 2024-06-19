import React from "react";

const Data = () => {
  useEffect(() => {
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

  return (
    <></>
  )
};

export default Data;
