import React, {Component, useState} from 'react';
import Header from './Header';
import './AddSubscriber.css';
import { Link,useHistory } from 'react-router-dom';
import {ValidatorForm,TextValidator} from 'react-material-ui-form-validator'
import { useParams } from "react-router-dom";

export default function EditSubscribers({editSubscriberHandler,findSubscriber}){
    const subId= useParams();
    let user= findSubscriber(subId)[0];

    
        const [editSubscriberForm,setEditSubscriberForm] = useState({
            name: user?user.name: "",
            phone:user?user.phone: ""
        });
    
   
    
    const history=useHistory();



    const inputChangedHandler = (e) => {
        const state = editSubscriberForm;
        state[e.target.name] = e.target.value;

        setEditSubscriberForm({...state})

    }

  const  onFormSubmitted = (e) => {
        
        e.preventDefault();

        editSubscriberHandler(subId,editSubscriberForm);
        setEditSubscriberForm({ name:'', phone:''});
        history.push("/")
    }


    const {name,phone}=editSubscriberForm;

    return (
        <div>
            <Header heading="Edit Subscriber" />
            <div className="component-body-container">
                <Link to="/">
                    <button className="custom-btn">Back</button>
                </Link>

                <ValidatorForm className="subscriber-form" onSubmit={onFormSubmitted}>


                    <TextValidator
                         id="name"
                        type="text"
                        name="name"
                        onChange={inputChangedHandler}
                        label="Enter Name"
                        value={name}
                        validators={['required']}
                        errorMessages={['Name cannot be empty']}
                    >
                    </TextValidator>

                    {/*<label htmlFor="name" className="label-control">Name: </label><br />*/}
                    {/*<input id="name" type="text" className="input-control" name="name" onChange={inputChangedHandler} />*/}




                    <br /><br />


                    <TextValidator
                         id="phone"
                         type="text"
                         name="phone"
                         onChange={inputChangedHandler}
                         label="Enter PhoneNumber"
                         value={phone}
                         validators={['required']}
                         errorMessages={['Phone Number cannot be empty']}
                    ></TextValidator>
                    {/*<label htmlFor="phone" className="label-control">Phone: </label><br />*/}
                    {/*<input id="phone" type="text" className="input-control" name="phone" onChange={inputChangedHandler} />*/}


                    <br /><br />

                    <div className="subscriber-info-container">
                        <span className="subscriber-to-add-heading">Subscriber to be edited: </span><br />
                        <span className="subscriber-info">Name: {name}</span><br />
                        <span className="subscriber-info">Phone: {phone}</span><br />
                    </div>

                    <button type="submit" className="custom-btn add-btn">Edit</button>
                </ValidatorForm>
            </div>
        </div>
    )

}

// interface User{
//     name:string,
//     phone:string,
//     createdAt:string,
//     updatedAt:string,
//     _id:string
// }