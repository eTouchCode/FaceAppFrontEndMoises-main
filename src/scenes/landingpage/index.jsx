import React from 'react';
import './FullPageImage.css'; 
import fullPageImage from './Landing11.png';

const LandingPage = () => {
  return (
    <div  style={{width:'100vh',backgroundColor:'#87CEEB', height:'100vh'}}>
      <img src={fullPageImage} alt=""  width='95%' height='830px' />
    </div>
  );
};

export default LandingPage;

