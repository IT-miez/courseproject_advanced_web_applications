import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SignIn from './components/SignIn';
import Register from "./components/Register"
import PostsPage from './components/PostsPage';
import PostOpened from './components/PostOpened';
import ProfilePage from './components/ProfilePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

// ALL THE PATHS NEEDED IN THE SITE

root.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:postID" element={<PostOpened />} />
          <Route path="/profile/:userID" element={<ProfilePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
