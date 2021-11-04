import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

import Api from '../api';

const StravaConnect = () => {

  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code) {
      Api.Strava.authorize(code).then(resp => history.push('/dashboard'));
    }
  }, [history]);

  return (
    <section>
      <h1>Connecting...</h1>
    </section>
  );
};

export default StravaConnect;
