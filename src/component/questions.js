import React, {Component} from 'react'
import Qpanel from '../container/Qpanel'
import Apanel from '../container/Apanel'
import "./question.css"
import axios from 'axios'
class Questions extends Component{
	constructor(props){
		super(props)
		this.state={
			id:1,
			questions:[],
			question:{},
			finished:false,
			points:[],
			score:1,

		}
		this.answerClick=this.answerClick.bind(this)
		this.goback=this.goback.bind(this);

	}
	componentDidMount(){
		axios.get('questions.json').then(
			res=>{		
				this.setState({questions:res.data},()=>this.findContent())
			})
		
	}

	goback(){
		if(this.state.id<2) {return null}
		else {this.setState({id:this.state.id-1},()=>this.findContent())}
	}
	answerClick(ans_id,ans_point){
		
		
			let m=this.state.points.find(obj=>obj.ans_id===ans_id)
			if(!m){
				m={ans_id,ans_point}
				this.setState({id:this.state.id+1, points:[...this.state.points,m]},()=>this.findContent())
			}
			else{
				let array=this.state.points.slice()
				array[array.indexOf(m)].ans_point=ans_point;
				this.setState({id:this.state.id+1, points:array},()=>this.findContent())
			}
			if(this.state.id>=this.state.questions.length){this.setState({finished:true},()=>this.totalScores())}
		
	}
	totalScores(){
		let score=0
		this.state.points.forEach(ans=>score+=ans.ans_point)
		this.setState({score:score})
	}
	findContent(){
		const {id,questions}=this.state;
		const content=questions.find(obj=>obj.id===id)
		this.setState({question:content})
	}
	render(){
		if(this.state.finished===true) return(<div className="score">
			Congratulations! 
			you finished the quiz.
			<div className='result'>your score: {this.state.score}</div>
			</div>)
		return(
			<div className="content">
				<div className="prev" onClick={this.goback}>go back</div>
				<Qpanel question={this.state.questions} id={this.state.id}></Qpanel>
				<Apanel handleClick={this.answerClick} id={this.state.id} content={this.state.question}/>

			</div>
		)
	}
}

export default Questions;