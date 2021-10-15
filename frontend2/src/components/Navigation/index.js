import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SearchBar from '../SearchBar';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div>
      <div>
        <h1>Questy</h1>
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to='/feed'>Feed</NavLink>
        <SearchBar />
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
