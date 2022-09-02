import React, { CSSProperties } from 'react';

export const TokenCircle = (props: {
  iconSize?: number;
  iconFile?: string;
  style?: CSSProperties;
}) => {
  const { iconSize = 24, iconFile = undefined, style = {} } = props;
  const filePath = iconFile ? iconFile : '/logoSolana.svg';
  return (
    <span
      style={{
        height: iconSize,
        width: iconSize,
        display: 'inline-flex',
        overflow: 'hidden',
        ...style,
      }}
    >
      <img src={filePath} />
    </span>
  );
};
