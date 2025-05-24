import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp : false,
    isLoggingIn : false,
    isCheckingAuth : false,
    isLoggedOut : false,
    
    

    checkAuth : async () => {
       
        try {
             set({isCheckingAuth : true});
            const response = await axiosInstance.get('/auth/get-me');
            set({authUser: response.data.user});
            set({isLoggedOut : false})
            
            
            

            
        } catch (error) {
            console.error("check auth error :", error);
            set({authUser : null});
            set({isLoggedOut : true});
           
            
        }finally{
            set({isCheckingAuth : false });

        }
    },

     signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/register", data);

            set({ authUser: res.data.user });
            set({isLoggedOut : false})

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error signing up", error);
            toast.error("Error signing up");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data.user });
            set({isLoggedOut : false})

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error logging in", error);
            toast.error("Error logging in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
             set({isCheckingAuth : true});
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            set({isLoggedOut : true})
           

            toast.success("Logout successful");
        } catch (error) {
            console.log("Error logging out", error);
            toast.error("Error logging out");
        }finally{
            set({isCheckingAuth : false});
        }
    },


}))

