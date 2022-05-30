import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [btn, setBtn] = useState(false)

  const [error, setError] = useState('')

  const navigate = useNavigate();


  // const handleEmail = e => {
  //   setEmail(e.target.value)
  // }
  // const handlePassword = e => {
  //   setPassword(e.target.value)

  // }

  useEffect(() => {
    
    if(password.length > 5 && email !== ''){

      setBtn(true)

    }else if(btn){

      setBtn(false)

    }
  }, [password, email, btn])
  

  const handleSubmit = e => {

    e.preventDefault()

    signInWithEmailAndPassword (auth, email, password)
    .then(user => {
      setEmail('')
      setPassword('')
      navigate('/welcome', {replace: true})
    }).
    catch(error => {
      setError(error)
      setEmail('')
      setPassword('')
    })

  }

  const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
        <div className='formBoxLeftLogin'></div>
        <div className='formBoxRight'>
            <div className='formContent'>
              {errorMsg}
              <h2>Connexion</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete='off' required />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="inputBox">
                  <input value={password} onChange={e => setPassword(e.target.value)} type="password" autoComplete='off' required />
                  <label htmlFor="password">Mot de passe</label>
                </div>
                {
                  <button disabled = {btn ? false : true}>Connectez-vous</button>
                }
              </form>
              <div className='linkContainer'>
                <Link className='simpleLink' to="/singup">Nouveau sur MARVEL-QUIZ ? Inscrivez-vous maintenant.</Link>
                <br />
                <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié ? Récupérez le ici</Link>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login