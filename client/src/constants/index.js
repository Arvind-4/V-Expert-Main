let baseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = window.location.origin + '/api';
} else {
  baseUrl = 'http://localhost:8000/api';
}

export {
  baseUrl
}