import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;

export const registerUser = async (payload: {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
}) => {
  const response = await axios.post(userBase, payload);
  const data = await response.data;
  return data;
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  console.log(payload);
  const response = await axios.post(authBase, payload, {
    withCredentials: true,
  });
  const data = await response.data;
  return data;
};

export const getUser = async () => {
  try {
    const response = await axios.get(userBase, {
      withCredentials: true,
    });
    const data = await response.data;
    return data;
  } catch (error: any) {
    return null;
  }
};
