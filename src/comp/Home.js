import React, { Component } from 'react';
import Title from '../imgs/logo_main.png';
import '../css/Home.css';

class Home extends Component {
    
    constructor(props){
        super(props);
    }
    
  render() {
      
    return (
      <div className="all">
   		<img src={Title}/>
      </div>
    );
  }
}

export default Home;