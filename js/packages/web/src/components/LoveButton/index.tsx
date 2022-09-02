import React from 'react';
// import { HeartOutlined } from '@ant-design/icons';
// import { Button } from 'antd';

export const LoveButton = () => {
  return (
    <div className="like-btn">
      <img src={'/heart-white.svg'} className="white-heart" />
      <img src={'/heart-red.svg'} className="red-heart" />
    </div>
  );
};
