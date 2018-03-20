import React, { Component } from 'react';
import mySocket from "socket.io-client";

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
      <div className="App">
		<button onClick={this.props.changePage.bind(this,"room1")}>Room 1</button>
		<button onClick={this.props.changePage.bind(this,"room2")}>Room 2</button>
      </div>
    );
  }
}

export default App;
