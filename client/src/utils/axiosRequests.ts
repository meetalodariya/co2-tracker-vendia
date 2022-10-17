import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface Response<T> {
  data?: T;
  status?: number;
  error?: AxiosError;
}

const BASE_URL = process.env.API_HOST || 'http://localhost:8001';

export const httpGet = async <T>({
  url,
  params,
  headers,
  ...rest
}: AxiosRequestConfig): Promise<Response<T>> => {
  try {
    const apiUrl = BASE_URL + url;
    const response: AxiosResponse<T> = await axios.get(apiUrl, {
      params,
      headers,
      ...rest,
    });

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error,
      };
    }
    throw error;
  }
};

export const httpPost = async <T>({
  url,
  data,
  ...rest
}: AxiosRequestConfig): Promise<Response<T>> => {
  try {
    const apiUrl = BASE_URL + url;
    const response: AxiosResponse<T> = await axios.post(apiUrl, data, rest);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error,
      };
    }
    throw error;
  }
};
