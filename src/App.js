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
			qPage: false,
			
			myImg:require("./imgs/hair.gif"),
			myImg2:require("./imgs/1.gif"),
			allUsers:[],
			myId: null,
			showDisplay:false,
			stickers:[],

			stage:0,
			host:null,
			qobj:{q:null, o1:null, o2:null}
        }
        this.joinChat = this.joinChat.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handleMyMsg = this.handleMyMsg.bind(this);
        this.sendChat = this.sendChat.bind(this);
		this.showStickerPage = this.showStickerPage.bind(this);
		
		this.handleImage = this.handleImage.bind(this);
		this.changePage = this.changePage.bind(this);

		this.showQuizPage = this.showQuizPage.bind(this);
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
			mode: 0,
			
		})

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
			
				console.log(this.refs["u"+this.state.myId].style.left, this.refs["u"+this.state.myId].style.top)
				
				
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

//sticker functions

	handleImage(evt){
		this.refs["u"+this.state.myId].src = evt.target.src;
	}
	
	changePage(roomString){
			this.setState({
				showDisplay:true
			});
		
		this.socket.emit("joinroom", roomString);
	}

	// Quiz functions

	showQuizPage(){
		
		this.setState({
			qPage: true,
			stage: 0,
			sPage: false,
			bgPos: false,
			chatDisp: false,
			chatBar: false,
			nameCont: false,
			sBtnCont: false,
			mode: 0
			
			
		})

		this.socket = mySocket("https://dynacontsocket.herokuapp.com/");
		
		this.socket.on("newq", (data)=>{
			this.setState({
				qobj:data	
			})
			
		});
		
		this.socket.on("result", (data)=>{
			alert(data);
		})
		
	}

	handleStage = (num,roomStr)=>{
		this.setState({
			stage:num
		});
		
		this.socket.emit("joinroom2", roomStr);
	}
		
	
	handlePlayers = (isHost) =>{
		this.setState({
			host:isHost,
			stage:2
		})
	}
	
	handleQuestion = () =>{
		var obj = {
			q:this.refs.q.value,
			o1:this.refs.o1.value,
			o2:this.refs.o2.value,
			a:this.refs.a.value
		};
		
		this.socket.emit("qsubmit", obj);
		
		this.refs.q.value = "";
		this.refs.o1.value = "";
		this.refs.o2.value = "";
	}
	
	handleAnswer = (num) =>{
		this.socket.emit("answer", num);
	};
	
	

	
    
  render() {
	  
	
	// Toggle CSS Classes

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

	  var quizPageShow = "";

	  if(this.state.qPage === true){
		  quizPageShow = " quizPageShow";
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
            <button onClick={this.joinChat} id='joinBtn'>Join Chat</button>
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
		  <div className="div1">
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
	  


	  //NewNew shit

	  var comp2 = null;

	  
	  if(this.state.stage === 0){
		comp2 = (
			<div>
			  <button onClick={this.handleStage.bind(this, 1, "room1")}>Room 1</button>
			  <button onClick={this.handleStage.bind(this, 1, "room2")}>Room 2</button>
		  </div>
			
		);
		}else if(this.state.stage ===  1){
			comp2 = (
			<div>
			  <button onClick={this.handlePlayers.bind(this, true)}>HOST</button>
			  <button onClick={this.handlePlayers.bind(this, false)}>PLAYER</button>
		  </div>
			
		);
		  }
		else if(this.state.stage === 2){
			if(this.state.host ===true){
				comp2 = (
			<div>
			  <input ref="q" type="text" placeholder="Type your question here" />
			  <input ref="o1" type="text" placeholder="Option 1" />
			  <input ref="o2" type="text" placeholder="Option 2" />
			  <select ref="a">
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
			  </select>
			  <button onClick={this.handleQuestion}>Submit Question</button>
		  </div>  
		);
			}
			else if(this.state.host === false){
				comp2 = (
			<div>
			  <div>{this.state.qobj.q}</div>
			  <button onClick = {this.handleAnswer.bind(this, "1")}>{this.state.qobj.o1}</button>
			  <button onClick = {this.handleAnswer.bind(this, "2")}>{this.state.qobj.o2}</button>
		  </div>
			
		);
			}
		}
	  
	 
    
    return (
        <div>
        
		<div ref="thedisplay" id="stickerPage" className={"stickerPage" + stickerPageShow}>
		{comp}
		</div>

		<div id="quizPage" className={"quizPage" + quizPageShow}>
		{comp2}
     	</div>
		
        <div id="chatBox" >
        {config}
        </div>
        
        <div>
        <div>
        
        <div id='nameAll'>
        <div id='nameCont' className={"nameCont" + nameContShow}>
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
		<button onClick={this.showQuizPage}>Quiz Time</button>
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
