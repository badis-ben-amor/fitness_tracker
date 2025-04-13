"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerThunk } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";
import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerThunk({ name, email, password }));
  };
  return (
    <div className="w-md mx-auto bg-fuchsia-50 rounded-lg mt-40">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <Label htmlFor="name" className="text-base ml-48">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="email" className="text-base ml-49">
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
        <Button type="submit" className="w-full mt-2">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
