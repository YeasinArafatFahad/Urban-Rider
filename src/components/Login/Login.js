
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'


firebase.initializeApp(firebaseConfig)
function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    })

    const provider = new firebase.auth.GoogleAuthProvider();
    var gitProvider = new firebase.auth.GithubAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser)
                console.log(displayName, photoURL, email)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser)

            })
            .catch(err => {

            })
    }
    const handleOnBlur = (e) => {
        console.log(e.target.name, e.target.value);

        let isFieldValid = true;

        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {

            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }

    }
    const handleSubmit = (e) => {
        console.log(user.name, user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    // ..
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    // ...
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();

    }
    const handleGithubSignIn = () => {

        firebase
            .auth()
            .signInWithPopup(gitProvider)
            .then((result) => {
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                console.log('gh user',user);
                setUser( user)

            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorMessage,errorCode,email)
            });

    }

    return (
        <div className="App">
            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p>
                    <p>gmail:{user.email}</p>
                </div>
            }

            <form style={{ marginTop: "200px", marginLeft: '500px', width: '50%' }} onSubmit={handleSubmit} action="">
                <div class="form-group">
                    {newUser && <input className="form-control" name="name" type="text" onBlur={handleOnBlur} placeholder="Your Name" />}
                    <br />
                    <input type="text" className="form-control" name="email" onBlur={handleOnBlur} placeholder="email address" />
                    <br />
                    <input type="password" className="form-control" name="password" onBlur={handleOnBlur} placeholder="password" />
                    <br />
                </div>
                <input className="btn-primary" type="submit" value="Submit" />

            </form>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">Create New Account</label>
            <br />

            {/* <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>} */}
            <br />
            <button className="btn-success" onClick={handleSignIn}>Sign In with Google</button>
            <br />
            <br />
            <button className="btn-success" onClick={handleGithubSignIn}>Sign In With GitHub</button>

        </div>
    );
}

export default Login;
