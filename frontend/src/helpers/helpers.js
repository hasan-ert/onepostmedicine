import React from "react";
import auth from "../constants/firebase-config";

export const createURL = (baseUrl, newRoute) => {
  const route = baseUrl + "/" + newRoute.toLowerCase().replaceAll(" ", "-");
  return route;
};

export const isAuthorized = (user) => {
  return user ? true : false;
};

export const UpEachWord = (word) => {
  var regex = /[ -]+/;
  if (!word.match(regex)) return word.charAt(0).toUpperCase() + word.slice(1);
  let temp = word.split(/[ -]+/);
  let newWord = "";
  temp.forEach((element, index, array) => {
    array[index] = element.charAt(0).toUpperCase() + element.slice(1);
  });
  newWord = temp.join(" ");
  return newWord;
};

export default createURL;
