import React, {Component, Fragment, useCallback, useEffect, useMemo, useReducer, useState} from 'react';
import AddSubscriber from './AddSubscriber';
import ShowSubscribers from './ShowSubscribers';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from "./Footer";
import {SubscriberCountContext} from "./SubscriberCountContext";
import {TotalSubscribersReducer} from "./TotalSubscribersReducer";
import {useDispatch} from "react-redux";
import EditSubscribers from './EditSubscriber';
export default function PhoneDirectory(){

            const [subscribersList,setSubscribersList] = useState([]);

      const [state,dispatchToTotalSubscriberReducer]= useReducer(TotalSubscribersReducer,{count:0});

    const  dispatch = useDispatch();
    async function loadData(){

        const rawResponse = await  fetch("http://localhost:8080/users")
       const data = await rawResponse.json()

        dispatch({"type":"SET_SUBSCRIBERS",payload:data})
        dispatchToTotalSubscriberReducer({"type":"UPDATE_COUNT",payload:data.length})
           setSubscribersList(data);
    }


            useEffect(()=>{
                loadData();
            },[])


    const deleteSubscriberHandler = useCallback(async (subscriberId)=>{
        const rawResponse = await fetch("http://localhost:8080/users/"+ subscriberId ,{method:"DELETE"})
        const data = await rawResponse.json();
        loadData();
    },[subscribersList])



   // async function deleteSubscriberHandler (subscriberId)  {
   //
   //     const rawResponse = await fetch("http://localhost:7081/api/contacts/"+ subscriberId ,{method:"DELETE"})
   //       const data = await rawResponse.json();
   //     loadData();
   //
   //  }

   async function addSubscriberHandler  (newSubscriber) {

    const rawResponse = await    fetch("http://localhost:8080/users",
                                    {
                                        method:"POST",
                                        headers:{
                                            'Content-Type':'application/json'
                                        },
                                        body:JSON.stringify(newSubscriber)
                                    }
                                    );


    const data = await rawResponse.json();                         
    loadData();
        //
        //
        // if (subscribersList.length > 0) {
        //     newSubscriber.id = subscribersList[subscribersList.length - 1].id + 1;
        // } else {
        //     newSubscriber.id = 1;
        // }
        // subscribersList.push(newSubscriber);
        // setSubscribersList(subscribersList)
        //this.setState({ subscribersList: subscribersList });
    }
    async function editSubscriberHandler(subscriberId,newSubscriber){
        console.log(newSubscriber);
        const rawResponse = await fetch("http://localhost:8080/edit/"+ subscriberId.id ,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newSubscriber)

    })
        const data = await rawResponse.json();
        loadData();
    }       
     const findSubscriber=(subscriberId)=>{
        const subscriber= subscribersList.filter((subscriber) => subscriber._id === subscriberId.id);
        return(subscriber)
    }       

    return (<Fragment>

        <Router>
            <div>
                <Route exact path="/" render={(props) => <ShowSubscribers {...props} deleteSubscriberHandler={(subscriberId)=>deleteSubscriberHandler(subscriberId)}/>} />
                <Route exact path="/add" render={({history}, props) => <AddSubscriber {...props} addSubscriberHandler={(newSubscriber)=>addSubscriberHandler(newSubscriber)} />} />
                <Route exact path="/edit/:id" render={(props) => <EditSubscribers {...props} editSubscriberHandler ={(subscriberId,newSubscriber)=>editSubscriberHandler(subscriberId,newSubscriber)} findSubscriber={(subscriberId)=> findSubscriber(subscriberId)}/>} />

            </div>
        </Router>
            <SubscriberCountContext.Provider value={subscribersList.length}>
                <Footer ></Footer>
            </SubscriberCountContext.Provider>

        </Fragment>
    )

}
