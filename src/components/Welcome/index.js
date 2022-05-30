import React, {useState, useEffect, Fragment} from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { getDoc } from 'firebase/firestore';
import Logout from '../Logout'
import Loader from '../Loader'
import Quiz from '../Quiz'
import { useNavigate } from 'react-router-dom';

const Welcome = () => {

  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  useEffect(() => {

    const listner = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    })

    if(!!userSession){

      const colRef = user(userSession.uid);
      getDoc(colRef)
      .then(snapshot => {
        if(snapshot.exists()){
          const docData = snapshot.data()
          setUserData(docData)
        }

      })
      .catch(error => {
        console.log(error)
      })

    }

    return listner()

  }, [userSession])

  return userSession === null ? (
    
    <Loader
    loadingMsg={"AUthentification ..."}
    styling={{textAlign: "center", color: "#FFFFFF"}}
    />
  ) : (
    <div className='quiz-bg'>
        <div className='container'>
          <Logout userData={userData}/>
          <Quiz userData={userData}/>
        </div>
    </div>
  )
}

export default Welcome