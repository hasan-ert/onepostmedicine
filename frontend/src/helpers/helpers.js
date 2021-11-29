import React from "react";
import auth from '../constants/firebase-config'


export const createURL = (baseUrl, newRoute) =>{
  const route = baseUrl + "/" + newRoute.toLowerCase().replaceAll(" ", "-");
  return route;
}

export const  isAuthorized = (user) => {
    return user ? true : false
}
