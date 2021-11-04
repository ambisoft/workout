import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

import Api from '../api';

const StravaConnect = () => {

  const [activities, setActivities] = useState();
  const history = useHistory();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    console.log('code:', code);
    if (code) {
      Api.Strava.authorize(code).then(resp => {
        history.push('/dashboard');
        //const token = resp.data.access_token;
        //Api.Strava.activities(token).then(resp => setActivities(resp.data));
      });
    }
  }, []);

  return (
    <section>
      <h1>Latest Strava Activities</h1>
      {activities && (
        <ul>
          {activities.map(activity => (
            <li key={activity.id}>
              {activity.name} / {activity.distance}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default StravaConnect;
