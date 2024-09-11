import React from 'react'
import loader from '../assets/images/loader.gif'

const Loader = () => {
  return (
    <main className='h-[calc(100vh-64px)] bg-white w-full flex items-center justify-center'>
      <img src={loader} alt='loader' />
    </main>
  )
}

export default Loader