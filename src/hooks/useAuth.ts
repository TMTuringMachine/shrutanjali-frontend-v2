import React, { useCallback } from "react";

//redux
import { loginSuccess, logoutSuccess } from "../redux/slices/auth.slice";

//libs
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

//helpers
import { setSession, isValidToken } from "../utils/jwt";
import { AdminLoginForm } from "../interfaces/admin.interface";
import { RootState } from "../redux/store";
import { AppDispatch } from "../redux/store";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const login = useCallback(async (userData: AdminLoginForm) => {
    // console.log("in here");
    const res: any = await axiosInstance.post("/admin/login", userData);
    if (res != null) {
      setSession(res.token);
      // console.log(res);
      dispatch(loginSuccess({}));
      navigate("/admin/dashboard");
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch(logoutSuccess({}));
    navigate("/admin/login");
  }, []);

  const home = useCallback(()=>{
    navigate("/");

  },[])

  const blogs = useCallback(()=>{
    navigate("/blogs");
  },[])

  return {
    login,
    isLoggedIn,
    logout,
    home,
    blogs
  };
};

export default useAuth;
