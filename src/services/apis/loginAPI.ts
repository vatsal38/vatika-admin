import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/*login api */
const login = (data: any) => {
  return axios({
    url: `${BASE_URL}/admin/login?email=${data.email}&password=${data.password}`,
    method: 'GET',
  });
};

export const LOGIN = {
  login,
};
