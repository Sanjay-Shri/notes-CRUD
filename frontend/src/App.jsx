
import './App.css'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import Home from "./Pages/Home"
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import ContextProvider from './Context/ContextProvider'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
 

  return (
   <ContextProvider>
      <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       
       <Route path="/signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
   </ContextProvider>
  )
}

export default App
