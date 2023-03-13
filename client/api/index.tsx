import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;
const videoBase = `${base}/api/video`;

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

export const uploadVideo = async ({
  formData,
  config,
}: {
  formData: FormData;
  config: {
    onUploadProgress: (ProgressEvent: any) => void;
  };
}) => {
  const response = await axios.post(videoBase, formData, {
    withCredentials: true,
    ...config,
    headers: { "Content-Type": "application/form-data" },
  });
  const data = await response.data;
  return data;
};

export const updateVideo = async ({
  videoId,
  ...payload
}: {
  videoId: string;
  title: string;
  description: string;
  published: boolean;
}) => {
  const response = await axios.patch(`${videoBase}/${videoId}`, payload, {
    withCredentials: true,
  });
  const data = await response.data;
  return data;
};
