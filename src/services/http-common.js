import axios from 'axios';
export const BASEURL = {
  ENDPOINT_URL: process.env.NEXT_PUBLIC_BASE_URL,
};
export default axios.create({
  baseURL: `${BASEURL.ENDPOINT_URL}/api/`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});
