import React from 'react';

interface PopupProps {}

const Popup: React.FC<PopupProps> = () => {
  return (
    <div className="">
      <div className="popup-content">
        <h2>Popup Title</h2>
        <p>Popup content goes here.</p>
      </div>
    </div>
  );
};

export default Popup;
