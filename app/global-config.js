const prodBaseUrl = 'https://product-uploader-dev80.herokuapp.com';
const devBaseUrl = 'http://localhost:3000';

let baseUrl = devBaseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = prodBaseUrl;
}
if (process.env.NODE_ENV === 'development') {
  baseUrl = devBaseUrl;
}

const config = {
  baseUrl,
};

export default config;
