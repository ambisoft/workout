import { initializeApp } from 'firebase/app';

const CONFIG = {
  appId: "1:351899070422:web:8ebcefe1ca438eb1dd7e77",
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "workouts-37317.firebaseapp.com",
  measurementId: "G-GC4KLVDJW8",
  projectId: "workouts-37317",
  storageBucket: "workouts-37317.appspot.com"
};

const Api = {
  init() {
    if (CONFIG.apiKey) {
      initializeApp(CONFIG);
    }
  }
}

export default Api;
