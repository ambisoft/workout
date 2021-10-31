const Tokens = {
  clear() {
    localStorage.removeItem("workouts_token");
  },

  get(name) {
    return localStorage.getItem(name);
  },

  set(token) {
    localStorage.setItem("workouts_token", token);
  }
};

export default Tokens;
