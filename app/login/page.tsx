"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);

        toast.success("Login Successful!", {
          description: "Welcome back 👋",
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        toast.error(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!", {
        description: "Please try again.",
      });
    } finally {
      setLoading(false);
    }
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
          background: "#fff",
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
          Login
        </h1>

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
            marginBottom: "20px",
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
            background: loading ? "#64748b" : "#2563eb",
            color: "#fff",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "0.3s",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#555",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register
          </a>
        </p>
      </form>
    </div>
  );
}