import axios from "axios";

export const register = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/register`,
    { name, email, password },
    { withCredentials: true }
  );
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/login`,
    { email, password },
    { withCredentials: true }
  );
};

export const refresh = () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/refresh`,
    {},
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_KEY}/logout`,
    {},
    { withCredentials: true }
  );
};
