import React, { Component } from 'react';
import layer1 from './imgs/layer1.png';
import layer2 from './imgs/layer2.png';
import './App.css';
import mySocket from 'socket.io-client';
import Rooms from './comp/Rooms';

class App extends Component {
    constructor(props){
        super(props);
        
        this.state = {    
            mode:0,
            username: "",
            users: [],
            allChat:[],
            myMsg:"",
            bgPos: false,
            chatDisp: false,
            chatBar: false,
			nameCont : false,
			sBtnCont: false,
			sPage: false,
			
			myImg:require("./imgs/hair.gif"),
			myImg2:require("./imgs/1.gif"),
			allUsers:[],
			myId: null,
			showDisplay:false,
			stickers:[]
        }
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
		this.showStickerPage = this.showStickerPage.bind(this);
		
		this.handleImage = this.handleImage.bind(this);
		this.changePage = this.changePage.bind(this);
    }
    
    componentDidMount(){
		
	}
    
	
	
    joinChat(){
        this.setState({
            mode:1,
			sPage: false,
            bgPos: true,
            chatDisp: true,
            chatBar: true,
			nameCont: true,
			sBtnCont: true
        })
        this.socket = mySocket("https://dynacontsocket.herokuapp.com/");
        this.socket.emit("username", this.state.username);
        
        this.socket.on("usersjoined", (data)=>{
           console.log(data);
            this.setState({
                users:data
            })
            
        });
        
        this.socket.on("msgsent", (data)=>{
            this.setState({
                allChat:data
            })
        })
    }
    
    handleMyMsg(evt){
        this.setState({
            myMsg:evt.target.value
        })
    }
    
    handleUsername(evt){
        this.setState({
            username:evt.target.value
        })
    }
    
    sendChat(){
        var msg = this.state.username+": "+this.state.myMsg;
        this.socket.emit("sendChat", msg);
        
    }
	
	showStickerPage(){
		this.setState({
			sPage: true,
			 bgPos: false,
            chatDisp: false,
            chatBar: false,
			nameCont: false,
			sBtnCont: false,
			mode: 0
			
		})
		
		this.socket = mySocket("http://localhost:10001");
		
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
      
      var chatBarShow = "";
      
      if(this.state.chatBar === true){
          chatBarShow = " chatBarShow";
      }
      
      var chatBoxShow = "";
      
      if(this.state.chatDisp === true){
          chatBoxShow = " chatBoxShow";
      }
	  
	  var nameContShow = "";
	  
	  if(this.state.nameCont === true){
		  nameContShow = " nameContShow";
	  }
	  
	  var stickerRoomsShow = "";
	  
	  if(this.state.sBtnCont === true){
		  stickerRoomsShow = " stickerRoomsShow";
	  }
      
	  var stickerPageShow = "";
	  
	  if(this.state.sPage === true){
		  stickerPageShow = " stickerPageShow";
	  }
	  
      var bgChange = "";
      
      if(this.state.bgPos === true){
          bgChange = " bg-layer-active";
      }
      
      var config = null;
      
      if(this.state.mode === 0){
          config = (
            <div id='joinCont'>
            <input type="text" placeholder="Type Username" id='userNameInput'onChange={this.handleUsername}/>
<<<<<<< HEAD
            <button onClick={this.joinChat} id='joinBtn'>Join Chat</button>
=======
            <button onClick={this.joinChat} id='joinBtn'> Join Chat</button>
>>>>>>> origin/master
        </div>
      ) 
      
      } else if(this.state.mode === 1){
          var allChats = this.state.allChat.map((obj,i)=>{
              return(
              <div key={i}>
              <div id='msgs'>{obj}</div>
              </div>
              )
          });
          config = (
          <div id="chatBox" className={"chatBarHidden" + chatBarShow}>
              
              <div id="controls" >
              <button onClick={this.sendChat} className="chatBtn">send chat</button>
              <input  id="msginput" type='text' placeholder='type your msg' onChange={this.handleMyMsg} />
              </div>
              </div>
          )
      }
      
    var allUsers = this.state.users.map((obj,i)=>{
        return (
            <div key={i}>
            {obj}
            </div>
        )
    })  
	
	
//newSHIT
	
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
        <div>
        
<<<<<<< HEAD
		<div id="stickerPage" className={"stickerPage" + stickerPageShow}>
		{comp}
		</div>
		
=======
>>>>>>> origin/master
        <div id="chatBox" >
        {config}
        </div>
        
        <div>
        <div>
        
        <div id='nameAll'>
<<<<<<< HEAD
        <div id='nameCont' className={"nameCont" + nameContShow}>
=======
        <div id='nameCont' className="nameCont">
>>>>>>> origin/master
        <h1>Chatroom Users</h1>
        <hr />
        <div id='name' className='name'>
        <h2>{allUsers}</h2>
        </div>
        </div>
        </div>
        
        <div id='layer1' className={"bg-layer" + bgChange}>
        <img src={layer1}/>
        <img src={layer2}/>
        </div>
        
        <div id='chatDisplay' className= {"chatBoxHidden" + chatBoxShow}>
        <h3>{allChats}</h3>
        </div>
        
		
		<div id='stickerRooms' className={"stickerRooms" + stickerRoomsShow}>
		
		<button onClick={this.showStickerPage}>Sticker Time</button>
		
		</div>
		
		
		
		
		
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
        </div>
      </div>
    );

  }
}

export default App;
