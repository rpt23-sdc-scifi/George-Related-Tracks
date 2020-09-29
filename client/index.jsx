import React from 'react';
import ReactDOM from 'react-dom';

class RelatedTracks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSong: 1,
      related: []
    }
  }

  render() {
    let plays = [<span>&#9658;</span>, ` 4`];
    let likes = [<span>&#9829;</span>, ` 6`];
    let reposts = [<span>&#10226;</span>, ` 2`];
    let comments = [<span>&#128488;</span>, ` 3`];
    return (
      <>
        <img className="nicholas related-tracks band" src="https://i1.sndcdn.com/avatars-000153260008-nj3jj1-t200x200.jpg"/>
        <p>LionsBesideUs</p>
        <p>Last Chance</p>
        <p>{plays}</p>
        <p>{likes}</p>
        <p>{reposts}</p>
        <p>{comments}</p>
      </>
    )
  }
}

ReactDOM.render(<RelatedTracks />, document.getElementById('related'));