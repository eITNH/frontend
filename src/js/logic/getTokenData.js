import jwtDecode from 'jwt-decode';

export default function getTokenData(token = localStorage.getItem('token')) {
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
  return {};
}
