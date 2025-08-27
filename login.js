import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axios";

const loginUser = async (data) => {
  const  response = await  axiosInstance.post("/user/login", data);
  return response.data;
}

 const useLogin = () => {
  return  useMutation({mutationFn:loginUser });
};

export { useLogin };
