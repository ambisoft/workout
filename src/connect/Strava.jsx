import React, { useEffect, useState } from "react";
import Api from '../api';

const StravaConnect = () => {

  const [activities, setActivities] = useState();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (code && !activities) {
      Api.Strava.authorize(code).then(resp => {
        const token = resp.data.access_token;
        Api.Strava.activities(token).then(resp => {
          setActivities(resp.data);
        });
      });
    }
  }, []);

  return (
    <section>
      <h1>Latest Activities</h1>
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
