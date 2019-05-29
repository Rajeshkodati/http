import axios from 'axios';
import {toast} from "react-toastify";
axios.interceptors.response.use(null,error =>{
    const expectedErrors = 
        error.response &&
        error.response.status >=400 &&
        error.response.status< 500;
        //not equal is meaning of unexpected error
        if(!expectedErrors){
          console.log("logging the errors",error);
          toast.error("An unexpected errors");
        }
        return Promise.reject(error)                 
  });
  export default{
      get:axios.get,
      post:axios.post,
      put:axios.put,
      delete:axios.delete
  }
