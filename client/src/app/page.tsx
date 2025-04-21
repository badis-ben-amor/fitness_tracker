"use client";
import FeaturesSections from "@/components/home/featuresSections";
import { getUserThunk } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserThunk(accessToken));
  }, []);

  return (
    <div>
      <FeaturesSections />
    </div>
  );
};

export default Home;
