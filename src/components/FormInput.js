import React, { useState} from 'react';
import Button from './UI/Button';

import "./FormInput.scss"

const FormInput = ({OnGetAddress, btnName}) => {
  
    const [address, setAddress] = useState("");
   
    const addressChangeHandler = (e) => {
        setAddress(e.target.value);
    }

    const searchAddressHandler = (e) => {
        e.preventDefault();
        OnGetAddress(address)
        // setAddress("")
        if(btnName === "clear") {
            setAddress("")
        }    
    }
    
    const color = btnName === "clear" ? "#ef9a9a" : null

    return (
        <form onSubmit={searchAddressHandler}>
            <input 
            style={{ color}} 
            value={address} 
            id="address" 
            type="text" 
            placeholder="Enter the wallet address" 
            onChange={addressChangeHandler}
            />
            <Button >{btnName}</Button>
        </form>
    )
}

export default FormInput;



