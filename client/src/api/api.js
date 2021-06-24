import {endpoints}  from './endpoints';
import {getRequest, postRequest}    from './apiRequest.js';

export const getURL = (shortcode) => {
  return getRequest(endpoints.root + "/" + shortcode, { method: "GET" });
};

export const getURLStats = (shortenedURL) => {
  return getRequest(endpoints.root + "/" + shortenedURL + endpoints.getURLStats, {method : "GET"});
}

export const postNewURL = (urlData) => {
  return postRequest(endpoints.root, urlData);
}