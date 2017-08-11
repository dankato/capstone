import React from 'react';
import style from './style';
import ReplyBox from './ReplyBox';
import {connect} from 'react-redux';
import * as actions from './actions';
const emoji = require('node-emoji');

export class PostList extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.getPosts());
  }

  onDelete(id) {
    console.log('PostList onDelete activated')
    this.props.dispatch(actions.deletePost(id))
  } 

  voteCounter(note) {
    console.log(typeof(note.count));
    // console.log(note.count);
    // this.x.value = 0;
   // this.props.dispatch(actions.increment(parseInt(this.x.value, 10)));
   this.props.dispatch(actions.voteCount(note._id));
  }

 render() {
  // if (this.props.text[0]) {
  this.props.text[0] && console.log('text console>>>>>>>', this.props.text[0]);
   
    let post = this.props.text.map((t) => {
    return (
      <div key={t._id}>
       
        <span>{t.text}</span>
        <span className="comment">
        <button className="vote button" 
        ref={input => this.x = input}
        onClick={() => this.voteCounter(t)} style={style.button}>
        {t.count}{emoji.get('thumbsup')}
        </button>
        {/* <button className="reply">Show Replies</button> */}
        <button className="delete button" onClick={(e) => this.onDelete(t._id)}>Delete</button>
        </span>
        <ReplyBox />
      </div>
    )
  });
  return (
    <div style={style.PostList}>
       {post} 
    </div>
  );

}
}

const mapStateToProps = state => ({
  text: state.text,
  count: state.count
})

export default connect(mapStateToProps)(PostList);