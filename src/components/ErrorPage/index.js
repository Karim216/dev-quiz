import React from 'react'
import batman from '../../images/batman.png'

const centerH2 = {
  textAlign: "center",
  marginTop: "50px"
}

const ErrorPage = () => {
  return (
    <div className='quiz-bg'>
        <div className="container">
          <h2 style={centerH2}>Oups cette page n'existe pas!!!</h2>
          <img src={batman} alt="Error page" />
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora saepe quia voluptate magni ducimus quis nesciunt quibusdam, modi odio expedita voluptatum eaque reiciendis voluptatem porro, dolor in quaerat obcaecati tenetur. Rem dolor velit accusamus explicabo tempore iste, alias provident nisi unde commodi numquam cumque eveniet recusandae sint distinctio exercitationem consequuntur blanditiis facere delectus. Ad voluptatibus error rerum minus corrupti blanditiis beatae laudantium neque commodi, aliquid natus tempore nesciunt id, hic vero praesentium impedit repellendus quae perferendis a iste, sapiente eos qui dignissimos. Asperiores sed voluptatibus exercitationem harum! Asperiores molestias possimus placeat, reiciendis praesentium optio numquam, fuga, atque modi dolor iusto.</p>
        </div>
    </div>
  )
}

export default ErrorPage