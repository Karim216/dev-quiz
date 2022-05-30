import React from 'react'

const ProgressBar = props => {

  const getWidth = (totalQuestion, questionId) => {
    return (100 / totalQuestion) * questionId
  }

  const ActualQuestion = props.idQuestion + 1 

  const progressPercent = getWidth(props.maxQuestions, ActualQuestion)

  return (
      <>
        <div className='percentage'>
            <div className="progressPercent">{`Question: ${ActualQuestion}/${props.maxQuestions}`}</div>
            <div className="progressPercent">{`Progression: ${progressPercent}%`}</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
        </div>
      </>
    
  )
}

export default React.memo(ProgressBar)