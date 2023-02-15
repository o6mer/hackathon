import React from 'react';
 import image from './ollopa-icon.png'
 import img from './binicon.png'
 import './Popup.css';

const Popup = () => {


  return (


    <div className="App">

     <div id='img-logo-div'>
      <img id='img-logo-icon' src={img} alt="binoculars" />
      <img id='img-logo-txt' src={image}alt="Ollopa.com"/>
     </div>
     


    </div>
  );
};

export default Popup;
