import React, { Component } from 'react';
import Control from "./comp/Control.js";
import Home from "./comp/Home.js";
import Chat from './comp/Chat.js';
import Stickers from './comp/Stickers.js';
import Quiz from './comp/Quiz.js';
import Comment from './comp/Comment.js';
import mySocket from 'socket.io-client';
import './css/App.css';

class App extends Component {
    
    constructor(props){
        super(props);
        
         this.state ={
			showHome: true,
			showPage1: false,
			showPage2: false,
            showPage3: false,
			showPage4: false,
        }
        
		this.changeHome = this.changeHome.bind(this);
		this.changePage4 = this.changePage4.bind(this);
        this.changePage3 = this.changePage3.bind(this);
        this.changePage2 = this.changePage2.bind(this);
        this.changePage1 = this.changePage1.bind(this);
    }
    
	changeHome(show){
        this.setState({
			showHome: show,
            showPage1: false,
            showPage2: false,
			showPage3: false,
			showPage4: false,
        })
    }
	
    changePage1(show){
        this.setState({
			showHome: false,
            showPage1: show,
            showPage2: false,
			showPage3: false,
			showPage4: false,
        })
    }
    
     changePage2(show){
        this.setState({
			showHome: false,
            showPage1: false,
            showPage2: show,
			showPage3: false,
			showPage4: false,
        })
    }
	
	 changePage3(show){
        this.setState({
			showHome: false,
            showPage1: false,
            showPage2: false,
			showPage3: show,
			showPage4: false,
        })
    }
	
	 changePage4(show){
        this.setState({
			showHome: false,
            showPage1: false,
            showPage2: false,
			showPage3: false,
			showPage4: show,
        })
    }
    
  render() {
      
      var mycomp = null;
      if(this.state.showHome === true){
		  mycomp = <Home />
	  }
      else if(this.state.showPage1 === true){
          mycomp = <Chat />      
      }
       else if(this.state.showPage2 === true){
          mycomp = <Stickers />
              
      } else if(this.state.showPage3 === true){
          mycomp = <Quiz />
			  
      } else if(this.state.showPage4 === true){
          mycomp = <Comment />
      };
      
      
    return (
      <div className="App">
        <Control
		changeHome={this.changeHome}
        changePage1={this.changePage1}
        changePage2={this.changePage2}
		changePage3={this.changePage3}
		changePage4={this.changePage4}
        />
        {mycomp}
		
		<div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        <div className='rain'></div>
        </div>
		
      </div>
    );
  }
}

export default App;

