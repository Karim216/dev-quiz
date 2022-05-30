import React, { useRef, useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {

    const refWolverine = useRef(null)

    const [btn, setBtn] = useState(false)
    //console.log(refWolverine.current.classList)
    // refWolverine.current

    useEffect(() => {
      
        refWolverine.current.classList.add('startingImg')
        console.log(refWolverine.current.classList)
    

        setTimeout(() => {
            refWolverine.current.classList.remove('startingImg')

            setBtn(true)
            
        }, 1000);

      
    }, [])

    const setLeftImg = () => {
        refWolverine.current.classList.add('leftImg')

    }

    const setRightImg = () => {
        refWolverine.current.classList.add('rightImg')

    }

    const clearImg = () => {

        if(refWolverine.current.classList.contains("leftImg")){
            refWolverine.current.classList.remove('leftImg')
        }else if(refWolverine.current.classList.contains("rightImg")){
            refWolverine.current.classList.remove('rightImg')

        }

    }

    const displayBtn = btn && (
        <Fragment>
            <div onMouseOut={clearImg} onMouseOver={setLeftImg} className='leftBox'>
                <Link to="/login" className='btn-welcome'>Connexion</Link>
            </div>
            <div onMouseOut={clearImg} onMouseOver={setRightImg} className='rightBox'>
                <Link to="/singup" className='btn-welcome'>Inscription</Link>
            </div>
        </Fragment>
       
    )
    
  return (
    <main ref={refWolverine} className="welcomePage">
        {displayBtn}
    </main>
  )
}

export default Landing