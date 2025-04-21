import React, { useState } from 'react';
import '../Css/TabComponent.css'

const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="tabs">
        {children.map((tab, index) => (
          <button
            key={index}
            className={index === activeTab ? 'active' : 'tab-button'}
            onClick={() => handleClick(index)}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {children[activeTab]}
      </div>
    </div>
  );
};

const TabPanel = ({ children }) => {
  return <div>{children}</div>;
};

export { Tab, TabPanel };

