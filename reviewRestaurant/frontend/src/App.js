import React, { Component } from 'react';
import {Switch, Route, Link} from "react-router-dom"
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import AddReview from "./components/add_review"
import Restaurant from "./components/restaurants"
import RestaurantsList from "./components/restaurants_list"
import Login from "./components/login"


function App() {
const [user, setUser] = React.useState(null)

  async function login(user = null){
      setUser(user);
  }

  async function logout(){
    setUser(null);
}


  return (
  <div className="min-h-screen bg-gradient-to-b from-blue-600 to-green-600 text-white">
    
    <div className="sticky top-0 z-50">
      <Disclosure as="nav" className="backdrop-filter backdrop-blur-lg">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-400 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto "
                      src={require("./logo.png")}
                      alt="Restaurant logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto "
                      src={require("./logo.png")}
                      alt="Restaurant logo"
                    />
                  </div><Link to={"/restaurants"}>
                  <div className="hidden sm:block sm:ml-6 ">
                  <div className="px-2 pt-2 pb-3 space-y-1 hover:bg-green-400 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium ">
                  
                          Restaurants
                        
                  </div>
                  </div></Link>
                </div>
                <div className="bg-blue-400 rounded-md hover:bg-green-400 hover:text-blue-800 ">
                
                
                    <div>
                    { user ? (
                      <button
                      type="button"
                      className="cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                      onClick={logout}
                    >
                        Logout {user.name}
                      </button>
                    ) : (            
                    <Link to={"/login"} className="nav-link">
                    <button
                      type="button"
                      className="cursor-pointer px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Login
                      </button>
                    </Link>
                    )}
                    </div>
                
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <Link to={"/restaurants"}>
                <div className="px-2 pt-2 pb-3 space-y-1 hover:bg-green-400 hover:text-blue-800 block px-3 py-2 rounded-md text-base font-medium ">
                  Restaurants
                </div>
              </Link>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
                
    <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route 
            path="/restaurants/:id/review"
            render={(props) => (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          />
          <Route 
            path="/login"
            render={(props) => (
              <Login {...props} login={login} />
            )}
          />
        </Switch>
      </div>

  </div>
);
}

export default App;