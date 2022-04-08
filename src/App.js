import './App.css';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import app from './firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const GithubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, GithubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user)
      })
      .catch(error => {
        console.error(error);
      })
  }
  return (
    <div className="App">
      {/* {condition ? true : false} */}
      {
        user.email ? <button onClick={handleSignOut}>Sign Out</button>
          :
          <div>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
            <button onClick={handleGithubSignIn}>Github Sign In</button>
          </div>

      }

      <h2>Name : {user.displayName}</h2>
      <p>I know your email address : {user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
