import React, { useRef, useState, useEffect } from "react";
import style from "./Login.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import cookie from "universal-cookie";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const server = "http://localhost:5550";


function Login() {
  const Cookies = new cookie();
  const history = useHistory();
  useEffect(() => {
    const Admin_token = Cookies.get("Admin_token");
    if (Admin_token) {
      history.push("/admin");
    }else {
      history.push("/admin/login")
    }
  },[]);
  const emailref = useRef();
  const passwordref = useRef();

  const [LoginError, setLoginError] = useState(false)

  const FormSubmit = () => {
    const data = {};
    data.email = emailref.current.value;
    data.password = passwordref.current.value;
    axios.post(`${server}/admin/login`, data).then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      if(!data.data.status){
        setLoginError(true)
      }else {
      Cookies.set("Admin_token", data.token);
      console.log(data.data.user.objectId);
      history.push("/admin");
      }
    });
  };
  let validate = Yup.object({
    email: Yup.string()
      .email("Please type a valid email")
      .required("Enter your email"),
    password: Yup.string()
      .min(6, "Must be more than 6 Characters")
      .required("Enter your password"),
  });
  let Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit:FormSubmit
  });

  return (
    <div>
      <div className={`${style.container123} container`}>
        <div className={`${style.contentCenter} row`}>
          <div className="col-md-7 col-lg-5">
            <div className={style.lgform}>
              <div className={style.mainheading}>
                <h2>Welcome Admin</h2>
                <div className={style.lineshape1}>
                  <img src="/images/line.svg" alt="" />
                </div>
              </div>
              <form onSubmit={Formik.handleSubmit}>
                <div className={style.formgroup}>
                  <input
                    ref={emailref}
                    label="Email Address*"
                    type="email"
                    className={style.jobinput}
                    name="email"
                    placeholder="Enter Email Address"
                    onChange={Formik.handleChange}
                  />
                  {Formik.errors? <p style={{color:"red"}}>{Formik.errors.email}</p>:null}
                </div>
                <div className={style.formgroup}>
                  <input
                    ref={passwordref}
                    label="Password*"
                    type="password"
                    className={style.jobinput}
                    name="password"
                    placeholder="Enter Password"
                    onChange={Formik.handleChange}
                  />
                  
                  {Formik.errors? <p style={{color:"red"}}>{Formik.errors.password}</p>:null}
                  {LoginError? 
                  <p style={{color:"red"}}>Email or password does not Match</p>:null}
                </div>
                <button className={style.lrbtn} type="submit">
                  Sign in Now
                </button>
              </form  >
              <div className={style.done145}>
                <div className={style.done146}>
                  Need an account?
                  <a href="/merchant/signup">
                    Join us Now<i className="fas fa-angle-double-right"></i>
                  </a>
                </div>
                <div className={style.done147}>
                  <a href="forgot_password.html">Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
