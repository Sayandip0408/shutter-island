import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { IoMenu, IoClose, IoLogoFacebook, IoLogoInstagram, IoLogoGithub, IoCodeSlash } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import { FcHome, FcGallery, FcPortraitMode } from "react-icons/fc";
import image from '../assets/images/image1.png'

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className={`h-16 w-full ${showMenu?'bg-[#18243A]':'bg-[#F7F6FA]'} flex items-center gap-5 playwrite-pl-900 relative`}>
      <div className='bg-[#18243A] w-16 h-full flex items-center justify-center'>
        <Link to='/gallery' onClick={() => setShowMenu(false)} className='flex items-center justify-center gap-2'>
          <img src={logo} alt='SayanDip' className='h-10 rounded-lg border border-slate-300' />
        </Link>
      </div>
      <Link to='/gallery' onClick={() => setShowMenu(false)} className='flex items-center justify-center gap-2'>
        <h1 className={`text-xl lg:text-2xl capitalize satisfy-regular ${showMenu?'text-red-500':'text-[#18243A]'}`}>Shutter island</h1>
      </Link>
      <ul className='hidden lg:flex items-center justify-end gap-10 h-10 absolute right-5'>
        <span className='flex items-center gap-5 h-full px-2'>
          <Link to='/' className='text-sm capitalize hover:underline underline-offset-4'>
            Home
          </Link>
          <Link to='/gallery' className='text-sm capitalize hover:underline underline-offset-4'>
            Gallery
          </Link>
          <Link to='/admin-dashboard' className='text-sm capitalize hover:underline underline-offset-4'>
            Admin
          </Link>
        </span>
        <span className='flex items-center gap-5 h-full px-2'>
          <a href='https://www.facebook.com/sayandip.adhikary.96'>
            <IoLogoFacebook />
          </a>
          <a href='https://www.instagram.com/sayan.dip7/'>
            <IoLogoInstagram />
          </a>
          <a href='https://sayandip-adhikary.vercel.app/'>
            <IoCodeSlash />
          </a>
          <a href='https://github.com/Sayandip0408'>
            <IoLogoGithub />
          </a>
        </span>
      </ul>
      <button className={`text-3xl ${showMenu?'text-red-500':'text-slate-700'} lg:hidden absolute right-5`} onClick={() => setShowMenu(!showMenu)}>{showMenu ? <IoClose /> : <IoMenu />}</button>
      <motion.aside className={`h-[calc(100vh-64px)] w-full bg-[#18243A] absolute top-16 left-0 pb-10 flex flex-col justify-between z-50 ${showMenu ? 'block' : 'hidden'}`}>
        <ul className='p-1 flex flex-col gap-1'>
          <Link to='/' onClick={() => setShowMenu(false)}>
            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className='w-full h-16  flex items-center gap-5 px-5 rounded-lg shadow'>
              <FcHome className='text-3xl' />
              <p className='text-slate-300 playwrite-ng-modern-900 text-sm'>Home</p>
            </motion.div>
          </Link>
          <Link to='/gallery' onClick={() => setShowMenu(false)}>
            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className='w-full h-16 flex items-center gap-5 px-5 rounded-lg shadow'>
              <FcGallery className='text-3xl' />
              <p className='text-slate-300 playwrite-ng-modern-900 text-sm'>Gallery</p>
            </motion.div>
          </Link>
          <Link to='/admin-dashboard' onClick={() => setShowMenu(false)}>
            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className='w-full h-16 flex items-center gap-5 px-5 rounded-lg shadow'>
              <FcPortraitMode className='text-3xl' />
              <p className='text-slate-300 playwrite-ng-modern-900 text-sm'>Admin Dashboard</p>
            </motion.div>
          </Link>
        </ul>
        <motion.img initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} src={image} alt='design' className='h-64' />
        <motion.ul initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className='p-1 flex items-center justify-around bg-[#25334d] h-16 mx-1 rounded-lg shadow'>
          <a href='https://www.facebook.com/sayandip.adhikary.96' className='text-2xl text-slate-300'>
            <IoLogoFacebook />
          </a>
          <a href='https://www.instagram.com/sayan.dip7/' className='text-2xl text-slate-300'>
            <IoLogoInstagram />
          </a>
          <a href='https://github.com/Sayandip0408' className='text-2xl text-slate-300'>
            <IoCodeSlash />
          </a>
          <a href='https://sayandip-adhikary.vercel.app/' className='text-2xl text-slate-300'>
            <IoLogoGithub />
          </a>
        </motion.ul>
      </motion.aside>
    </nav>
  )
}

export default Navbar