import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import './css/Comment.css';

class Comment extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            comment: "",
			comments: [],
            allComments: []
        }
        this.addComment = this.addComment.bind(this);
        this.handleComment = this.handleComment.bind(this);
    }
    
    addComment(){
        this.socket = mySocket("https://dynacontsocket.herokuapp.com/");
        this.socket.emit("comment", this.state.comment);
        
        this.socket.on("commentsjoined", (data)=>{
            this.setState({
                comments:data
            })
            
        });
    }
	
    handleComment(evt){
        this.setState({
            comment:evt.target.value
        })
    }
    
  render() {
	  
	 var allComments = this.state.comments.map((obj,i)=>{
        return (
            <div key={i}>
            {obj}
            </div>
        )
    })
	  
	  
    return (
      <div>
		<div className='theImg'>
		</div>
        <div>
       what do you think about this photo?
		</div>
		
        <div className='commentCont'>
        <div className='comments'>
        {allComments}
        </div>
		</div>
		
		<div className='addComment'>
            <input type="text" placeholder="Type comment" id='commentInput'onChange={this.handleComment}/>
            <button onClick={this.addComment}>add comment</button>
        </div>
      </div>
    );

  }
}

export default Comment;