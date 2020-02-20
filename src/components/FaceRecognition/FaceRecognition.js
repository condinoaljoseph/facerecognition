import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img
          src={imageURL}
          alt=''
          width='500px'
          height='auto'
          id='inputImage'
        />
        {boxes.map((box, i) => {
          return (
            <div
              className='bounding-box'
              key={i}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
