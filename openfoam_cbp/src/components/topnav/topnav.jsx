import React from 'react';
import './topnav.css';
import { useNavigate, useLocation } from 'react-router';

const TopNav = () =>  {
    const location = useLocation();
    let navigate = useNavigate();
    return (
      <div className="topnav">
        <a className={location.pathname==="/solver"?"active":null} onClick={() => navigate('/solver')}>Solver</a>
        <a className={location.pathname==="/edit"?"active":null} onClick={() => navigate('/edit')}>Edit</a>
        <a className={location.pathname==="/run"?"active":null} onClick={() => navigate('/run')}>Run</a>
        <a className={location.pathname==="/log"?"active":null} onClick={() => navigate('/log')}>Log</a>
        <a className={location.pathname==="/postprocess"?"active":null} onClick={() => navigate('/postprocess')}>Postprocess</a>
        {<a className={location.pathname==="/help"?"active":null} onClick={() => navigate('/help')}>Help</a>}
      </div>
    );
};

export default TopNav;