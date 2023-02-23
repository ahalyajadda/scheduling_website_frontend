import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from '../Store';
import { getError } from '../utils';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmpassword] = useState('');
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  //creating an account
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password not match');
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/register`,
        {
          username,
          password,
        }
      );
      toast.success('Registered succesfully');
      dispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/home');
      // console.log(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-slate-200 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 sm:px-8 px-5 md:px-16">
            <h2 className="font-bold text-2xl">
              Welcome to Alapan Software Solutions Private Limited.
            </h2>
            <h2 className="font-bold text-2xl mb-4">Register</h2>
            <form onSubmit={submitHandler} className="flex flex-col gap-3">
              <span>Username</span>
              <input
                type="text"
                required
                placeholder="Enter your username"
                className="p-2  rounded-xl border outline-none"
                onChange={(e) => setUsername(e.target.value)}
              />
              <span>Password</span>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="p-2 rounded-xl border outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Confirm-Password</span>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="p-2 rounded-xl border outline-none"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />

              <button className="rounded-xl cursor-pointer hover:scale-105 duration text-white py-2 bg-[#217ee9] ">
                Register
              </button>
              <p className="text-center"> Already have an account..? </p>

              <a className="text-center text-[#217ee9] cursor-pointer" href="/">
                Login
              </a>
            </form>
          </div>
          <div className="md:block hidden w-1/2 ">
            <img
              className="rounded-2xl"
              src="https://www.cdc.gov/pregnancy/zika/materials/images/sm-graphics-sharing-icon.jpg?_=97386"
              alt=""
            />
          </div>
        </div>
      </section>
      {/* <div className="Signin">
        <div className="left">
          <img
            src="https://www.cdc.gov/pregnancy/zika/materials/images/sm-graphics-sharing-icon.jpg?_=97386"
            alt=""
            className="image"
          />
        </div>
        <div className="SigninForm">
          <div className="content">
            <h2>Welcome to Apalana technologies.</h2>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
              <div className="FormUsername data">
                <span className="FormLabel">Username</span>
                <input
                  type="text"
                  className="FormInput"
                  required
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="FormPassword data">
                <span className="FormLabel">Password</span>
                <input
                  type="password"
                  className="FormInput"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="FormPassword data">
                <span className="FormLabel" style={{ marginTop: '10px' }}>
                  Confirm Password
                </span>
                <input
                  type="password"
                  className="FormInput"
                  required
                  placeholder="Re-Enter your password"
                  onChange={(e) => setConfirmpassword(e.target.value)}
                />
              </div>
              <div className="FormBtns">
                <button className="Btns">Create an Account</button>
                <p>
                  Already have an account..? <a href="/">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Register;
