import axios from "axios";
import { IProducts, ICategory } from "../Types";
import { useState } from "react";
interface IProps {
  method: string;
  url: string;
  data?: IProducts | ICategory;
  id?: number;
}

const API_BASE_URL = "http://localhost:3000";
const fetchData = async (props: IProps) => {
  let response;
  switch (props.method) {
    case "get":
      response = await axios.get(`${API_BASE_URL}${props.url}`);
      break;
    case "getOne":
      response = await axios.get(`${API_BASE_URL}${props.url}/${props.id}`);
      break;
    case "post":
      response = await axios.post(`${API_BASE_URL}${props.url}`, props.data);
      break;
    case "put":
      response = await axios.put(
        `${API_BASE_URL}${props.url}/${props.id}`,
        props.data
      );
      break;
    case "delete":
      response = await axios.delete(`${API_BASE_URL}${props.url}/${props.id}`);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${props.method}`);
      break;
  }
  return response.data;
};
export default fetchData;
