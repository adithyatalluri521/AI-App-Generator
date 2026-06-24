"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration Successful!");

        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        background: "#0f172a",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#111827",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            color: "#111827",
            background: "#fff",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            color: "#111827",
            background: "#fff",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "25px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            color: "#111827",
            background: "#fff",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "8px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}