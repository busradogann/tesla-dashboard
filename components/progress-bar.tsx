import React from 'react';

interface ProgressBar {
  progress: number;
  fillColor?: string;
  emptyColor?: string;
}

const ProgressBar: React.FC<ProgressBar> = ({
  progress,
  fillColor,
  emptyColor
}) => {
  return (
    <div className={`w-full rounded-full overflow-hidden ${emptyColor}`} style={{ height: '16px', backgroundColor: '#ececec' }}>
      <div
        className={`h-full rounded-full ${fillColor}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: '#ff8114' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
