import React, { Component } from 'react';
import '../App.css';
import mySocket from "socket.io-client";
import Rooms from './Rooms';

class Stickers extends Component {
	constructor(props){
		super(props);
		this.state={
			myImg:require("../imgs/1.png"),
			myImg2:require("../imgs/2.png"),
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
			console.log("user has moved");
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
		  	<img ref={"u"+obj} key={i} height={150} className="allImgs" src={this.state.myImg} />
		  )
	  })
	  
	  var stickers = this.state.stickers.map((obj,i)=>{
		  
		  var mstyle = {left:obj.x, top:obj.y}
		  return (
			  
			  <img className="allImgs" style={mstyle} src={obj.src} key={i} height = {50} />
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
		  <div ref="thedisplay" className="div1">
				{allimages}
			   	{stickers}
		</div>
		<div className="div2">
			{this.state.myId}
			<img src={this.state.myImg} height={50} onClick={this.handleImage} />
			<img src={this.state.myImg2} height={50} onClick={this.handleImage} />
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
