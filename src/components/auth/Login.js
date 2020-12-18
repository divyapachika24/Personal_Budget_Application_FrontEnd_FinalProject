import React, { useState, useContext } from 'react';
import Axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorHighlighter from '../miscellaneous/ErrorHighlighter';
const SERVER_URL = require('../config/url').SERVER_URL; 

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
       e.preventDefault();
       try {
        const loginUser = { email, password };
        const loginRes = await Axios.post(
         SERVER_URL+"/users/login",
          loginUser
        );
         setUserData({
             token: loginRes.data.token,
             user: loginRes.data.user,
         });
         localStorage.setItem("uauth-token", loginRes.data.token);
         history.push("/");
         alert("your session will expire in 60 seconds");
      }catch (err) {
        err.response.data.msg && setError(err.response.data.msg);
    }
    };
 
    return (
        <div className="page">
        <h2>Login</h2>
        {error && (
                <ErrorHighlighter message={error} clearError={() => setError(undefined)} />
            )}
        <form className="form" onSubmit={submit}>
            <label htmlFor="login-email">Email</label>
            <input
             id="login-email"
             type="email"
             onChange={(e) => setEmail(e.target.value)}
           />

            <label htmlFor="login-password">Password</label>
            <input
             id="login-password"
             type="password"
             onChange={(e) => setPassword(e.target.value)}
           />
            <input type="submit" value="Login" />
        </form>
    </div>
    )
}


