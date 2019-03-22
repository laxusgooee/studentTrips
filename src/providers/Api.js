import { AsyncStorage } from 'react-native';
import HttpError from 'standard-http-error';
import CONSTANTS from '../App.constants';

//const EventEmitter = require('event-emitter');

const TIMEOUT = 20000;

/**
 * All HTTP errors are emitted on this channel for interested listeners
 */
//export const errors = new EventEmitter();

/**
 * GET a path relative to API root url.
 * @param {String}  path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @param {Object} params if set, is converted to a quey string
 * @param {Boolean} all if true, the request is sent with headers and status
 * @returns {Promise} of response body
 */
export async function get(path, suppressRedBox, params, all) {

  if(params){
    var queryString = toQueryString(params);
    path = path+'?'+queryString;
  }

  if(all)
    return request('get', path, null, suppressRedBox);

  return bodyOf(request('get', path, null, suppressRedBox));
}

/**
 * POST JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function post(path, body, suppressRedBox) {
  return bodyOf(request('post', path, body, suppressRedBox));
}

/**
 * PUT JSON to a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function put(path, body, suppressRedBox) {
  return bodyOf(request('put', path, body, suppressRedBox));
}

/**
 * DELETE a path relative to API root url
 * @param {String} path Relative path to the configured API endpoint
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 * @returns {Promise}  of response body
 */
export async function del(path, suppressRedBox) {
  return bodyOf(request('delete', path, null, suppressRedBox));
}

/**
 * Make arbitrary fetch request to a path relative to API root url
 * @param {String} method One of: get|post|put|delete
 * @param {String} path Relative path to the configured API endpoint
 * @param {Object} body Anything that you can pass to JSON.stringify
 * @param {Boolean} suppressRedBox If true, no warning is shown on failed request
 */
export async function request(method, path, body, suppressRedBox) {
  try {
    const response = await sendRequest(method, path, body, suppressRedBox);
    return handleResponse(
      path,
      response
    );
  }
  catch (error) {
    if (!suppressRedBox) {
      logError(error, url(path), method);
    }
    throw error;
  }
}

/**
 * Takes a relative path and makes it a full URL to API server
 */
export function url(path) {
  const apiRoot = '';// getConfiguration('API_ROOT');
  return apiRoot + path;
}

/**
 * get the token for auth
 */
async function getAuthenticationToken() {
  var user = JSON.parse(await AsyncStorage.getItem(CONSTANTS.CONFIG.JWT_KEY));

  return (user)? 'Bearer ' + user : null;
}

/**
 * Constructs and fires a HTTP request
 */
async function sendRequest(method, path, body) {

  try {
    const endpoint = url(path);
    const token = await getAuthenticationToken();
    const headers = getRequestHeaders(body, token);
    const options = body
      ? {method, headers, body: JSON.stringify(body)}
      : {method, headers};

    console.log(endpoint, method)

    return timeout(fetch(endpoint, options), TIMEOUT);
  } catch (e) {
    throw new Error(e);
  }
}

/**
 * Receives and reads a HTTP response
 */
async function handleResponse(path, response) {
  try {
    const status = response.status;

    // `fetch` promises resolve even if HTTP status indicates failure. Reroute
    // promise flow control to interpret error responses as failures
    if (status >= 400) {
      const message = await getErrorMessageSafely(response);
      const error = new HttpError(status, message);

      // emit events on error channel, one for status-specific errors and other for all errors
      //errors.emit(status.toString(), {path, message: error.message});
      //errors.emit('*', {path, message: error.message}, status);

      throw error;
    }

    // parse response text
    const responseBody = await response.text();
    return {
      status: response.status,
      headers: response.headers,
      body: responseBody ? JSON.parse(responseBody) : null
    };
  } catch (e) {
    throw e;
  }
}

function getRequestHeaders(body, token) {
  const headers = body
    ? {'Accept': 'application/json', 'Content-Type': 'application/json'}
    : {'Accept': 'application/json'};

  if (token) {
    return {...headers, Authorization: token};
  }

  return headers;
}

// try to get the best possible error message out of a response
// without throwing errors while parsing
async function getErrorMessageSafely(response) {
  try {
    const body = await response.text();
    if (!body) {
      return '';
    }

    // Optimal case is JSON with a defined message property
    const payload = JSON.parse(body);
    if (payload && payload.message) {
      return payload.message;
    }

    // Should that fail, return the whole response body as text
    return body;

  } catch (e) {
    // Unreadable body, return whatever the server returned
    return response._bodyInit;
  }
}

/**
 * Rejects a promise after `ms` number of milliseconds, it is still pending
 */
function timeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('timeout')), ms);
    promise
      .then(response => {
        clearTimeout(timer);
        resolve(response);
      })
      .catch(reject);
  });
}

async function bodyOf(requestPromise) {
  try {
    const response = await requestPromise;
    return response.body;
  } catch (e) {
    throw e;
  }
}

//
// Helper function that flattens an object, retaining key structer as a path array:
//
// Input: { prop1: 'x', prop2: { y: 1, z: 2 } }
// Example output: [
//     { path: [ 'prop1' ],      val: 'x' },
//     { path: [ 'prop2', 'y' ], val: '1' },
//     { path: [ 'prop2', 'z' ], val: '2' }
// ]
//
function toQueryString(obj, urlEncode) {
    
    function flattenObj(x, path) {
        var result = [];

        path = path || [];
        Object.keys(x).forEach(function (key) {
            if (!x.hasOwnProperty(key)) return;
            if (!x[key]) return;

            var newPath = path.slice();
            newPath.push(key);

            var vals = [];
              if (typeof x[key] == 'object') {
                  vals = flattenObj(x[key], newPath);
              } else {
                  vals.push({ path: newPath, val: x[key] });
              }
            vals.forEach(function (obj) {
                return result.push(obj);
            });
        });

        return result;
    } // flattenObj

    // start with  flattening `obj`
    var parts = flattenObj(obj); // [ { path: [ ...parts ], val: ... }, ... ]

    // convert to array notation:
    parts = parts.map(function (varInfo) {
        if (varInfo.path.length == 1) varInfo.path = varInfo.path[0];else {
            var first = varInfo.path[0];
            var rest = varInfo.path.slice(1);
            varInfo.path = first + '[' + rest.join('][') + ']';
        }
        return varInfo;
    }); // parts.map

    // join the parts to a query-string url-component
    var queryString = parts.map(function (varInfo) {
        return varInfo.path + '=' + varInfo.val;
    }).join('&');
    if (urlEncode) return encodeURIComponent(queryString);else return queryString;
}

/**
 * Make best effort to turn a HTTP error or a runtime exception to meaningful error log message
 */
function logError(error, endpoint, method) {
  if (error.status) {
    const summary = `(${error.status} ${error.statusText}): ${error._bodyInit}`;
    console.error(`API request ${method.toUpperCase()} ${endpoint} responded with ${summary}`);
  }
  else {
    console.error(`API request ${method.toUpperCase()} ${endpoint} failed with message "${error.message}"`);
  }
}
