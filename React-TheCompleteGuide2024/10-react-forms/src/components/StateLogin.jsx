import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation";
import { useInput } from "../hooks/useInput";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));
  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }
    console.log({ emailValue, passwordValue });
  };

  const handleReset = (event) => {};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={emailHasError && "Please enter a valid email!"}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={passwordHasError && "Please enter a valid password!"}
        />
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
