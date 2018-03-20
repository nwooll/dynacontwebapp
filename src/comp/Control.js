import React, { Component } from 'react';
import LogoR from '../imgs/R.png';
import '../css/App.css';

class Control extends Component {
    constructor(props){
        super(props);
        
		this.changeHome = this.changeHome.bind(this);
        this.changePage4 = this.changePage4.bind(this);
        this.changePage3 = this.changePage3.bind(this);
        this.changePage2 = this.changePage2.bind(this);
        this.changePage1 = this.changePage1.bind(this);
        
    }
	
	changeHome(){
		this.props.changeHome(true);
	}
	
    changePage1(){
        this.props.changePage1(true);
        
    }
    changePage2(){
        this.props.changePage2(true);
        
	}
	changePage3(){
        this.props.changePage3(true);
        
    }
	changePage4(){
        this.props.changePage4(true);
        
    }
    
  render() {
    return (
		<div className='all'>
        <div className='navHome'>
		<button onClick = {this.changeHome}>
		<img src={LogoR} className='logoR'/>
		</button>
		</div>
		
      	<div className='navBtns'>
        <button onClick = {this.changePage1}> Chat </button>
        <button onClick = {this.changePage2}> Stickers </button>
        <button onClick = {this.changePage3}> Quiz </button>
		<button onClick = {this.changePage4}> Comment </button>
		</div>
		
		</div>
        
    );
  }
}

export default Control;