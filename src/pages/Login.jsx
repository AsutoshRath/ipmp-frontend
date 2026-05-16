import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      const token =
        res.data?.token;

      const user =
        res.data?.user;

      if (!token || !user) {

        alert(
          "Invalid login response from server"
        );

        return;
      }

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        user.role
      );

      alert("Login Successful");

      if (
        user.role === "student"
      ) {

        navigate("/student");

      } else if (
        user.role === "recruiter"
      ) {

        navigate("/recruiter");

      } else if (
        user.role === "admin"
      ) {

        navigate("/admin");
      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (

    <div
      className="
        min-h-screen
        flex
        items-start
        justify-center
        pt-24
        bg-gray-100
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-full
          max-w-md
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-6
          "
        >
          Login
        </h1>

        <form
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              p-3
              rounded-lg
              hover:bg-blue-700
            "
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;