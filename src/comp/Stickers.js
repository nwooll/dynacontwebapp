import React, { Component } from 'react';
import mySocket from "socket.io-client";
import Rooms from './Rooms';
import '../css/Stickers.css';

class Stickers extends Component {
	constructor(props){
		super(props);
		this.state={
			myImg:require("../imgs/tucan.png"),
			myImg2:require("../imgs/palmtree.png"),
			allUsers:[],
			myId: null,
			showDisplay:false,
			stickers:[]
		}
		
		this.handleImage = this.handleImage.bind(this);
		this.changePage = this.changePage.bind(this);
	}
	
	componentDidMount(){
		this.socket = mySocket("https://dynacontsocket.herokuapp.com/");
		
		this.socket.on("createimage", (data)=>{
			this.setState({
				allUsers:data
			});
			
			this.refs.thedisplay.addEventListener("mousemove", (ev)=>{
		
			if(this.state.myId == null){
				return false;
			}
			this.refs["u"+this.state.myId].style.left = ev.pageX+"px";
			this.refs["u"+this.state.myId].style.top = ev.pageY+"px";
			
			this.socket.emit("mymove", {
				x:ev.pageX,
				y:ev.pageY,
				id:this.state.myId,
				img:this.refs["u"+this.state.myId].src
			});
		});
			this.refs.thedisplay.addEventListener("click", (ev)=>{
				this.socket.emit("sticker",{
					x:ev.pageX,
					y:ev.pageY,
					id:this.state.myId,
					src:this.refs["u"+this.state.myId].src
				})
			})
		});
		
		
		this.socket.on("newsticker", (data)=>{
		this.setState({
			stickers:data
		})	
		});
		
		
		this.socket.on("yourid", (data)=>{
			this.setState({
				myId:data
			})
		});
		
		
		this.socket.on("usermove", (data)=>{
			this.refs["u"+data.id].style.top = data.y+"px";
			this.refs["u"+data.id].style.left = data.x+"px";
			this.refs["u"+data.id].src = data.img;
		});
		
	
	}
	
	handleImage(evt){
		this.refs["u"+this.state.myId].src = evt.target.src;
	}
	
	changePage(roomString){
			this.setState({
				showDisplay:true
			});
		
		this.socket.emit("joinroom", roomString);
	}
	
	
  render() {
	  
	  var allimages = this.state.allUsers.map((obj,i)=>{
		  return (
		  	<img ref={"u"+obj} key={i} className="allImgs" src={this.state.myImg} height={80}/>
		  )
	  })
	  
	  var stickers = this.state.stickers.map((obj,i)=>{
		  
		  var mstyle = {left:obj.x, top:obj.y}
		  return (
			  
			  <img className="allImgs" style={mstyle} src={obj.src} key={i} height={80}/>
		  )
	  })
	  var comp = null;
	  
	  if(this.state.showDisplay === false){
		  comp = <Rooms 
		  changePage={this.changePage}
		  />
	  }else{
		 comp = (
		  <div>
		  <div ref="thedisplay" >
				{allimages}
			   	{stickers}
		</div>
		<div className='stkPick'>
			<h1>Pick a Sticker!</h1>
			 <div className='stkPickStk'>
			<img src={this.state.myImg} onClick={this.handleImage} height={50}/>
			<img src={this.state.myImg2} onClick={this.handleImage} height={50}/>
			 
			 
			 <div>
			 <h2>Your User ID</h2>
			{this.state.myId}
			 </div>
			 
			 
			 </div>
		   </div>
		 </div>
			   );
	  }
    return (
      <div className="App">
			{comp}
      </div>
    );
  }
}

export default Stickers;
