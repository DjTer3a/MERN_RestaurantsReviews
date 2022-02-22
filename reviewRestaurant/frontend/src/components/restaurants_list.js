import React, { useState, useEffect } from "react";
import RestaurantDataService from "../services/restaurant";
import { Link } from "react-router-dom";

const RestaurantsList = props => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName ] = useState("");
  const [searchZip, setSearchZip ] = useState("");
  const [searchCuisine, setSearchCuisine ] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const onChangeSearchZip = e => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const onChangeSearchCuisine = e => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
    
  };

  const retrieveRestaurants = () => {
    RestaurantDataService.getAll()
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveCuisines = () => {
    RestaurantDataService.getCuisines()
      .then(response => {
        console.log(response.data);
        setCuisines(["All Cuisines"].concat(response.data));
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRestaurants();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setRestaurants(response.data.restaurants);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    find(searchName, "name")
  };

  const findByZip = () => {
    find(searchZip, "zipcode")
  };

  const findByCuisine = () => {
    if (searchCuisine === "All Cuisines") {
      refreshList();
    } else {
      find(searchCuisine, "cuisine")
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-around text-black">
        <div className="input-group  col-lg-4 ">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append py-2">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={findByName}>
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by zip"
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className="input-group-append py-2">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={findByZip}>
              Search
            </button>
          </div>
        </div>
        <div className="input-group col-lg-4">

          <select onChange={onChangeSearchCuisine}>
             {cuisines.map(cuisine => {
               return (
                 <option value={cuisine}> {cuisine.substr(0, 20)} </option>
               )
             })}
          </select>
          <div className="input-group-append py-2">
          <button
            type="button"
            className="text-white bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={findByCuisine}
            >
              Search
            </button>
          </div>

        </div>
      </div>
      <div className="flex flex-col justify-around items-center text-white">
        <ul role="list" className=" max-w-7xl grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg">
        {restaurants.map((restaurant) => {
          const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`;
          
          return (
            <li
              className="col-span-1 flex flex-col text-center bg-gradient-to-b from-blue-600 to-green-600 rounded-lg shadow divide-y divide-gray-200"
            >
            <div className="flex-1 flex flex-col p-8">
              <h3 className="mt-6 text-sm font-medium">{restaurant.name}</h3>
                <div className="py-4">
                  <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                    <strong>Address: </strong>{address}
                  </div>
                  <div className="py-1"></div>
                  <div className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  <strong>Cuisine: </strong>{restaurant.cuisine}<br/>
                  </div>
                </div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex">
                    <Link to={"/restaurants/"+restaurant._id} className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 col-lg-5 mx-1 mb-1 relative -mr-px w-0 flex-1 inline-flex items-center justify-center border border-transparent">
                      View Reviews
                    </Link>
                    <a target="_blank" href={"https://www.google.com/maps/place/" + address} className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 cursor-pointer px-4 py-2 shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 col-lg-5 mx-1 mb-1 relative -mr-px w-0 flex-1 inline-flex items-center justify-center border border-transparent">View Map</a>
                  </div>
                </div>
            </div>
            </li>
          );
        })}
        </ul>

      </div>
    </div>
  );
};

export default RestaurantsList;