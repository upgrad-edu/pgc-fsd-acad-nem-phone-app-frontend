import React, {Component, useEffect} from 'react';
import Header from './Header.js';
import './ShowSubscribers.css';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";


export default function ShowSubscribers({deleteSubscriberHandler}){


   const subscribersList = useSelector(state=>state.subscribers)

  useEffect(()=>{

    if(subscribersList && subscribersList.length)
      document.title="Phone Directory - Number of Subscribers   " +subscribersList.length

  },[subscribersList])


  return (
      <div>
        <Header heading="Phone Directory" />
        <div className="component-body-container">
          <Link to="/add">
            <button className="custom-btn add-btn">Add</button>
          </Link>

          <div className="grid-container heading-container">
            <span className="grid-item name-heading">Name</span>
            <span className="grid-item phone-heading">Phone</span>
          </div>

          {
            subscribersList.map(sub => {
              return <div key={sub._id} className="grid-container row-container">
                <span className="grid-item">{sub.name}</span>
                <span className="grid-item">{sub.phone}</span>
                <span className="grid-item action-btn-container">
                  <span><button className="custom-btn delete-btn" onClick={()=>deleteSubscriberHandler(sub._id)}>Delete</button> <br/> <br/>
                  <Link to={"/edit/"+ sub._id}><button className="custom-btn delete-btn">Edit</button></Link></span>
  
                </span>
                <br/><br/>
              </div>
            })
          }
        </div>
      </div>
  );
}
//
// class ShowSubscribers extends Component {
//
//   onDeletedClick = (subscriberId) => {
//     this.props.deleteSubscriberHandler(subscriberId);
//   }
//
//   render() {
//     return (
//       <div>
//         <Header heading="Phone Directory" />
//         <div className="component-body-container">
//           <Link to="/add">
//             <button className="custom-btn add-btn">Add</button>
//           </Link>
//
//           <div className="grid-container heading-container">
//             <span className="grid-item name-heading">Name</span>
//             <span className="grid-item phone-heading">Phone</span>
//           </div>
//
//           {
//             this.props.subscribersList.map(sub => {
//               return <div key={sub.id} className="grid-container">
//                 <span className="grid-item">{sub.name}</span>
//                 <span className="grid-item">{sub.phone}</span>
//                 <span className="grid-item action-btn-container">
//                   <button className="custom-btn delete-btn" onClick={this.onDeletedClick.bind(this, sub.id)}>Delete</button>
//                 </span>
//               </div>
//             })
//           }
//         </div>
//       </div>
//     );
//   }
// }
//
// export default ShowSubscribers;
