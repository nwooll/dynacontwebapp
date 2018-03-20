import React, { Component } from 'react';
import layer1 from '../imgs/bg2-02.png';
import layer2 from '../imgs/bg1-01.png';
import '../css/Chat.css';
import mySocket from 'socket.io-client';

class Chat extends Component {
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
        }
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
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
	  
      var bgChange = "";
      
      if(this.state.bgPos === true){
          bgChange = " bg-layer-active";
      }
      
      var config = null;
      
      if(this.state.mode === 0){
          config = (
			<div className='allChat'>
			<h1>Welcome to the Chat Page!</h1>
			<h2>Enter You Name to Begin</h2>  
            <div className='joinCont'>
            <input type="text" placeholder="Type Username" className='userNameInput'onChange={this.handleUsername}/>
            <button onClick={this.joinChat} className='joinBtn'>Join Chat</button>
        </div>
		</div>
      ) 
      
      } else if(this.state.mode === 1){
          var allChats = this.state.allChat.map((obj,i)=>{
              return(
              <div key={i}>
              <div className='msgs'>{obj}</div>
              </div>
              )
          });
          config = (
          <div className="chatBox" className={"chatBarHidden" + chatBarShow}>
              
              <div className="controls" >
              <button onClick={this.sendChat} className="chatBtn">send chat</button>
              <input  className="msginput" type='text' placeholder='type your msg' onChange={this.handleMyMsg} />
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
	  
    return (
        <div>
		
        <div>
        {config}
        </div>
        
        <div>
        <div>
        
        <div className='nameAll'>
        <div className='nameCont' className={"nameCont" + nameContShow}>
        <h1>Chat Users</h1>
        <div className='name'>
        <h2>{allUsers}</h2>
        </div>
        </div>
        </div>
        
        <div className='layer1' className={"bg-layer" + bgChange}>
        <img src={layer1}/>
        <img src={layer2}/>
        </div>
        
        <div className='chatDisplay' className= {"chatBoxHidden" + chatBoxShow}>
        <h3>{allChats}</h3>
        </div>
        
          </div>
        </div>
      </div>
    );

  }
}

export default Chat;
