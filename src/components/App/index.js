import '../../App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Header from '../Header'
import Landing from '../Landing'
import Footer from '../Footer'
import Welcome from '../Welcome'
import Login from '../Login'
import Singup from '../Singup'
import ErrorPage from '../ErrorPage'
import ForgetPassword from '../ForgetPassword'
import { IconContext } from "react-icons";


function App() {
  return (
    <div>
      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          <Header />

          <Routes>
            <Route path='/' element={<Navigate to="/landing" replace />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/singup' element={<Singup />} />
            <Route path='/forgetpassword' element={<ForgetPassword />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>

          <Footer />
        </IconContext.Provider>
      </Router>
      
    </div>
  );
}

export default App;
