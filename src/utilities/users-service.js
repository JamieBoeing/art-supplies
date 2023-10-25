import * as usersAPI  from './users-api';
import { getToken } from './token';


// POST
export async function create(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.create(userData);
  console.log(token)
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}
// POST
export async function logIn(credentials) {
  return usersAPI.logIn(credentials)
}
// POST
export async function logOut() {
  return usersAPI.logOut()
}
// PUT
export async function update(id, updatedUserData) {
  // get a new token with updated user info
  const token = await usersAPI.update(id, updatedUserData)
  // remove the current token from localstorage
  localStorage.removeItem('token')
  // save new token to localStorage
  localStorage.setItem('token', token)
  return getUser()
}

// GET
export async function getUser() {
  const token = getToken();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }
 return token
}
// GET
export async function getAllUsers( ) {
  return usersAPI.getAllUsers()
}
// DELETE
export async function deletes(id) {
  // get a new token with updated user info
  const token = await usersAPI.deletes(id)
  // remove the current token from localStorage
  localStorage.removeItem('token')
  return getUser()
}
