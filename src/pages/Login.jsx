import React, { useEffect, useState } from 'react'
import { useDefaultContext } from '../assets/configs/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../assets/configs/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';
import Loader from './Loader'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { isLoading, setIsLoading, authUser, setAuthUser } = useDefaultContext();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()

        setIsLoading(true);

        // if (!email || !password) {
        //     alert('Fill up properly');
        //     setIsLoading(false);
        //     return;
        // }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('')
            setPassword('')
            setIsLoading(false);
            navigate('/admin-dashboard');
            toast.success('Welcome!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            setIsLoading(false);
            toast.error("Oops! Wrong credentials.", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    useEffect(() => {
        if (!isLoading && authUser) {
            navigate('/gallery');
            return;
        }
    }, [authUser, isLoading]);

    return isLoading ? <Loader/> : (
        <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='h-[calc(100vh-64px)] w-full p-2 bg-[#e8e7e2]'>
            <motion.form initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} onSubmit={handleLogin} className='rounded-md bg-white shadow px-2 py-5 h-80 w-full lg:w-[700px] mx-auto flex flex-col justify-between'>
                <h1 className='text-center text-2xl satisfy-regular my-5 capitalize text-slate-700'>Shutter island ❘ admin login</h1>
                <label className='text-sm text-slate-700 font-medium satisfy-regular'>Email</label>
                <input
                    type='email'
                    placeholder='i.e. johndoe@gmail.com'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='h-10 w-full border px-2 rounded-md playwrite-ng-modern-400' />
                <label className='text-sm text-slate-700 font-medium satisfy-regular'>Password</label>
                <input
                    type='password'
                    placeholder='* * * * * * * *'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='h-10 w-full border px-2 rounded-md playwrite-ng-modern-400' />
                <motion.button initial={{ scale: 1 }} whileTap={{ scale: 0.9 }} type='submit' className='h-10 w-full px-2 rounded-md bg-slate-800 hover:bg-slate-900 text-white satisfy-regular'>Login</motion.button>
            </motion.form>
        </motion.main>
    )
}

export default Login