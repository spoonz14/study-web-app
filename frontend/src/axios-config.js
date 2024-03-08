// axios-config.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8090", // Specify the base URL of your Spring Boot backend
  timeout: 10000, // Specify the request timeout
  headers: {
    "Content-Type": "application/json", // Specify the content type
  },
});

export default instance;
