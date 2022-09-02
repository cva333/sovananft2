import React from 'react';

export const SelectButton = () => {
  return (
    // <div className="select-btn">
    //   <img src={'/white-box.png'} className="box" />
    //   <img src={'/white-box-tick.png'} className="tick-box" />
    // </div>

    <div className="like-btn">
      <img src={'/white-box.svg'} className="white-heart" />
      <img src={'/white-box-tick.svg'} className="red-heart" />
    </div>
  );
};
