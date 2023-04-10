import axios from "axios";
import { IProducts, ICategory, ILogin, IRegister } from "../Types";
import { useState } from "react";
interface IProps {
  method: string;
  url: string;
  data?: IProducts | ICategory | ILogin | IRegister;
  id?: string;
}

const API_BASE_URL = "http://localhost:8080/api";
const fetchData = async (props: IProps) => {
  let response;
  const storedUser = localStorage.getItem("user");
  let token: string | null = null;

  if (typeof storedUser === "string") {
    token = JSON.parse(storedUser).accsetToken;
  }
  switch (props.method) {
    case "get":
      response = await axios.get(`${API_BASE_URL}${props.url}`);
      break;
    case "getOne":
      response = await axios.get(`${API_BASE_URL}${props.url}/${props.id}`);
      break;
    case "patch":
      response = await axios.patch(`${API_BASE_URL}${props.url}/${props.id}`);
      break;
    case "post":
      response = await axios.post(`${API_BASE_URL}${props.url}`, props.data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      break;
    case "put":
      response = await axios.put(
        `${API_BASE_URL}${props.url}/${props.id}`,
        props.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      break;
    case "delete":
      response = await axios.delete(`${API_BASE_URL}${props.url}/${props.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${props.method}`);
  }
  return response.data;
};
export default fetchData;
