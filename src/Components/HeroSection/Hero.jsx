import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center">
       <div className="bg-[#F7F8F9] mt-10 sm:w-[25%] h-[80vh]">
        <div className="pr-3 pl-3 mt-90">
        <section className='mb-6'>
            <h1 className='text-[#1D2226] font-bold text-[26px]'>Welcome to PopX</h1>
            <p className='text-[#1D2226] font-small text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit,</p>
        </section>
        <section className='flex flex-col'>
            <NavLink to='/signup'>
                <button className='w-full rounded-md bg-[#6C25FF] text-white pt-2 pb-2 mb-2 font-medium text-sm  cursor-pointer'>Create Account</button>
            </NavLink>
            <NavLink to='/login'>
                <button className='w-full rounded-md bg-[#6C25FF4B] text-[#1D2226] pt-2 pb-2 mb-2 font-medium text-sm  cursor-pointer'>Already Registered? Login</button>
            </NavLink>
        </section>
        </div>
      </div> 
    </div>
  )
}

export default Hero
