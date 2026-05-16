import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function Profile() {

  const [formData,
    setFormData] = useState({

    name: "",
    email: "",
    bio: "",
    skills: "",
    college: "",
    phone: "",
    linkedin: "",
    github: ""

  });

  useEffect(() => {

    const fetchProfile =
      async () => {

        try {

          const res =
            await API.get(
              "/auth/profile"
            );

          setFormData(
            res.data
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchProfile();

  }, []);

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value
      });
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.put(
            "/auth/profile",
            formData
          );

        alert(
          res.data.message
        );

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          error.message
        );
      }
    };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={formData.college}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={formData.linkedin}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={formData.github}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;