import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";
import { IndeterminateCheckBox } from "@material-ui/icons";



const Education = ({ user: { userInfo, selectedMember } , readOnlyFlow, editUserDetails}) => {
    const [profile, setProfile] = useState({});
  const [openModel, setOpenModel] = useState(false);
  const [modeType, setModeType] = useState('add');
  const handleChange = (event) => {
    setProfile({ ...profile , [event.target.name]: event.target.value, });
  };
  const handleAddModel = (value, mode) => {
    setOpenModel(value);
    setModeType('add');
    setProfile({})
  }
  const handleModelChange = (value, item, index) => {
    const { university,fieldOfStudy, startMonth, startYear, endMonth, endYear
    } = item;
    setProfile({
      updatedUniversity: university, 
      updatedFieldOfStudy: fieldOfStudy, 
      updatedStartMonth: startMonth, 
      updatedStartYear: startYear, 
      updatedEndMonth: endMonth, 
      updatedEndYear: endYear,
      itemIndex : index
  });
  setOpenModel(value);
  setModeType('edit');
 };

  //const handleModelChange = (value) => {
    // setProfile({
    //   updatedFirstName: firstName,
    //   updatedLastName: lastName,
    //   updatedHeadLine: headLine,
    //   updatedLocation,
    //   location,
    // });
    // setOpenModel(value);
  //};
  const handleSubmit = () => {
    const {
        updatedUniversity,
        updatedFieldOfStudy,
        updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear,
        itemIndex
    } = profile;
    const userDetails = {
      university: updatedUniversity !== undefined ? updatedUniversity : '',
      fieldOfStudy: updatedFieldOfStudy !== undefined ? updatedFieldOfStudy : '',
      startMonth: updatedStartMonth !== undefined ? updatedStartMonth : '',
      startYear: updatedStartYear !== undefined ? updatedStartYear : '',
      endMonth: updatedEndMonth !== undefined ? updatedEndMonth : '',
      endYear: updatedEndYear !== undefined ? updatedEndYear : ''
    };
    const tempProfileInfo = [...userInfo.profileInfo];
    const tempInfo = tempProfileInfo.filter(item => item.type === "education");
    if(tempInfo.length > 0) {
        tempProfileInfo.forEach(item => {
            if(item.type === "education") {
              if(modeType==='edit'){
                item.details.splice(itemIndex, 1, userDetails);
              }
                item.details.push(userDetails)
            }
        });
    } else {
        const details = [ { ...userDetails }];
        tempProfileInfo.push({ type : "education", details });
    }
    const request = { ...userInfo, profileInfo : [...tempProfileInfo] };
    editUserDetails(request);
    setOpenModel(false);
  };
  

    let profileDetails = [];
    if(readOnlyFlow && selectedMember && Array.isArray(selectedMember.profileInfo)) {
      const { profileInfo } = selectedMember;
      profileDetails = [
        ...profileInfo
      ]
    } else if( userInfo && userInfo.profileInfo && Array.isArray(userInfo.profileInfo)){
      
      const { profileInfo } = userInfo;
      profileDetails = [
        ...profileInfo
      ]
    }

    const { updatedStartMonth, updatedStartYear, updatedEndMonth, updatedEndYear, updatedUniversity, updatedFieldOfStudy } = profile;
  let educationInfo = (
    <div className="experience__item">
      <p className="experience__subheader__p">No Data exists</p>
    </div>
  );
    let info = [];
    if(profileDetails) {
        info = profileDetails.filter(item => item.type === 'education');
    }
    
    
    
    if(profileDetails && info.length > 0) {
        educationInfo =  info[0].details.map((item,index) => {
            return (
                <div  className="experience__item">
          <div className="experiance__item__body">
                  <h4 className="education__subheader">
                    
                    {item.university}
                    </h4>
                  <p className="education__subheader__p">{item.fieldOfStudy}</p>
                  <p className="education__subheader__p">{`${item.startMonth}  ${item.startYear} - ${item.endMonth !== '' || item.endMonth !== 'month' ? item.endMonth + ' ' +  item.endYear : 'Present'}`}</p> </div>
                  {!readOnlyFlow && (
                 <div className="summary_add"><div className="experience__edit__icon">
                 <EditIcon color="#6200EE" onClick={() => handleModelChange(true, item, index)} />
               </div>
               EDIT
               </div>
                  )}
                </div>
            )
        })
    }
    return (
    <div className="education">
    <div className="education__heading">
      <div className="education__header">
        <h3 className="subText">Education</h3>
      </div>
      {!readOnlyFlow && (
      <div className="summary_add">
      <div className="education_add__icon">
        <AddIcon color="#6200EE" onClick={() => handleAddModel(true)} />
      </div>
      ADD
      </div>
      )}
    </div>

    {educationInfo}

    <ModelWindow handleChange={handleChange} profile={profile} setOpenModel= {setOpenModel} openModel={openModel} 
    handleSubmit={handleSubmit} type ="education" />
  </div>);
};


Education.propTypes = {};

const mapStateToProps = (state) => ({
 user :state.user
});
const mapDispatchToProps = { editUserDetails };

export default connect(mapStateToProps, mapDispatchToProps) (Education);
