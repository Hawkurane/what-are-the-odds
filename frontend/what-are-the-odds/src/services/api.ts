import { Axios } from "axios";

export const apiConfig = {
  returnRejectedPromiseOnError: true,
  baseURL: "http//localhost:3000",
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "text/plain",
    },
  },
};

export class Api extends Axios {}
