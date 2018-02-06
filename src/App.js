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
        this.socket = mySocket("http://localhost:10001");
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
            <div>
            <input type="text" placeholder="Type Username" id='userNameInput'onChange={this.handleUsername}/>
            <button onClick={this.joinChat}> Join Chat</button>

        </div>
      ) 
      
      } else if(this.state.mode === 1){
          var allChats = this.state.allChat.map((obj,i)=>{
              return(
              <div key={i}>
              {obj}
              </div>
              )
          });
          config = (
          <div id="chatBox" className={"chatBarHidden" + chatBarShow}>
              
              <div id="controls" >
              <input type='text' placeholder='type your msg' onChange={this.handleMyMsg} />
              <button onClick={this.sendChat} className="chatBtn">send chat</button>
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
        
        
        <div id='nameCont' className="nameCont">
        Users in the chatroom right now!
        <hr />
        <div id='name' className='name'>
        {allUsers}
        </div>
        </div>
        
        <div id='layer1' className={"bg-layer" + bgChange}>
            
            
        <img src={layer1}/>
        <img src={layer2}/>
 <div id='chatDisplay' className= {"chatBoxHidden" + chatBoxShow}>
              {allChats}
              </div>
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
