import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BsImages } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa6'
import { IoCodeSlash, IoLogoFacebook, IoLogoGithub, IoLogoInstagram, IoArrowBackOutline } from 'react-icons/io5'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { TbHomeFilled } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../assets/configs/firebase';

const Location = () => {
    const loc = useLocation();
    const [images, setImages] = useState([]);
    const [showPreview, setShowPreview] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const fetchImages = async () => {
        try {
            const q = query(collection(db, "images"));
            const querySnapshot = await getDocs(q);

            let data = [];
            querySnapshot.forEach((image) => {
                data.push({ ...image.data(), id: image._id });
            });

            const filteredData = data.filter(item => item.location.toLowerCase() === absolutePath);

            setImages(filteredData);
        } catch (error) {
            console.error("An error occured", error);
        }
    }

    function trimString(input) {
        return input.replace(/^\/gallery\//, '');
    }
    const absolutePath = trimString(loc.pathname);

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
                        <FaChevronRight className='text-red-500' />
                        <Link to={`/gallery/${absolutePath}`} className='text-sm capitalize'>{absolutePath}</Link>
                    </p>
                    <p className='my-5 capitalize text-blue-600 underline'>click on an image to view in detail</p>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                        {images.map((data, index) => (
                            <motion.div initial={{ scale: 0.5 }} whileInView={{ scale: 1 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} transition={{ duration: 0.3 }} key={index} 
                            className='flex flex-col gap-2 cursor-pointer' 
                            onClick={() => {
                                setShowPreview(true)
                                setPreviewUrl(data.url)
                                }}>
                                <img src={data.url} alt={data.title} className='rounded-md hover:brightness-75' />
                                <h4 className='capitalize playwrite-ng-modern-400 text-xs text-slate-500'>{data.title}, {data.year}</h4>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
            {showPreview ?
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }} className='h-[100vh] w-full bg-black absolute top-0 flex items-center justify-center'>
                    <span className='absolute top-3 left-3 flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] cursor-pointer p-2 rounded-md' onClick={() => setShowPreview(false)}>
                        <IoArrowBackOutline className='text-red-500 text-2xl' />
                        <p className='text-slate-300'>Back</p>
                    </span>
                    <img src={previewUrl} alt='image preview' className='lg:h-[65%] lg:border lg:border-slate-500' />
                </motion.div>
                : <></>
            }
        </main>
    )
}

export default Location