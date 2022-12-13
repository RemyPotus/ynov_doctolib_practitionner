import {useState} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { auth } from "../main";

function Authentication() {

    const [seeLogin,setSeeLogin] = useState(true);
    const [email,setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const [errorMsg,setErrorMsg] = useState('');

    const navigate = useNavigate();

    const connexion = (email: string, password: string) => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/my-appointments");
        })
        .catch((e) => {
          alert(e);
          setErrorMsg(e.message);
        });
    };

    function login(){
      connexion(email,pwd);
    }

    const handleChange = (event:any) => {
      if(event.target.name === 'email'){
        setEmail(event.target.value);
      }else{
        setPwd(event.target.value);
      }
    };

    const signUpForm = () => {
        return (
          <div style={{width:'80%'}}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" name="email" value={email} onChange={handleChange} required/>
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input type="password" name="password" value={pwd} onChange={handleChange} required/>
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={ () => setSeeLogin(true)}>Have an Account?</button>
          </div>
        );
    }

    const loginForm = () => {
        return (
            <div>
              <h2>Welcome Back!</h2>
              <fieldset>
                <legend>Log In</legend>
                <ul>
                  <li>
                    <label htmlFor="username">Username:</label>
                    <input type="email" name="email" value={email} onChange={handleChange} required/>
                  </li>
                  <li>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={pwd} onChange={handleChange} required/>
                  </li>
                </ul>
              </fieldset>
              <button onClick={() => login()}>Login</button>
              <button type="button" onClick={ () => setSeeLogin(false)}>Create an Account</button>
            </div>
        )
    }

    return (
        <div>
            {seeLogin && loginForm()}
            {!seeLogin && signUpForm()}
            {errorMsg.length > 0 && 
              <p style={{color:'red'}}>{errorMsg}</p>
            }
        </div>

    )
}
export default Authentication

