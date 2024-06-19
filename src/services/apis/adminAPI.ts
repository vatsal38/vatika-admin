import axios from 'axios';
import { useSession } from 'next-auth/react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const createAdmin = (data: any, token: any) => {
  return axios({
    url: `${BASE_URL}/admin/signup`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

const listAdmin = () => {
  return axios({
    url: `${BASE_URL}/admin/all`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getByIdAdmin = (token: any, id: any) => {
  return axios({
    url: `${BASE_URL}/admin/id/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateAdmin = (token: any, data: any, id: any) => {
  return axios({
    url: `${BASE_URL}/admin/edit/${id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  });
};

export const ADMIN = { createAdmin, listAdmin, getByIdAdmin, updateAdmin };
