import React from 'react';
 import image from './ollopa-icon.png'
 import img from './binicon.png'
 import './Popup.css';
import { useState } from 'react';
 

const Popup = () => {
   
  // const [isChecked, setIsChecked]=useState(false)

  // const profiles = [
  //   { name: "omer levy", jobTitle: "web developer", linkedin: "www.linkedin.com" },
  //   { name: "nati arbiv", jobTitle: "backend developer", linkedin: "www.linkedin.com" },
  //   { name: "omer liraz", jobTitle: "fullstack developer", linkedin: "www.linkedin.com" },
  //   { name: "asaf axelrose", jobTitle: "english developer", linkedin: "www.linkedin.com" },
  // ];


  // const profileList = profiles.map((profile, index) => (
  //   <div key={index}>
  //     <input type="checkbox" checked={isChecked} onChange={(e)=>setIsChecked(e.target.checked)} class="default:ring-2 ..." id={profile.name} />
  //     <label htmlFor={profile.name}>{profile.name} <br/> {profile.jobTitle} <br/> {profile.linkedin}<br/><hr/></label>
  //   </div>
  // ));
  
  const [profiles, setProfiles] = useState([
    { name: "omer levy", jobTitle: "web developer", linkedin: "www.linkedin.com", checked: false },
    { name: "nati arbiv", jobTitle: "backend developer", linkedin: "www.linkedin.com", checked: false },
    { name: "omer liraz", jobTitle: "fullstack developer", linkedin: "www.linkedin.com", checked: false },
    { name: "asaf axelrose", jobTitle: "english developer", linkedin: "www.linkedin.com", checked: false },
  ]);

  const handleCheckboxChange = (index) => {
    const newProfiles = [...profiles];
    newProfiles[index].checked = !newProfiles[index].checked;
    setProfiles(newProfiles);
  };

  const profileList = profiles.map((profile, index) => (
    <div key={index}>
      <input
        type="checkbox"
        checked={profile.checked}
        onChange={() => handleCheckboxChange(index)}
        class="default:ring-2 ..."
        id={profile.name}
      />
      <label htmlFor={profile.name}>
        {profile.name} <br />
        {profile.jobTitle} <br />
        {profile.linkedin}
        <br />
        {/* <hr /> */}
      </label>
    </div>
  ));



  return (


    <div className="App">

     <div id='img-logo-div'>
      <img id='img-logo-icon' src={img} alt="binoculars" />
      <img id='img-logo-txt' src={image}alt="Ollopa.com"/>
     </div>
     
    
    
     <div id='Part2nd'>

       <div id='box-name'>
        {profileList} 
       </div>

     </div>
     


    </div>
  );
};

export default Popup;
