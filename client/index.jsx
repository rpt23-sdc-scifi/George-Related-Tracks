import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RelatedTracks from './relatedData.jsx';
import '../public/styles/styles.css';

ReactDOM.render(React.createElement(RelatedTracks, null, null), document.getElementById('related'));