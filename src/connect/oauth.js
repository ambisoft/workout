const Oauth = {
  url(source) {
    const oauth = source.details.oauth;
    const lower = source.name.toLowerCase();
    const upper = source.name.toUpperCase();
    const client_id = process.env[`REACT_APP_${upper}_CLIENT_ID`];
    const redirect_uri = `${window.location.origin}/connect/${lower}`;
    const params = [
      `client_id=${client_id}`,
      `response_type=code`,
      `scope=${oauth.scope}`,
      `redirect_uri=${encodeURIComponent(redirect_uri)}`
    ];
    return `${oauth.base}?${params.join('&')}`;
  }
};

export default Oauth;
