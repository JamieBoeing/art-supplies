import sendRequest from './send-request';

const BASE_URL = '/api/users';

export function create(userData) {
  return sendRequest(`${BASE_URL}`, 'POST', userData)
    
}

export function logIn(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials)
}
// Function to log out a user
export function logOut() {
  return sendRequest(`${BASE_URL}/logout`, 'POST');
}

// Function to update user data
export function update(userId, userData) {
  return sendRequest(`${BASE_URL}/${userId}`, 'POST', userData);
}

// Function to fetch user data by ID
export function getUser(userId) {
  return sendRequest(`${BASE_URL}/${userId}`);
}

// Function to fetch data for all users
export function getAllUsers() {
  return sendRequest(`${BASE_URL}`);
}

// Function to delete a user
export function deletes(userId) {
  return sendRequest(`${BASE_URL}/${userId}`, 'DELETE');
}




