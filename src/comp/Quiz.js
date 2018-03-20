import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import '../css/Quiz.css';

class Quiz extends Component {
 constructor(props){
		super(props);
		this.state={
			stage:0,
			host:null,
			qobj:{q:null, o1:null, o2:null}
		}
//		this.handleStage = this.handleStage.bind(this);
	}
	

	componentDidMount(){
		this.socket = mySocket("https://dynacontsocket.herokuapp.com/");
		this.socket.on("newq", (data)=>{
			this.setState({
				qobj:data	
			})
			
		});
		
		this.socket.on("result", (data)=>{
			alert(data);
		})
	}
	
	handleStage = (num,roomStr)=>{
		this.setState({
			stage:num
		});
		
		this.socket.emit("joinroom", roomStr);
	}
		
	
	handlePlayers = (isHost) =>{
		this.setState({
			host:isHost,
			stage:2
		})
	}
	
	handleQuestion = () =>{
		var obj = {
			q:this.refs.q.value,
			o1:this.refs.o1.value,
			o2:this.refs.o2.value,
			a:this.refs.a.value
		};
		
		this.socket.emit("qsubmit", obj);
		
		this.refs.q.value = "";
		this.refs.o1.value = "";
		this.refs.o2.value = "";
	}
	
	handleAnswer = (num) =>{
		this.socket.emit("answer", num);
	};

  render() {
	 var comp2 = null;
	  
	  
	  if(this.state.stage === 0){
	  comp2 = (
	  	<div className='qaAll'>
		  <h1>Welcome to the Quiz Page!</h1>
			<h2>Enter a Room to Begin</h2>
		  	<div className="qaNavBtns">
			<button onClick={this.handleStage.bind(this, 1, "room1")}>Room 1</button>
			<button onClick={this.handleStage.bind(this, 1, "room2")}>Room 2</button>
			</div>
		</div>
		  
	  );
	  }else if(this.state.stage ===  1){
		  comp2 = (
	  	<div className='qaAll'>
			<h1>Would You Like to Ask or Answer Questions?</h1>
			<div className="qaNavBtns">
			<button onClick={this.handlePlayers.bind(this, true)}>Ask</button>
			<button onClick={this.handlePlayers.bind(this, false)}>Answer</button>
			</div>
		</div>
		  
	  );
		}
	  else if(this.state.stage === 2){
		  if(this.state.host ===true){
			  comp2 = (
	  	<div className='qaAll'>
		 <h1>Type a Question Then Enter One Right Answer and One Wrong Answer</h1>
			<input  className='qaInput' ref="q" type="text" placeholder="Your Question" />
			<input className='qaInput' ref="o1" type="text" placeholder="Possible Answer 1" />
			<input className='qaInput' ref="o2" type="text" placeholder="Possible Answer 2" />
		<h2>Now Select Which Answer is Correct</h2>
			<select ref="a">
				  <option className='option' value="1">Answer 1</option>
				  <option className='option' value="2">Answer 2</option>
			</select>
			<button onClick={this.handleQuestion}>Submit Question</button>
		</div>  
	  );
		  }
		  else if(this.state.host === false){
			  comp2 = (
	  	<div className='qaAll'>
			<h1><div>{this.state.qobj.q}</div></h1>
		<div className='buttonAns'>
			<button onClick = {this.handleAnswer.bind(this, "1")}>{this.state.qobj.o1}</button>
			<button onClick = {this.handleAnswer.bind(this, "2")}>{this.state.qobj.o2}</button>
			</div>
		</div>
		  
	  );
		  }
	  }
	  
	  
    return (
      <div>
		{comp2}
      </div>
    );
  }
}


export default Quiz;