const prodBaseUrl = 'https://product-uploader-dev80.herokuapp.com';
const devBaseUrl = 'http://localhost:3000';
const dropboxAccessKey =
  'ynro87BAVIAAAAAAAAAAEWSNT1bzGz6iFuSmlz4vrmxqNlLBmx6PunaNTaPiPlkv';

let baseUrl = devBaseUrl;

if (process.env.NODE_ENV === 'production') {
  baseUrl = prodBaseUrl;
}
if (process.env.NODE_ENV === 'development') {
  baseUrl = devBaseUrl;
}

const config = {
  baseUrl,
  dropboxAccessKey,
};

export default config;
