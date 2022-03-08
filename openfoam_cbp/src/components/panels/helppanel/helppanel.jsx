import React from 'react';
import helpHtml from './help.html';
import './helppanel.css';

const HelpPanel = () => {
    return (
      <>
        <div className={"helpMargin"} dangerouslySetInnerHTML={ {__html: helpHtml} } />
      </>
    );
};

export default HelpPanel;