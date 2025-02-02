import { axiosInstance } from "../lib/axios"
import {create} from "zustand"
import { data } from 'react-router-dom';
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

export const useAuthStore=create((set)=>({
    authUser:null,
    isRegistering:false,
    isLogging:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");


            set({authUser:res.data})
        }catch(error){
            console.log("Error in checkAuth:",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async(data)=>{
        set({isRegistering:true})
        try{
            const res=await axiosInstance.post("/auth/signup",data)
            set({authUser: res.data})
            toast.success("Account created succefully",{autoClose:1000})

            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true
        }
        catch(error){
            toast.error(error.response.data.message,{autoClose:1000})
        }
        finally{
            set({isRegistering:false})
        }
    },
    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("Logged out Successfully",{autoClose:1000})
        }
        catch(error){
            toast.error(error.response.data.message,{autoClose:1000})
        }
    },
    login: async (userData) => {  
        set({ isLogging: true });
    
        try {
            const res = await axiosInstance.post("/auth/login", userData); 
            set({ authUser: res.data });
            toast.success("Logged in successfully",{autoClose:1000});
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return true;
        } catch (error) {
            console.error("Login Error:", error.response?.data?.message || error.message); 
            toast.error(error.response?.data?.message || "Login failed",{autoClose:1000});
        } finally {
            set({ isLogging: false });
        }
    }
    
}))