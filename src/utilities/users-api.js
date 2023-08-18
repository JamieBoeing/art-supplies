import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(`${BASE_URL}`, 'POST', userData)
    
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
    .then(responseData => {
      // Handle successful response (if needed)
      return responseData;
    })
    .catch(error => {
      // Handle error (if needed)
      throw error;
    });
}