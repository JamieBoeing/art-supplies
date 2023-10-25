export function getToken() {
    const token = localStorage.getItem('token');
    console.log(token);
    return token;
  }
  