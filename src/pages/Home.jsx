import React from 'react'
import { motion } from 'framer-motion'
import { TbHomeFilled } from 'react-icons/tb'
import { BsImages } from 'react-icons/bs'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { IoCodeSlash, IoLogoFacebook, IoLogoGithub, IoLogoInstagram } from 'react-icons/io5'

const Home = () => {
  return (
    <main className='h-[calc(100vh-64px)] bg-white flex' >
      <aside className='h-full w-16 bg-[#18243A] flex flex-col justify-between'>
        <ul className='w-full h-fit flex flex-col items-center justify-center gap-5 py-5'>
          <Link to='/' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <TbHomeFilled />
          </Link>
          <Link to='/gallery' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <BsImages />
          </Link>
          <Link to='/admin-dashboard' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <MdOutlineAdminPanelSettings />
          </Link>
        </ul>
        <ul className='w-full h-fit flex flex-col items-center justify-center gap-5 py-5'>
          <a href='https://www.facebook.com/sayandip.adhikary.96' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <IoLogoFacebook />
          </a>
          <a href='https://www.instagram.com/sayan.dip7/' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <IoLogoInstagram />
          </a>
          <a href='https://github.com/Sayandip0408' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <IoCodeSlash />
          </a>
          <a href='https://sayandip-adhikary.vercel.app/' className='text-xl p-2 rounded-md hover:bg-[#24314a] text-slate-400'>
            <IoLogoGithub />
          </a>
        </ul>
      </aside>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='p-5 w-[calc(100vw-64px)] h-full flex flex-col justify-around'>
        <div className='w-full'>
          {/* <h1 className='capitalize w-full text-3xl text-center satisfy-regular text-slate-700 underline underline-offset-8'>shutter island</h1> */}
          <motion.img
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src='https://res.cloudinary.com/dgb69w56a/image/upload/v1676892535/MyGallery/IMG_20211118_163424_pav4p0.jpg'
            alt='lol'
            className='w-full h-44 md:h-80 2xl:h-[450px] rounded-md border border-white shadow'
          />
        </div>
        <div className='w-full lg:w-[60%] xl:w-[50%] mx-auto'>
          <img src='https://res.cloudinary.com/dgb69w56a/image/upload/v1719566636/MyGallery/qi7upy2jhiql5dkchirp.jpg' alt='developer' className='h-24 lg:h-28 float-left border border-white shadow rounded-md m-2' />
          <p className='playwrite-ng-modern-400 text-justify text-slate-700 lg:text-lg'>『 Welcome to my gallery! While I am not a professional photographer, I have a passion for capturing moments and turning them into lasting memories. This site is a personal project, combining my love for photography with my skills as a web developer. I hope you enjoy browsing through my work and experiencing the stories behind each photo. Thank you for visiting! 』</p>
        </div>
      </motion.div>
    </main>
  )
}

export default Home