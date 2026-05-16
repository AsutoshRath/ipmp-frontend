import { useEffect, useState } from "react";
import API from "../services/api";

function Internships() {

  const [internships,
    setInternships] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [resume,
    setResume] =
    useState(null);

  useEffect(() => {

    const getInternships =
      async () => {

        try {

          const res =
            await API.get(
              "/internships"
            );

          setInternships(
            res.data || []
          );

        } catch (error) {

          console.log(error);

        }
      };

    getInternships();

  }, []);

  const applyInternship =
    async (id) => {

      try {

        if (!resume) {

          alert(
            "Please upload resume"
          );

          return;
        }

        const formData =
          new FormData();

        formData.append(
          "internshipId",
          id
        );

        formData.append(
          "resume",
          resume
        );

        const res =
          await API.post(

            "/applications/apply",

            formData,

            {
              headers: {
                "Content-Type":
                  "multipart/form-data"
              }
            }
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

  const saveInternship =
    async (id) => {

      try {

        const res =
          await API.post(
            `/internships/save/${id}`
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

  const filteredInternships =
    internships.filter(

      (internship) =>

        internship.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        internship.company
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        internship.location
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">
        Internships
      </h1>

      <input
        type="text"
        placeholder="Search internships"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full md:w-1/2 border p-3 rounded-lg mb-6 bg-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {
          filteredInternships.map(

            (internship) => (

              <div
                key={internship._id}
                className="bg-white rounded-xl shadow-md p-5"
              >

                <h2 className="text-2xl font-semibold mb-2">
                  {internship.title}
                </h2>

                <p className="mb-1">
                  <b>Company:</b>
                  {" "}
                  {internship.company}
                </p>

                <p className="mb-1">
                  <b>Location:</b>
                  {" "}
                  {internship.location}
                </p>

                <p className="mb-1">
                  <b>Stipend:</b>
                  {" "}
                  {internship.stipend}
                </p>

                <p className="mb-2">
                  <b>Skills:</b>
                  {" "}
                  {internship.skills}
                </p>

                <p className="mb-4">
                  {internship.description}
                </p>

                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setResume(
                      e.target.files[0]
                    )
                  }
                  className="mb-4"
                />

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      applyInternship(
                        internship._id
                      )
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply
                  </button>

                  <button
                    onClick={() =>
                      saveInternship(
                        internship._id
                      )
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>

                </div>

              </div>
            ))
        }

      </div>

    </div>
  );
}

export default Internships;