import React, { Component } from 'react';
import mySocket from "socket.io-client";
import '../css/Stickers.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
		}
	}
	
	componentDidMount(){
		
	}

  render() {
	 
    return (
      <div className='allStick'>
		<h1>Welcome to the Sticker Page!</h1>
		<h2>Enter a Room to Begin</h2>
		<div className="stkNavBtns">
		<button onClick={this.props.changePage.bind(this,"room1")}>Room 1</button>
		<button onClick={this.props.changePage.bind(this,"room2")}>Room 2</button>
      </div>
	</div>
    );
  }
}

export default App;
