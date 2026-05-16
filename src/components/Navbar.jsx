import {
  Link,
  useNavigate
} from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <nav
      className="
        bg-blue-600
        text-white
        px-6
        py-4
        flex
        items-center
        justify-between
        shadow-md
      "
    >

      <h1
        className="
          text-2xl
          font-bold
        "
      >
        IPMP
      </h1>

      <div
        className="
          flex
          gap-4
          items-center
        "
      >

        <Link
          to="/"
          className="hover:text-gray-200"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="hover:text-gray-200"
        >
          Register
        </Link>

        {
          token && (

            <Link
              to="/internships"
              className="hover:text-gray-200"
            >
              Internships
            </Link>
          )
        }

        {
          role === "student" && (

            <Link
              to="/student"
              className="hover:text-gray-200"
            >
              Student Dashboard
            </Link>
          )
        }

        {
          role === "recruiter" && (

            <Link
              to="/recruiter"
              className="hover:text-gray-200"
            >
              Recruiter Dashboard
            </Link>
          )
        }

        {
          role === "admin" && (

            <Link
              to="/admin"
              className="hover:text-gray-200"
            >
              Admin Dashboard
            </Link>
          )
        }

        {
          token && (

            <Link
              to="/profile"
              className="hover:text-gray-200"
            >
              Profile
            </Link>
          )
        }

        {
          token && (

            <button
              onClick={logout}
              className="
                bg-red-500
                px-4
                py-2
                rounded-lg
                hover:bg-red-600
              "
            >
              Logout
            </button>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;