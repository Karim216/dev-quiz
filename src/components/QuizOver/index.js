import React, { Fragment, useEffect, useState } from 'react'
import {GiTrophyCup} from  "react-icons/gi";
import Loader from '../Loader';
import Modal from '../Modal';
import axios from 'axios';

const QuizOver = React.forwardRef((props, ref) => {

  const {
    leveNames, 
    score, 
    maxQuestion, 
    quizLevel, 
    percent,
    loadLavelQuestion
  } = props

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY
  const hash = '2429bc37e75148b73689628f2f614c7d';

  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [characterInfo, setCharacterInfo] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
     setAsked(ref.current) 

     if(localStorage.getItem('marvelStorageData')){

      const date = localStorage.getItem('marvelStorageData')
      checkDataAge(date)
     }
  }, [ref])

  const checkDataAge = date => {
    const toDay = Date.now();

    const timeDiff = toDay - date

    const daysdiff = timeDiff / (1000 * 3600 * 24);

    if(daysdiff >= 15){
      localStorage.clear();
      localStorage.setItem('marvelStorageData', Date.now());
    }
  }

  const showModal = id => {
    setOpenModal(true)

    if(localStorage.getItem(id)){

      setCharacterInfo(JSON.parse(localStorage.getItem(id)))
      setLoading(false)

    }else{

        axios
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash${hash}`)
        .then(response => {

          setCharacterInfo(response.data)
          setLoading(false)
          console.log(response.data)

          localStorage.setItem(id, JSON.stringify(response.data))

          if( !localStorage.getItem('marvelStorageData')){
            localStorage.setItem('marvelStorageData', Date.now())
          }
          
        })
        .catch(error => console.log(error))
    }
    
  }

  const hideModal = () => {
    setOpenModal(false)
    setLoading(true)
  }

  const capitalizeFirstLette = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const averageGrade = maxQuestion / 2
  if(score < averageGrade) setTimeout(() => loadLavelQuestion(quizLevel), 3000);

  
  const decision = score >= averageGrade ? 
  (
    <Fragment>
      <div className='stepsBtnContainer'>
      {
        quizLevel < leveNames.length ? 
        (
          <Fragment>
            <p className='successMsg'>Passer au niveau suivant</p>
            <button
            onClick={() => loadLavelQuestion(quizLevel)}
            className='btnResult success'>Niveau suivant</button>
          </Fragment>
          
        ) 
        : 
        (
          <Fragment>
            <p className='successMsg'>
            <GiTrophyCup size={"50px"} />  Bravo, vous êtes un expert
            </p>
            <button 
            onClick={() => loadLavelQuestion(0)}
            className='btnResult gameOver'>Accueil</button>
          </Fragment>
        )
      }
       
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note {score}/{maxQuestion}</div>
      </div>
    </Fragment>
  ) 
  : 
  (
    <Fragment>
      <div className='stepsBtnContainer'>
        <p className='failureMsg'>Vous avez échouez</p>
      </div>
      <div className='percentage'>
        <div className='progressPercent'>Réussite: {percent}%</div>
        <div className='progressPercent'>Note {score}/{maxQuestion}</div>
      </div>
    </Fragment>
  )
  

  const questionAnswer = score >= averageGrade ? (
    asked.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td><button  
              onClick={() => showModal(question.heroId)}
              className='btnInfo'>Infos</button></td>
        </tr>
      )
    })
  )
  :
  (
    <tr>
      <td colSpan="3">
        <Loader
        loadingMsg={"Pas de réponses!"}
        styling={{textAlign: "center", color: "red"}}
        />
      </td>
    </tr>
  )

  const resultInModal = !loading ?
  (
    <Fragment>
        <div className="modalHeader">
            <h1>{characterInfo.data.results[0].name}</h1>
        </div>
        <div className="modalBody">
            <div className="comicImage">
              <img src={characterInfo.data.results[0].thumbnail.path+'.'+characterInfo.data.results[0].thumbnail.extension} alt={characterInfo.data.results[0].name} />
              {characterInfo.attributionText}
            </div>
            <div className="comicDetails">
              <h3>Description</h3>
              {
                characterInfo.data.results[0].description ?
                (<p>{characterInfo.data.results[0].description}</p>)
                :
                (<p>Desription indisponible</p>)
              }
              <h3>Plus d'infos</h3>
              {
                 characterInfo.data.results[0].urls &&
                 characterInfo.data.results[0].urls.map((url, index) =>{
                   return <a 
                            key={index} 
                            href={url.url}
                            target="_blank"
                            rel="noopenner noreferrer">
                            {capitalizeFirstLette(url.type)}
                          </a>
                 })
              }
            </div>
        </div>
        <div className="modalFooter">
            <button onClick={hideModal} className='modalBtn'>Fermer</button>
        </div>
    </Fragment>
    
  )
  :
  (
    <Fragment>
      <div className="modalHeader">
          <h1>Réponse de Marvel ...</h1>
      </div>
      <div className="modalBody">
          <Loader />
      </div>
    </Fragment>
  )
 
  return (
    <Fragment>
      {decision}
      <hr />
      <p>Les réponses aux questions posées</p>
      <div className='answerContainer'>
        <table className='answers'>
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {questionAnswer}
          </tbody>
        </table>
      </div>
      <Modal showModal={openModal} hideModal={hideModal}>
        
        {resultInModal}
      </Modal>
    </Fragment>
    
  )
})

export default React.memo(QuizOver)