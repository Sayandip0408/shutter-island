import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'
import { TbHomeFilled } from "react-icons/tb";
import { BsImages } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../assets/configs/firebase';
import { IoCodeSlash, IoLogoFacebook, IoLogoGithub, IoLogoInstagram } from 'react-icons/io5';
import { FaChevronRight } from "react-icons/fa6";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uniqueLocs, setUniqueLocs] = useState([]);

  const fetchImages = async () => {
    try {
      const q = query(collection(db, "images"));
      const querySnapshot = await getDocs(q);

      let data = [];
      querySnapshot.forEach((image) => {
        data.push({ ...image.data(), id: image._id });
      });

      const uniqueLocations = {};
      data.forEach(item => {
        const locationUpper = item.location.toUpperCase();
        if (!uniqueLocations[locationUpper]) {
          uniqueLocations[locationUpper] = { location: item.location, url: item.url };
        }
      });
      const uniqueLocationArray = Object.values(uniqueLocations);

      setUniqueLocs(uniqueLocationArray);
      setImages(data);
    } catch (error) {
      console.error("An error occured", error);
    }
  }

  useEffect(() => {
    fetchImages();
  }, [])


  return (
    <main className='h-[calc(100vh-64px)]'>
      <section className='h-full w-full overflow-hidden overflow-y-scroll flex'>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className='h-full w-[calc(100vw-64px)] overflow-hidden overflow-y-scroll bg-white p-5'>
          <p className='playwrite-ng-modern-900 mb-5 w-full p-1 flex items-center gap-2'>
            <Link to='/' className='text-lg text-slate-500'><TbHomeFilled /></Link>
            <FaChevronRight className='text-red-500' />
            <Link to='/gallery' className='text-sm'>Gallery</Link>
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {
              uniqueLocs.map((loc, index) => (
                <Link to={`/gallery/${loc.location.toLowerCase()}`} key={index}>
                  <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }} className='bg-white p-2 rounded-md relative cursor-pointer'>
                    <img src={loc.url} alt={loc.location} className='h-full w-full rounded-md brightness-50' />
                    <div className='absolute h-full w-full top-0 left-0 rounded-md flex items-center justify-center'>
                      <h1 className='capitalize text-white playwrite-ng-modern-900 md:text-xl lg:text-2xl'>{loc.location} →</h1>
                    </div>
                  </motion.div>
                </Link>
              ))
            }
          </div>
        </motion.div>
      </section>
      {/* <Footer /> */}
    </main>
  )
}

export default Gallery