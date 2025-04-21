"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => router.push("/"))
      .catch((err) => setError(err));
  };
  return (
    <div className="w-md mx-auto bg-[#f0f5f1] rounde-lg mt-20 ">
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mb-2">
          <Label className="text-base ml-49" htmlFor="email">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="password" className="text-base ml-46">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <Button type="submit" className="mt-2 w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
