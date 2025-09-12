import conf from './conf/conf';
import './App.css'
import { useEffect, useState } from 'react';
import authservice from './appwrite/auth'
import {useDispatch} from 'react-redux'
import {login,logout} from './store/authSlice'
import { Footer, Header } from './components';
import { Navigate, Outlet } from 'react-router-dom';


function App() {

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authservice.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
        Navigate("/login");
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-br from-gray-900 via-gray-800 to-black'>
      <div className='w-full block'>
        <Header />
        <main >
          <Outlet></Outlet>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
