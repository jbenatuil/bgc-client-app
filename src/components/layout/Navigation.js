import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import BGCProfileHome from "../UserProfile/BGCProfileHome";
import { logoutUser, updateTabIndex } from "../../redux/actions/userActions";
import { getRoutes } from "../../util/constant";

import "./Navigation.css";

const Navigation = ({ logoutUser, authenticated, currentTabIndex, updateTabIndex }) => {
  const [value, setValue] = useState(3);
  const history = useHistory();
  console.log('currentTabIndex', currentTabIndex);
  useEffect(() => {
    if (authenticated) {
      switch (currentTabIndex) {
        case 0:
        case 1:
          // Needs to change later
          history.push("/portalHome");
          break;
        case 2:
          history.push("/userprofile");
          break;
        case 3:
          history.push("/communityHome");
          break;
        case 4:
            history.push("/directory");
            break;
        default:
          history.push("/login");
          setValue(2);
          logoutUser();
          break;
      }
    }
    if (!authenticated) {
      switch (currentTabIndex) {
        case 0:
        case 1:
          history.push("/login");
          break;
        case 2:
          history.push("/signup");
          break;
        default:
          history.push("/login");
      }
    }
  }, [currentTabIndex]);

  const handleMenuChange = (event, newValue) => {
    updateTabIndex(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `menu-tab-${index}`,
      "aria-controls": `menu-tabpanel-${index}`,
    };
  };
  console.log('value', value);
  const authenticatedMenuItems = (
    <Tabs value={currentTabIndex} onChange={handleMenuChange} aria-label="menu bar">
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
        alt=""
      />
      <Tab
        label="Alumnae Portal Home"
        name="home"
        className="header__bar_item"
        {...a11yProps(1)}
      />
      <Tab
        label="My Profile"
        name="profile"
        className="header__bar_item"
        {...a11yProps(2)}
      />
      <Tab
        label="Communities"
        name="community"
        className="header__bar_item"
        {...a11yProps(3)}
      />
      <Tab
        label="Directory"
        name="directory"
        className="header__bar_item"
        {...a11yProps(4)}
      />
      <Tab
        label="Log out"
        name="logout"
        className="header__bar_item"
        {...a11yProps(5)}
      />
    </Tabs>
  );
  const unAuthenticatedMenuItems = (
    <Tabs
      value={value}
      onChange={handleMenuChange}
      aria-label="menu bar"
    >
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/Screen%20Shot%202021-09-06%20at%207.17.04%20PM.png?alt=media&token=089a0496-afdc-4654-b96a-cb440c316758"
        alt=""
      />
      <Tab label="BlackGirlsCode.com" name="bgc" className="header__bar_item" {...a11yProps(0)} />
    </Tabs>
  );
  return (
    <div className="header__app">
      <AppBar position="static" className="header__bar">
        {authenticated ? authenticatedMenuItems : unAuthenticatedMenuItems}
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  authenticated: state.user.authenticated,
  currentTabIndex: state.UI.currentTabIndex
});

const mapDispatchToProps = { logoutUser, updateTabIndex };
Navigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);