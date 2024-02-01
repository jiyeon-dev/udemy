import { useRef, useState } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const email = useRef();
  const password = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    console.log(enteredEmail, enteredPassword);

    const emailIsValid = enteredEmail.includes("@");
    console.log(emailIsValid);
    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);
    console.log("Sending HTTP request ...");
  };

  const handleReset = (event) => {
    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input ref={email} id='email' type='email' name='email' />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input ref={password} id='password' type='password' name='password' />
        </div>
      </div>

      <p className='form-actions'>
        <button
          type='reset'
          className='button button-flat'
          onClick={handleReset}
        >
          Reset
        </button>
        <button type='submit' className='button'>
          Login
        </button>
      </p>
    </form>
  );
}
