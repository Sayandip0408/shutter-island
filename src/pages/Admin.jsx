import React, { useEffect, useState } from 'react'
import { useDefaultContext } from '../assets/configs/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FcAddImage } from "react-icons/fc";
import { db } from '../assets/configs/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import Loader from './Loader';
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';

const Admin = () => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [year, setYear] = useState('');
  const [images, setImages] = useState([]);
  const { isLoading, setIsLoading, authUser, signOut } = useDefaultContext();
  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const imageCollection = 'images';
      const data = {
        "url": url,
        "title": title,
        "location": location,
        "year": year,
        "_id": "",
      };
      const imagesCollectionRef = collection(db, imageCollection);

      try {
        const newImageDocRef = await addDoc(imagesCollectionRef, data);
        await updateDoc(doc(db, imageCollection, newImageDocRef.id), {
          _id: newImageDocRef.id,
        });
      } catch (error) {
        console.error('Error adding image to Firestore:', error);
      }
      setUrl('');
      setLocation('');
      setTitle('');
      setYear('');
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const fetchImages = async () => {
    try {
      const q = query(collection(db, "images"));
      const querySnapshot = await getDocs(q);

      let data = [];
      querySnapshot.forEach((image) => {
        data.push({ ...image.data(), id: image._id });
      });
      setImages(data);
    } catch (error) {
      console.error("An error occured", error);
    }
  }

  const deleteImage = async (docId) => {
    try {
      await deleteDoc(doc(db, "images", docId));
      toast.success('Permanently Deleted!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      fetchImages();
    } catch (error) {
      console.error("An error occured", error);
    }
  };

  useEffect(() => {
    if (!isLoading && !authUser) {
      navigate("/authentication");
    }
    if (!!authUser) {
      fetchImages();
    }
  }, [authUser, isLoading]);

  return isLoading ? <Loader /> : (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='h-[calc(100vh-64px)] w-full overflow-hidden overflow-y-scroll p-2 bg-[#ffffff]'>
      <h1 className='capitalize text-lg lg:text-3xl playwrite-ng-modern-900 text-center my-5'>hello <span className='text-red-600'>SayanDip</span>, good to see you!</h1>
      <motion.form initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} className='w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%] mx-auto border my-5 bg-white rounded-md px-2 lg:px-5 py-5 flex flex-col justify-center gap-2 shadow-md' onSubmit={handlePost}>
        <h1 className='text-center playwrite-ng-modern-900 text-base capitalize'>Add new image in your gallery</h1>
        <label className='playwrite-ng-modern-900 text-xs'>Image Link</label>
        <input
          type='text'
          placeholder='i.e. https://xyz.com/12345'
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='border h-10 px-2 rounded-md playwrite-ng-modern-900 text-xs' />
        <label className='playwrite-ng-modern-900 text-xs'>Image Title</label>
        <input
          type='text'
          placeholder='i.e. Streets of Kolkata'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border h-10 px-2 rounded-md playwrite-ng-modern-900 text-xs' />
        <label className='playwrite-ng-modern-900 text-xs'>Image Location</label>
        <input
          type='text'
          placeholder='i.e. Kolkata'
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='border h-10 px-2 rounded-md playwrite-ng-modern-900 text-xs' />
        <label className='playwrite-ng-modern-900 text-xs'>Image Taken on (Year)</label>
        <input
          type='text'
          placeholder='i.e. 2022'
          required
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='border h-10 px-2 rounded-md playwrite-ng-modern-900 text-xs' />
        <motion.button initial={{ scale: 1 }} whileTap={{ scale: 0.9 }} type='submit' className='h-10 w-full flex items-center justify-center gap-3 rounded-md playwrite-ng-modern-900 text-xs uppercase bg-slate-800 hover:bg-slate-900 text-white'>Post <FcAddImage className='text-xl' /></motion.button>
      </motion.form>

      <button onClick={signOut} className='h-10 w-full lg:w-[500px] block mx-auto bg-red-600 rounded-md text-white playwrite-ng-modern-900 text-xs shadow-md'>Log-out from Admin Dashboard</button>


      <h1 className='capitalize text-xl lg:text-2xl playwrite-ng-modern-900 text-center mt-10 mb-5'>⬇️ image list admin view ⬇️</h1>
      <section className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-2 mb-5'>
        {images.map((i) => (
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.5 }} key={i._id} className='bg-white hover:bg-slate-100 cursor-pointer border border-slate-100 shadow rounded-md p-2 flex items-center justify-between gap-1'>
            <img src={i.url} alt={i.title} className='h-12 w-12 rounded-md' />
            <p className='text-slate-500 capitalize text-xs playwrite-ng-modern-400'><span className='text-slate-950 text-sm playwrite-ng-modern-900'>{i.title}</span>, {i.location}, {i.year}</p>
            <button className='h-10 w-10 bg-red-400 hover:bg-red-500 text-xl flex items-center justify-center rounded-md text-red-900 hover:text-red-950' onClick={() => deleteImage(i._id)}><MdDelete /></button>
          </motion.div>
        ))}
      </section>

    </motion.main>
  )
}

export default Admin