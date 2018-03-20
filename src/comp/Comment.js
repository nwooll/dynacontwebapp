import React, { Component } from 'react';
import mySocket from 'socket.io-client';
import postcard from '../imgs/postcard.jpg';
import '../css/Comment.css';

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
      <div className='commAll'>
		
		<h1>Add Something to The Postcard!</h1>
		
        <div className='commentCont'>
        <div className='comments'>
		
		<div className='h1Post'>
		<h1>Rainforest Postcard</h1>
		</div>
		
		<div className='thecomments'>
        <h2>{allComments}</h2>
		</div>
		
        </div>
		
		<img src={postcard} className='imgPost'/>
		</div>
		
		<div className='addComment'>
            <textarea type="text" placeholder="type your post" id='commentInput'onChange={this.handleComment} className='postInput'/>
            <button onClick={this.addComment} className='addBtn'>add post</button>
        	</div>
      </div>
    );

  }
}

export default Comment;