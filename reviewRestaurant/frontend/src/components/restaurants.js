import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const Restaurant = props => {
  const initialRestaurantState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: []
  };
  const [restaurant, setRestaurant] = useState(initialRestaurantState);

  const getRestaurant = id => {
    RestaurantDataService.get(id)
      .then(response => {
        setRestaurant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getRestaurant(props.match.params.id);
  }, [props.match.params.id]);

  const deleteReview = (reviewId, index) => {
    RestaurantDataService.deleteReview(reviewId, props.user.id)
      .then(response => {
        setRestaurant((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {restaurant ? (
        <div className="text-xl text-white text-center">
          <h5 className="py-4">{restaurant.name}</h5>
          <p>
            <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
            <strong>Address: </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
          </p>
          <div className="py-4"></div>
          
          <Link to={"/restaurants/" + props.match.params.id + "/review"} className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 col-lg-5 mx-1 mb-1 relative -mr-px w-0 border border-transparent">
            Add Review
          </Link>
          <h4 className="py-4"> Reviews </h4>
          <ul role="list" className=" max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg">
  
            {restaurant.reviews.length > 0 ? (  
             restaurant.reviews.map((review, index) => {
               return (
                <li key ={index}
                className="col-span-1 flex flex-col text-center bg-gradient-to-b from-blue-600 to-green-600 rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="flex-1 flex flex-col p-8">
                    <h3 className="mt-6 text-2xl font-medium">{review.text}</h3>
                      <div className="py-4">
                        <div className="px-2 py-1 text-green-800 text-sm font-medium bg-green-100 rounded-full">
                          <strong>User: </strong>{review.name}
                        </div>
                        <div className="py-1"></div>
                        <div className="px-2 py-1 text-green-800 text-sm font-medium bg-green-100 rounded-full">
                          <strong>Date: </strong>{review.date}<br/>
                        </div>
                      </div>
                       {props.user && props.user.id === review.user_id &&
                          <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                              <Link to={{
                                  pathname: "/restaurants/" + props.match.params.id + "/review",
                                  state: {
                                    currentReview: review
                                  }
                                }} className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 col-lg-5 mx-1 mb-1 relative -mr-px w-0 flex-1 inline-flex items-center justify-center border border-transparent">Edit</Link>
                                <a onClick={() => deleteReview(review._id, index)} className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 col-lg-5 mx-1 mb-1 relative -mr-px w-0 flex-1 inline-flex items-center justify-center border border-transparent">Delete</a>
                            </div>
                          </div>                
                       }
                  </div>
                </li>
               );
             })
            ) : (
            <div className="text-center">
              <p>No reviews yet.</p>
            </div>
            )}
          </ul>
        </div>
      ) : (
        <div className="text-center">
          <br />
          <p>No restaurant selected.</p>
        </div>
      )}
    </div>
  );
};

export default Restaurant;