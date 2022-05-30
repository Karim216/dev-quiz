import React, {useState} from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { Link, useNavigate } from 'react-router-dom'
const ForgetPassword = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const disabled = email === ''

    const handleSubmit = event => {

        event.preventDefault()
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null)
            setSuccess(`Consulter votre email ${email} pour changer le mot de passe`)
            setEmail('')

            setTimeout(() => {
                navigate('/login')
            }, 5000);
        })
        .catch(error => {
            setError(error)
            setEmail('')
        })
    }
  return (
    <div className='signUpLoginBox'>
        <div className='slContainer'>
        <div className='formBoxLeftForget'></div>
        <div className='formBoxRight'>
            <div className='formContent'>
                {
                    success && <span style={{
                        border: "1px solid green",
                        background: "green",
                        color: "#ffffff"
                    }}>{success}</span>
                }

                {error && <span>{error}</span>}
              <h2>Mot de passe oublier ?</h2>
              <form onSubmit={handleSubmit}>
                <div className="inputBox">
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoComplete='off' required />
                  <label htmlFor="email">Email</label>
                </div>
                {
                    <button disabled={disabled}>Récupérer</button>
                }
              </form>
              <div className='linkContainer'>
                <Link className='simpleLink' to="/login">Déjà inscrit ? Connectez-vous</Link>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ForgetPassword