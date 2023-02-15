import React from 'react';
 import image from './ollopa-icon.png'
 import img from './binicon.png'
 import './Popup.css';
import { useState } from 'react';



const Popup = () => {
  const [profiles, setProfiles] = useState([
    { name: 'omer levy', jobTitle: 'web developer', linkedin: 'www.linkedin.com', checked: false },
    { name: 'nati arbiv', jobTitle: 'backend developer', linkedin: 'www.linkedin.com', checked: false },
    { name: 'omer liraz', jobTitle: 'fullstack developer', linkedin: 'www.linkedin.com', checked: false },
    { name: 'asaf axelrose', jobTitle: 'english developer', linkedin: 'www.linkedin.com', checked: false },
  ]);
  const [selectAll, setSelectAll] = useState(false);
// const [indeterminate,setIndeterminate]= useState(false);
  const handleCheckboxChange = (index) => {
    const newProfiles = [...profiles];
    newProfiles[index].checked = !newProfiles[index].checked;
    setProfiles([...newProfiles]);
  };

  // const handleSelectAllChange = (event) => {
  //   const newProfiles = profiles.map((profile) => ({
  //     ...profile,
  //     checked: event.target.checked,
  //   }));
  //   setProfiles(newProfiles);
  //   setSelectAll(event.target.checked);
  // };

  const handleSelectAllChange = (event) => {
    const newProfiles = profiles.map((profile) => ({
      ...profile,
      checked: event.target.checked,
    }));
    setProfiles(newProfiles);
    
    const allChecked = newProfiles.every((profile) => profile.checked);
    const someChecked = newProfiles.some((profile) => profile.checked);
    setSelectAll(allChecked);
    if (!allChecked && someChecked) {
      event.target.indeterminate = true;
    } else {
      event.target.indeterminate = false;
    }
  };

  const checkedProfiles = profiles.filter((profile) => profile.checked && profile.name !== "Select All");
  const count = checkedProfiles.length;

  const profileList = profiles.map((profile, index) => (
    <div key={index}>
      <input
        type="checkbox"
         checked={profile.checked}
        onChange={() => handleCheckboxChange(index)}
        className="default:ring-2 ..."
        id={profile.name}
        // indeterminate={!selectAll && count > 0}
        
      />
      <label htmlFor={profile.name}>
        {profile.name} <br />
        {profile.jobTitle} <br />
        {profile.linkedin}
        <br />
      </label>
    </div>
  ));

  const shouldShowButton = profiles.some((profile) => profile.checked);

  return (
    <div className="App">
      <div id="img-logo-div">
        <img id="img-logo-icon" src={img} alt="binoculars" />
        <img id="img-logo-txt" src={image} alt="Ollopa.com" />
      </div>

      <div id="Part2nd">

        <div id="box-name">

          <div>

            <input type="checkbox"  checked={selectAll} onChange={handleSelectAllChange} id="select-all" />
            <label id="all-select" htmlFor="select-all">
              Select All
            </label>

          </div>
          {profileList}
        </div>

        {shouldShowButton && (
          <div id="button-placement">
            <button id="button">Export<br/>{count > 0 && `${count} selected to`}<br/>Outreach</button>
          </div>
        )}

{shouldShowButton && (
          <div id="button-placement2">
            <button id="button2">Download<br/>{count > 0 && `${count} selected`}<br/>information</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;