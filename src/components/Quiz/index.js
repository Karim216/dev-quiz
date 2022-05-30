import React, { Component, Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaChevronRight } from "react-icons/fa";
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import QuizOver from '../QuizOver'
import { QuizMarvel } from '../quizMarvel'

const initialState = {
  quizLevel: 0,
  maxQuestions: 10,
  storedQuestions: [],
  question: null,
  options: [],
  idQuestion: 0,
  btnDisabled: true,
  userAnswer: null,
  score: 0,
  showWelcomeMsg: false,
  quizEnd: false,
  percent: null
}

const levelNames = ["debutant", "confirme", "expert"];


class Quiz extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
    this.storedDataRef = React.createRef()

  }




  loadQuestions = level => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

      this.storedDataRef.current = fetchedArrayQuiz

      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => keepRest)

      this.setState({
        storedQuestions: newArray
      })
    }
  }

  showToastMsg = pseudo => {
    if (!this.state.showWelcomeMsg) {

      toast.warn(`Bienvenue ${pseudo} et bonne chance !`, {
        position: "top-right",
        theme: "colored",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });

      this.setState({
        showWelcomeMsg: true
      })
    }
  }

  showSuccessMsg = () => {
    toast.success('Bravo ! +1', {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  showErrorMsg = () => {
    toast.error('Raté ! 0', {
      position: "top-right",
      theme: "colored",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  componentDidMount() {
    this.loadQuestions(levelNames[this.state.quizLevel])
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      maxQuestions,
      storedQuestions,
      idQuestion,
      score,
      quizEnd

    } = this.state

    if ((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {

      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options
      })
    }

    if ((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true
      })
    }

    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercent(maxQuestions, score)

      this.gameOver(gradePercent)

    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {

      this.showToastMsg(this.props.userData.pseudo)

    }

  }

  submitAnswer = answerQuestion => {

    this.setState({
      btnDisabled: false,
      userAnswer: answerQuestion
    })
  }

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //END
      this.setState({
        quizEnd: true
      })
    } else {
      this.setState(prevState => ({
        idQuestion: prevState.idQuestion + 1
      }))
    }

    //+1 dans le score
    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer

    if (this.state.userAnswer === goodAnswer) {
      this.setState(prevState => ({
        score: prevState.score + 1
      }))

      this.showSuccessMsg()

    }
    else {
      this.showErrorMsg()

    }
  }

  getPercent = (maxQuestion, ourScore) => (ourScore / maxQuestion) * 100

  gameOver = gradePercent => {

    if (gradePercent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: gradePercent
      })
    } else {

      this.setState({
        percent: gradePercent
      })

    }
  }

  loadLavelQuestion = param => {

    this.setState({ ...initialState, quizLevel: param })

    this.loadQuestions(levelNames[param])

  }
  render() {

    const {
            quizLevel,
            maxQuestions,
            storedQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            showWelcomeMsg,
            quizEnd,
            percent

          } = this.state

    const displayOptions = options.map((option, index) => {
      return <p
        onClick={() => this.submitAnswer(option)}
        key={index}
        className={`answerOptions ${userAnswer === option && "selected"}`}>
        <FaChevronRight />
        {option}</p>
    })

    return this.state.quizEnd ? (<QuizOver
      ref={this.storedDataRef}
      leveNames={levelNames}
      score={score}
      maxQuestion={maxQuestions}
      quizLevel={quizLevel}
      percent={percent}
      loadLavelQuestion={this.loadLavelQuestion}
    />) :

      (
        <Fragment>
          <Levels
            levelNames={levelNames}
            quizLevel={quizLevel}
          />
          <ProgressBar
            idQuestion={idQuestion}
            maxQuestions={maxQuestions}
          />
          <h2>{question}</h2>
          {displayOptions}
          <button
            onClick={this.nextQuestion}
            disabled={btnDisabled ? true : false} className='btnSubmit'>{idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}</button>
          <ToastContainer />
        </Fragment>
      )
  }

}

export default Quiz