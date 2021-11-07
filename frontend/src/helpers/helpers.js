import React from "react";

export default function createURL(baseUrl, newRoute) {
  const route = baseUrl + "/" + newRoute.toLowerCase().replaceAll(" ", "-");
  return route;
}
