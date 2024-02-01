import { useState } from "react";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState("");

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });
  const [didEdit, setDidEdit] = useState({
    // 포커스 잃었는지 체크
    email: false,
    password: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(enteredValues);
  };

  const handleInputChange = (identifier, e) => {
    setEnteredValues((prev) => {
      return {
        ...prev,
        [identifier]: e.target.value,
      };
    });
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: false,
    }));
  };

  const handleInputBlur = (identifier) => {
    setDidEdit((prev) => ({
      ...prev,
      [identifier]: true,
    }));
  };

  const handleReset = (event) => {
    setEnteredValues({
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <div className='control no-margin'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={enteredValues.email}
            onChange={(e) => handleInputChange("email", e)}
            onBlur={(e) => handleInputBlur("email")}
          />
          <div className='control-error'>
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className='control no-margin'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={enteredValues.password}
            onChange={(e) => handleInputChange("password", e)}
          />
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
