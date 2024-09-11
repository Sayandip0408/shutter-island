import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Admin from './pages/Admin'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Gallery from './pages/Gallery'
import Location from './pages/Location'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/gallery' Component={Gallery} />
          <Route path='/authentication' Component={Login} />
          <Route path='/admin-dashboard' Component={Admin} />
          <Route path='/gallery/:loc' Component={Location} />
          <Route path='*' Component={NotFound} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
