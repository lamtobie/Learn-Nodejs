import React, {  useRef, useImperativeHandle, forwardRef } from 'react';

import classes from './Input.module.css';

function Input(props, ref) {
    const {isValid, id, label, type, value, onChange, onBlur} = props;
    
    const inputRef = useRef();

    
    const activate = () => {
      inputRef.current.focus();
    }
    
    useImperativeHandle(ref,()=>({
      focus: activate
    }))
    return (
        <div
          className={`${classes.control} ${
            isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={id}>{label}</label>
          <input
            ref={inputRef}
            type={type}
            id={id}
            value={value}
            onChange={onChange} //khi nội dung input thay đổi
            onBlur={onBlur} //khi focus ra ngoài
          />
        </div>
    );
}


export default forwardRef(Input);