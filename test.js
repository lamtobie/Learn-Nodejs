const Login = (props) => {
  const {onLogin} = props;

  //value email input
  const [enteredEmail, setEnteredEmail] = useState('');
  //kiểm tra lỗi email
  const [emailIsValid, setEmailIsValid] = useState();

  //value password input
  const [enteredPassword, setEnteredPassword] = useState('');
  //kiêm tra lỗi pass
  const [passwordIsValid, setPasswordIsValid] = useState();

  //cho pheps form dc submit
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect( ()=>{  
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length >6
    );
  },[enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    setEmailIsValid(event.target.value.includes('@'));

  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setPasswordIsValid(event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(enteredEmail, enteredPassword);

  };

  return (
    <Card className={classes.login}>

      <form onSubmit={submitHandler}>
      <div
      className={`${classes.control} ${ emailIsValid === false ? classes.invalid : '' }`} >
      <label htmlFor="email">E-Mail</label>
      <input
      type="email"
      id="email"
      value={enteredEmail}
      onChange={emailChangeHandler} //khi nội dung input thay đổi
      onBlur={validateEmailHandler} //khi focus ra ngoài
      />
      </div>
        <div
        className={`${classes.control} ${ passwordIsValid === false ? classes.invalid : '' }`} >
        <label htmlFor="password">Password</label>
        <input
                    type="password"
                    id="password"
                    value={enteredPassword}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                  />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
