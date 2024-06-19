import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createCategory = (data: any, token: any) => {
  return axios({
    url: `${BASE_URL}/category/create`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

const listCategory = (token: any) => {
  return axios({
    url: `${BASE_URL}/category/all`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const ADMIN = { createCategory, listCategory };
