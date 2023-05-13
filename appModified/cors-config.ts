export function setCorsConfiguration() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:8080', true);
  xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
  xhr.setRequestHeader(
    'Access-Control-Allow-Methods',
    'GET, PUT, POST, DELETE, OPTIONS'
  );
  xhr.setRequestHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  );
  xhr.withCredentials = true;
  xhr.send();
}
