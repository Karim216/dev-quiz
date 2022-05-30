import React, {useState, useEffect} from 'react'
import {signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';


const Logout = () => {

  const [checked, setChecked] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if(checked){

      signOut(auth).then(() => {
        // Sign-out successful.
        console.log("décennexion")

        setTimeout(() => {
          navigate('/landing')
        }, 1000);


      }).catch((error) => {
        // An error happened.
        console.log("une error de déconnexion")
      });
    }

  }, [checked])

  const handleChange = e => {
    setChecked(e.target.checked)
  }

  return (
    <div className='logoutContainer'>
        <label  className='switch'>
          <input onChange={handleChange}
          type="checkbox"
          checked={checked}
          />
          <span className='slider round' data-tip="Déconnexion"></span>
        </label>
        <ReactTooltip place="left" effect="solid" />
    </div>
  )
}

export default Logout