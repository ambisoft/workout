import React, { useEffect, useState } from "react";
import Api from '../api';
import Config from './config';

const PolarConnect = () => {

  const [activities, setActivities] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code) {
      Api.local.Polar.authorize(code, Config.POLAR.redirect_uri).then(resp => {
        const token = resp.data.access_token;
        const user_id = resp.data.x_user_id;
        // Api.local.Polar.activities(token, user_id).then(resp => setActivities(resp.data));
        Api.local.Polar.exercises(token).then(resp => setActivities(resp.data));
      });
    }
  }, []);

  return (
    <section>
      <h1>Latest Polar Activities</h1>
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

export default PolarConnect;
