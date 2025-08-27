// import { Button, Form, Input } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
// import "./Login.css";
// // import google from "./assets/google-icon.svg";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//     const [form] = Form.useForm();
//     const [login, setLogin] = useState(true)

//     const handleSubmit = () => {
//         navigate('/dashboard/reports')

//     }
//     return (
//         <div className="flex justify-center items-center py-[14vh]">
//             <div className=" max-w-[90%] bg-white my-shadow p-4">
//                 <div className="login-form-container w-full sm:w-[85%]">
//                     <div className="welcome-message">{login ? 'log in' : 'Register'}</div>
//                     {/* <div className="signin-message">
//                     Please sign-in to your account and start the adventure
//                     </div> */}
//                     {/* <div className="input-container"> */}
//                     <Form form={form}>
//                     <Input placeholder="Email" className="inputBox" />
//                     <Input.Password
//                         className="inputBox"
//                         placeholder="Password"
//                         iconRender={(visible) =>
//                         visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                         }
//                     />
//                     <div className="">

//                     {
//                      !login &&
//                     <Input.Password
//                         className="inputBox"
//                         placeholder="Re-Enter Password"
//                         iconRender={(visible) =>
//                         visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                         }
//                     />
//                     }
//                     </div>
//                     {/* </div> */}

//                     <div className="options-row">
//                         {/* <Checkbox>Remember Me</Checkbox> */}
//                         {login && <a href="#" className="forgot-password">
//                         Forgot Password?
//                         </a>}
//                     </div>
//                     <Button className="sign-in-button" onClick={handleSubmit}>{login ? "Sign In" : "Sign up"}</Button>
//                     </Form>
//                     <div className="or-main py-4 flex items-center justify-between">
//                         <hr className="w-[45%] border-[#d9d9d9]" />
//                         <span className="text-[#3b4056] font-medium">or</span>
//                         <hr className="w-[45%] border-[#d9d9d9]" />
//                     </div>
//                     <button className="py-2 flex items-center justify-center cursor-pointer" style={{border: '1px solid #d9d9d9', borderRadius: "24px", marginBottom: "20px"}}>
//                         {/* <img src={google} alt="" srcset="" /> */}
//                         <span className="text-[#3b4056] font-medium ml-2">{login ? "Sign in with Google" : "Sign up with Google"}</span>
//                     </button>
//                     <div className="text-center mb-[20px]">

//                         <span className="text-[#3b4056] font-medium">{login ? "Don't have an account? " : "Already have an account? " }</span>
//                         <a href="#" className="forgot-password font-medium" onClick={() => setLogin(!login)}>
//                         {login ? "Sign Up" : "sign in"}
//                         </a>
//                     {/* <span className="text-[#3b4056] font-medium">Already have an account? </span>
//                         <a href="#" className="forgot-password">
//                         Login
//                         </a> */}
//                     </div>
//                     {
//                         !login && <p className="text-[12px] font-medium text-gray-500 mt-[10px]">By continuing you agree with our <a href="#" className="underline text-gray-700">Terms of Service</a> and <br /> confirm that you have read our <a href="#" className="underline text-gray-700">Privacy Policy</a></p>
//                     }

//                 </div>

//             </div>
//         </div>
//      );
// }

// export default Login;

import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import google from "./assets/google-icon.svg";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure this is correctly linked
import { useDispatch, useSelector } from "react-redux";
import { loginCheck } from "../../store/slice/loginSlice";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [login, setLogin] = useState(true);
  const [editData, setEditData] = useState({
    userName: "",
    password: "",
  });

  const loginSelector = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  const handleSubmit = () => {
    // navigate("/dashboard/reports");
    const payload = {
      userName: editData.userName,
      password: editData.password,
    };
    dispatch(loginCheck(payload));
  };

  useEffect(() => {
  if (loginSelector.user?.success) {
    navigate("/dashboard/reports");
  }
}, [loginSelector.user, navigate]);
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-form-container">
          <div className="welcome-message">{login ? "Log in" : "Register"}</div>

          <Form form={form}>
            <Input
              placeholder="Email"
              className="inputBox"
              id="userName"
              onChange={handleChange}
            />
            <Input.Password
              onChange={handleChange}
              className="inputBox"
              id="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />

            {!login && (
              <Input.Password
                className="inputBox"
                onChange={handleChange}
                placeholder="Re-Enter Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            )}

            {/* <div className="options-row">
              {login && (
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              )}
            </div> */}

            <Button className="sign-in-button" onClick={handleSubmit}>
              {login ? "Sign In" : "Sign Up"}
            </Button>
          </Form>

          {/* <div className="or-section">
            <hr className="or-line" />
            <span className="or-text">or</span>
            <hr className="or-line" />
          </div>

          <button className="google-button">
            <img src={google} alt="google" />
            <span className="google-button-text">
              {login ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </button> */}

          {/* <div className="account-switch">
            <span>
              {login ? "Don't have an account?" : "Already have an account?"}
            </span>
            <a
              href="#"
              className="switch-link"
              onClick={() => setLogin(!login)}
            >
              {login ? "Sign Up" : "Sign In"}
            </a>
          </div> */}

          {/* {!login && (
            <p className="terms-text">
              By continuing you agree with our{" "}
              <a href="#" className="underline-link">
                Terms of Service
              </a>{" "}
              and confirm that you have read our{" "}
              <a href="#" className="underline-link">
                Privacy Policy
              </a>
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
