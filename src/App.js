import React, { Component } from 'react';
import layer1 from './imgs/layer1.png';
import layer2 from './imgs/layer2.png';
import './App.css';
import mySocket from 'socket.io-client';

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
            chatBar: false
        }
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
    }
    
    componentDidMount(){
        //this.socket =mySocket("http://localhost:10001");
    }
    
    joinChat(){
        this.setState({
            mode:1,
            bgPos: true,
            chatDisp: true,
            chatBar: true
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
    
  render() {
      
       var chatBarShow = "";
      
      if(this.state.chatBar === true){
          chatBarShow = " chatBarShow";
      }
      
      var chatBoxShow = "";
      
      if(this.state.chatDisp === true){
          chatBoxShow = " chatBoxShow";
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
            <button onClick={this.joinChat} id='joinBtn'> Join Chat</button>
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
    
    return (
        <div>
        
        <div id="chatBox" >
        {config}
        </div>
        
        <div>
        <div>
        
        <div id='nameAll'>
        <div id='nameCont' className="nameCont">
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
