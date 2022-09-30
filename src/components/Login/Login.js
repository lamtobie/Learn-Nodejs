import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

//email
const initEmailState = {
  value:'',
  isValid:true
}
const USER_INPUT = 'user_input';
const INPUT_BLUR = 'input_blur';
const userInputAction = (val) =>{
  return {
    type:USER_INPUT,
    val
  }  
}
const inputBlurAction = () => {
  return{
    type: INPUT_BLUR,
  }
}

const emailReducer = (state, action) => {
  let newEmailState;
  console.log(action.type);
  switch(action.type){
    case USER_INPUT:
      newEmailState = {
        ...state,
        value: action.val,
        isValid: action.val.includes('@')
      }
      break
      case INPUT_BLUR:
        newEmailState = {
          ...state,
          value: state.value,
          isValid: state.value.includes('@')
        }
      break
      default:
        throw new Error('Invalid action') 
  }
  return newEmailState;
}

//password
const initPasswordState = {
  value:'',
  isValid:true
}

const passwordReducer = (state, action) => {
  let newEmailState;
  console.log(action.type);
  switch(action.type){
    case USER_INPUT:
      newEmailState = {
        ...state,
        value: action.val,
        isValid: action.val.trim().length > 6
      }
      break
      case INPUT_BLUR:
        newEmailState = {
          ...state,
          value: state.value,
          isValid: state.value.trim().length > 6
        }
      break
      default:
        throw new Error('Invalid action') 
  }
  return newEmailState;

} 

const Login = () => {
  const ctx = useContext(AuthContext);
  //useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, initEmailState);
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, initPasswordState);
  
  //cho pheps form dc submit
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect( ()=>{    
    setFormIsValid(
      emailState.isValid && passwordState.isValid
    );
  },[emailState.isValid, passwordState.isValid])

  const emailChangeHandler = (event) => {

    dispatchEmail( userInputAction(event.target.value) );

    dispatchEmail( inputBlurAction() );

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword( userInputAction(event.target.value) );
    dispatchPassword( inputBlurAction() );

  };

  const validateEmailHandler = () => {
    dispatchEmail( inputBlurAction() );
  };

  const validatePasswordHandler = () => {
    dispatchPassword( inputBlurAction() );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value,passwordState.value);
    } else if(!emailState.isValid){
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
          ref={emailInputRef}
          id='email' 
          label='E-mail' 
          type='email' 
          isValid={emailState.isValid} 
          value={emailState.value} 
          onChange={emailChangeHandler} 
          onBlur ={validateEmailHandler}  
        />
        <Input 
          ref={passwordInputRef}
          id='password' 
          label='Password' 
          type='password' 
          isValid={passwordState.isValid} 
          value={passwordState.value} 
          onChange={passwordChangeHandler} 
          onBlur ={validatePasswordHandler}  
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
