import React, {useState} from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from "../Firebase/firebaseConfig";
import { setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom'

const Singup = () => {

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [loginData, setLoginData] = useState(data)
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const handleChange = e => {

    setLoginData({...loginData, [e.target.id]: e.target.value})

  }

  const handleSubmit = e => {
    e.preventDefault()
    const {email, password, pseudo} = loginData;

    createUserWithEmailAndPassword(auth, email, password)
    .then(authUser => {
      return setDoc(user(authUser.user.uid), {
        pseudo,
        email
      });
    })
    .then(() => {
      // Signed in 
      setLoginData({...data})
      navigate('/welcome')
      // ...
    })
    .catch(error => {
      setError(error)
      setLoginData({...data})
      // ..
    });


  }

  const {pseudo, email, password, confirmPassword} = loginData

  const btn = pseudo ==='' || pseudo.indexOf('@') > -1 || email === '' || password === '' || password !== confirmPassword ? <button disabled>Inscription</button> : <button>Inscription</button>

  //gestion des erreurs
  const errorMsg = error !== '' && <span>{error.message}</span>
  
  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
        <div className='formBoxLeftSignup'></div>
        <div className='formBoxRight'>
            <div className='formContent'>
              {errorMsg}
              <h2>Inscription</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input value={pseudo} onChange={handleChange} type="text" id='pseudo' autoComplete='off' required />
                  <label htmlFor="pseudo">Pseudo</label>
                </div>
                <div className="inputBox">
                  <input value={email} onChange={handleChange} type="email" id='email' autoComplete='off' required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="inputBox">
                  <input value={password} onChange={handleChange} type="password" id='password' autoComplete='off' required />
                  <label htmlFor="password">Mot de passe</label>
                </div>
                <div className="inputBox">
                  <input value={confirmPassword} onChange={handleChange} type="password" id='confirmPassword' autoComplete='off' required />
                  <label htmlFor="confirmPassword">Confirmer le de passe</label>
                </div>
                {btn}
              </form>
              <div className='linkContainer'>
                <Link className='simpleLink' to="/login">Déjà inscrit ? connectez-vous</Link>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Singup