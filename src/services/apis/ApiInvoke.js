import axios from 'axios';
import {ApiRouter} from '../apis/ApiRouter';
import {getStorage} from '../StorageService';
let BASE_URL = ApiRouter.BASE_URL;
let headers = {
  authorization: getStorage('authorization')
}
export function get(route) {
    let url = `${BASE_URL}${route}`;
    return axios.get(url, {headers})
        .then(handleResponse);
};

export function post(route, payload) {
    let url = `${BASE_URL}${route}`;
    return axios.post(url, payload, {headers})
        .then(handleResponse);
};

export function put(route, payload) {
    let url = `${BASE_URL}${route}`;
    return axios.put(url, payload, {headers})
        .then(handleResponse);
};

export function deleted(route)  {
    let url = `${BASE_URL}${route}`;
    return axios.delete(url, {headers})
        .then(handleResponse);
};

function handleResponse(res) {
    if (!res.data) {
        return Promise.reject(new Error('Something went wrong'));
    } else {
      if (res.status) {
          return Promise.resolve(res.data);
      } else {
          return Promise.reject(new Error(res.data));
      }
    }
}

export function getWithoutAuth(route) {
    let url = BASE_URL + route;
    return axios.get(url).then(handleResponse);
};

export function getWithAuth(route){
  let url = BASE_URL + route;
  return axios.get(url, {headers: {
      authorization: getStorage('authorization')
    }})
    .then(handleResponse);
};

export function postWithoutAuth(route, payload){
    let url = BASE_URL + route;
    return axios.post(url, payload)
        .then(handleResponse);
};

export function postWithAuth(route, payload){
  let url = BASE_URL + route;
  return axios.post(url, payload, {headers: {
      authorization: getStorage('authorization')
    }})
    .then(handleResponse);
};

