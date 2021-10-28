import React, { useEffect } from "react";
import Api from '../api';

const StravaConnect = () => {

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code) {
      Api.Strava.authorize(code);
    }
  });

  return (
    <div>Works?</div>
  );
};

export default StravaConnect;
