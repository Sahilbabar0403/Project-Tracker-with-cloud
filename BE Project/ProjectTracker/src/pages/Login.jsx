import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Textbox from '../components/Textbox';
import Button from '../components/Button';
import { useSelector } from 'react-redux';
import { useLoginMutation } from '../redux/slices/api/authApiSlice';
import { Toaster, toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice"; // Import action
import Loader from '../components/Loader';


// import { Button } from '@headlessui/react';

const Login = () => {
    const {user}=useSelector((state)=>state.auth);
  const {
    register, 
    handleSubmit, 
    formState:{errors},
    }= useForm();
  
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const [login,{isLoading}]=useLoginMutation();

    const submitHandler =async(data)=>{
      // console.log("Submitted");
      try {
        const result= await login(data).unwrap();

        console.log("Login Response:", result); // ✅ Logs correct user data

         // ✅ Store user in Redux
        dispatch(setCredentials(result)); 
        toast.success("Login successful!");

        navigate("/");

      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.message); 
      }
    }
    console.log(user)

    // useEffect: it's used to check if the user is logged in and, if so, redirects to the /dashboard route.
    //if the user exists, then directly redirects to dashboard
    useEffect(()=>{
      user && navigate("/dashboard");
    },[user]);

    return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>

      <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>
        {/* left side below div*/}
        <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
          <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
              <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                Manage All Your Projects In One Place
              </span>

              <p className='flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700'>
                <span>Cloud -Based</span>
                <span>Project Tracker </span>
              </p>

              <div className='cell'>
                <div className='circle rotate-in-up-left'></div>
              </div>
          </div>
        </div>

        {/* right side below div*/}
        <div className=' w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center'>
            
            <form onSubmit={handleSubmit(submitHandler)}
            className='form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14'>

              <div className=''>
                <p className='text-blue-600 text-3xl font-bold text-center'> Welcome Back</p>
                <p className='text-center text-base text-gray-700'>Keep All Your Cradentials Safe</p>
              </div>

              <div className='flex flex-col gap-y-5'>

                <Textbox
                placeholder="Email@example.com" 
                type="email" 
                name="email" 
                label="Email Address"
                className="w-full rounded-full"
                register={register("email",{
                  required:"Email Address is required!",
                })}
                error={errors.email ? errors.email.message : ""}
                />

              <Textbox
                placeholder="Your Password" 
                type="password" 
                name="password" 
                label="password"
                className="w-full rounded-full"
                register={register("password",{
                  required:"Password is required!",
                })}
                error={errors.password ? errors.password.message : ""}
                />

                <span className='text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer'> 
                  Forget Password ?
                </span>

                {isLoading ? <Loader/> : <Button
                  type='sybmit'
                  label='Submit'
                  className='w-full h-10 bg-blue-700 text-white rounded-full'>

                </Button>}
              </div>
            </form>
        </div>

      </div>
    </div>
    );
}
export default Login