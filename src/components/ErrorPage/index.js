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
          <p hidden>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora saepe quia voluptate magni ducimus quis nesciunt quibusdam, modi odio expedita voluptatum eaque reiciendis voluptatem porro, dolor in quaerat obcaecati tenetur. Rem dolor velit accusamus explicabo tempore iste, alias provident nisi unde commodi numquam cumque eveniet recusandae sint distinctio exercitationem consequuntur blanditiis facere delectus. Ad voluptatibus error rerum minus corrupti blanditiis beatae laudantium neque commodi, aliquid natus tempore nesciunt id, hic vero praesentium impedit repellendus quae perferendis a iste, sapiente eos qui dignissimos. Asperiores sed voluptatibus exercitationem harum! Asperiores molestias possimus placeat, reiciendis praesentium optio numquam, fuga, atque modi dolor iusto.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam hic repudiandae officia, beatae, expedita culpa ab vel pariatur temporibus dolorum in quidem veritatis incidunt earum illum iste optio. Ipsa, labore provident? Fugiat repellendus vitae fuga optio cumque reiciendis modi quos quaerat consequatur, corrupti nobis commodi beatae perspiciatis eveniet necessitatibus natus. Deserunt eligendi doloribus accusamus, ab maiores minus reiciendis eum voluptatibus asperiores magni illum officia voluptates eaque ipsam odit nemo delectus harum facere ea nam placeat? Incidunt voluptas laboriosam necessitatibus, exercitationem ipsam, eius labore perspiciatis quibusdam officiis quos eligendi harum natus fugiat fuga illo numquam, ad tempore ullam! Excepturi, magni debitis.</p>
        </div>
    </div>
  )
}

export default ErrorPage