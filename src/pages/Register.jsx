import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("student");

  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/auth/register",
            {
              name,
              email,
              password,
              role
            }
          );

        alert(
          res.data.message
        );

        navigate("/");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          error.message
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
          Register
        </h1>

        <form
          onSubmit={
            handleRegister
          }
        >

          <input
            type="text"
            placeholder="Name"
            value={name}
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
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
            value={password}
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

          <select
            value={role}
            className="
              w-full
              border
              p-3
              rounded-lg
              mb-4
            "
            onChange={(e) =>
              setRole(
                e.target.value
              )
            }
          >

            <option value="student">
              Student
            </option>

            <option value="recruiter">
              Recruiter
            </option>

          </select>

          <button
            type="submit"
            className="
              w-full
              bg-green-600
              text-white
              p-3
              rounded-lg
              hover:bg-green-700
            "
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;