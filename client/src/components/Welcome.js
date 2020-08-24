import React from 'react';
const assetsPath = process.env.PUBLIC_URL + '/assets/';

export default () => {
  return (
    <div className="row">
      <div className="col s6">
        <p style={{ color: '#9e9e9e' }}>EMPLOYEE MANAGEMENT PLATFORM</p>
        <h1>The Best Employee Management Platform</h1>
        <p>
          Create a cycle of performance management and personalised learning
          that powers employee engagement and the success of your business
        </p>
      </div>
      <div className="col s6">
        <img
          className="responsive-img"
          src={`${assetsPath}employee-front.png`}
          alt="more"
        />
      </div>
    </div>
  );
};
