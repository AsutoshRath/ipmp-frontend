import { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {

  const [applications,
    setApplications] =
    useState([]);

  const [savedInternships,
    setSavedInternships] =
    useState([]);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const applicationsRes =
            await API.get(
              "/applications/my"
            );

          setApplications(
            applicationsRes.data || []
          );

          const savedRes =
            await API.get(
              "/internships/saved/all"
            );

          setSavedInternships(
            savedRes.data || []
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchData();

  }, []);

  const removeSaved =
    async (id) => {

      try {

        await API.delete(
          `/internships/save/${id}`
        );

        setSavedInternships(

          savedInternships.filter(

            (item) =>
              item._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Student Dashboard
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Saved Internships
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {
          savedInternships.length === 0 ? (

            <p>No saved internships</p>

          ) : (

            savedInternships.map(

              (item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5"
                >

                  <h3 className="text-2xl font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="mb-2">
                    <b>Company:</b>
                    {" "}
                    {item.company}
                  </p>

                  <p className="mb-4">
                    <b>Location:</b>
                    {" "}
                    {item.location}
                  </p>

                  <button
                    onClick={() =>
                      removeSaved(
                        item._id
                      )
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>

                </div>
              ))
          )
        }

      </div>

      <h2 className="text-2xl font-semibold mb-4">
        My Applications
      </h2>

      {
        applications.length === 0 ? (

          <p>No applications found</p>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {
              applications.map(

                (app) => (

                  <div
                    key={app._id}
                    className="bg-white rounded-xl shadow-md p-5"
                  >

                    <h3 className="text-2xl font-semibold mb-3">
                      {
                        app.internshipId
                          ?.title
                      }
                    </h3>

                    <p className="mb-2">

                      <span className="font-bold">
                        Company:
                      </span>

                      {" "}

                      {
                        app.internshipId
                          ?.company
                      }

                    </p>

                    <p>

                      <span className="font-bold">
                        Status:
                      </span>

                      {" "}

                      <span
                        className={`
                          px-3 py-1 rounded-full text-white text-sm

                          ${
                            app.status ===
                            "approved"
                              ? "bg-green-500"
                              : app.status ===
                                "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }
                        `}
                      >

                        {app.status}

                      </span>

                    </p>

                  </div>
                ))
            }

          </div>
        )
      }

    </div>
  );
}

export default StudentDashboard;