"use client";
import { getUserThunk } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken, isLoading: profileIsLoading } = useSelector(
    (state: RootState) => state.user
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserThunk(accessToken));
    setIsLoading(true);
  }, []);

  if (!isLoading || profileIsLoading)
    return (
      <p className="flex flex-col items-center justifiy-center mt-50">
        Loading
      </p>
    );

  return <>{children}</>;
};

export default App;
