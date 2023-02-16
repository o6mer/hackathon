import React, { useEffect } from "react";
import image from "./ollopa-icon.png";
import img from "./binicon.png";
import "./Popup.css";
import { useState } from "react";


const Popup = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async function (
      request,
      sender,
      sendResponse
    ){
      console.log(request);
      setProfiles([...request.data.selectableProfiles]);
      sendResponse({ message: "success" });
      sendResponse({ sup: "supp" });
    });
  }, []);

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

  const checkedProfiles = profiles.filter(
    (profile) => profile.checked && profile.name !== "Select All"
  );
  const count = checkedProfiles.length;
  // !selectAll && count > 0 ? handleSelectAllChange=indeterminate : null

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
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              id="select-all"
            />
            <label id="all-select" htmlFor="select-all">
              Select All
            </label>
          </div>
          {profiles.map((profile, index) => (
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
                {profile.title} <br />
                <a href={profile.link}>Linkedin</a>
                <br />
              </label>
            </div>
          ))}
        </div>

        {shouldShowButton && (
          <div id="button-placement">
            <button id="button">
              Export
              <br />
              {count > 0 && `${count} selected to`}
              <br />
              Outreach
            </button>
          </div>
        )}

        {shouldShowButton && (
          <div id="button-placement2">
            <button id="button2">
              Download
              <br />
              {count > 0 && `${count} selected`}
              <br />
              information
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
