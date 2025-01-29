import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from '../components/home/page'


function App() {

  const [Authentificated, setAuth] = useState(false);
  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const res = await fetch("http://localhost:3000/check_auth",
          {
            method: 'GET',
            credentials: "include",
          }
        );
        if (res.status == 200) setAuth(true);
      } catch (e) {
        console.log("error ", e)
      }
    }
    isLoggedIn();
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            (!Authentificated) ?
              <Route path='/' element={<Home />} />
              :
              <Route path='/'>
                <Route index element={<p>this is chat actually</p>} />
              </Route>

          }
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
