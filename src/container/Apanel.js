import React from 'react'
import './answer.css'
const Apanel = (props) => {
  function handleAnswerClick(id,pt){
      props.handleClick(id,pt);
  }

  if (props.content.answers) {
  	return (
  		<div className="apanel">
          	{	
            	props.content.answers.map(a=> {
            		return (<button className="answer" key={a.id} onClick={handleAnswerClick.bind(this,props.content.id,a.point)}>{a.answer}</button>)
            	})
      		}
      	</div>
    );
  } else {
  	return null;
  }
};

export default Apanel