import { useEffect, useState } from "react";
import API from "../services/api";

function RecruiterDashboard() {

  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {

    try {

      const internshipsRes =
        await API.get("/internships");

      setInternships(
        internshipsRes.data || []
      );

      const applicantsRes =
        await API.get(
          "/applications/recruiter"
        );

      setApplications(
        applicantsRes.data
          .applications || []
      );

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchData();

  }, []);

  const resetForm = () => {

    setTitle("");
    setCompany("");
    setLocation("");
    setStipend("");
    setDescription("");
    setSkills("");
    setEditingId(null);

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const internshipData = {
          title,
          company,
          location,
          stipend,
          description,
          skills
        };

        if (editingId) {

          await API.put(
            `/internships/${editingId}`,
            internshipData
          );

          alert("Internship Updated");

        } else {

          await API.post(
            "/internships",
            internshipData
          );

          alert("Internship Created");
        }

        fetchData();
        resetForm();

      } catch (error) {

        alert(
          error.response?.data
            ?.message ||
          error.message
        );
      }
    };

  const editInternship =
    (internship) => {

      setEditingId(
        internship._id
      );

      setTitle(
        internship.title
      );

      setCompany(
        internship.company
      );

      setLocation(
        internship.location
      );

      setStipend(
        internship.stipend
      );

      setDescription(
        internship.description
      );

      setSkills(
        internship.skills
      );
    };

  const deleteInternship =
    async (id) => {

      try {

        await API.delete(
          `/internships/${id}`
        );

        alert(
          "Internship Deleted"
        );

        fetchData();

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

      <h1 className="text-3xl font-bold mb-6">
        Recruiter Dashboard
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">

        <h2 className="text-2xl font-semibold mb-4">

          {
            editingId
              ? "Edit Internship"
              : "Create Internship"
          }

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) =>
              setCompany(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Stipend"
            value={stipend}
            onChange={(e) =>
              setStipend(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Skills Required"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="border p-3 rounded-lg"
            rows="5"
            required
          />

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >

              {
                editingId
                  ? "Update Internship"
                  : "Create Internship"
              }

            </button>

            {
              editingId && (

                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              )
            }

          </div>

        </form>

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Posted Internships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {
          internships.map((internship) => (

            <div
              key={internship._id}
              className="bg-white rounded-xl shadow-md p-5"
            >

              <h3 className="text-2xl font-semibold mb-3">
                {internship.title}
              </h3>

              <p className="mb-2">
                <b>Company:</b> {internship.company}
              </p>

              <p className="mb-2">
                <b>Location:</b> {internship.location}
              </p>

              <p className="mb-2">
                <b>Stipend:</b> {internship.stipend}
              </p>

              <p className="mb-2">
                <b>Skills:</b> {internship.skills}
              </p>

              <p className="mb-4">
                {internship.description}
              </p>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    editInternship(
                      internship
                    )
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteInternship(
                      internship._id
                    )
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        }

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        Applicants
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          applications.length === 0 ? (

            <p>No applicants found</p>

          ) : (

            applications.map((app) => (

              <div
                key={app._id}
                className="bg-white rounded-xl shadow-md p-5"
              >

                <p className="mb-2">
                  <b>Student:</b> {app.studentId?.name}
                </p>

                <p className="mb-2">
                  <b>Email:</b> {app.studentId?.email}
                </p>

                <p className="mb-2">
                  <b>Internship:</b> {app.internshipId?.title}
                </p>

                <p className="mb-4">
                  <b>Status:</b>{" "}

                  <span
                    className={`
                      px-3 py-1 rounded-full text-white text-sm
                      ${
                        app.status === "approved"
                          ? "bg-green-500"
                          : app.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }
                    `}
                  >
                    {app.status}
                  </span>
                </p>

                {
                  app.resume && (

                    <a
                      href={`http://localhost:5000/uploads/${app.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      View Resume
                    </a>
                  )
                }

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}

export default RecruiterDashboard;