import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import API from "../services/api";

function AdminDashboard() {

  const [stats, setStats] =
    useState({});

  const [applications,
    setApplications] =
    useState([]);

  const fetchData =
    async () => {

      try {

        const statsRes =
          await API.get(
            "/dashboard/admin"
          );

        setStats(
          statsRes.data
        );

        const applicationsRes =
          await API.get(
            "/applications/all"
          );

        const validApplications =
          (
            applicationsRes.data || []
          ).filter(
            (app) =>
              app.internshipId
          );

        setApplications(
          validApplications
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    const loadData =
      async () => {

        await fetchData();

      };

    loadData();

  }, []);

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        await API.patch(
          `/applications/${id}/status`,
          { status }
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }
    };

  const deleteApplication =
    async (id) => {

      try {

        await API.delete(
          `/applications/${id}`
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }
    };

  const pieData = [

    {
      name: "Approved",
      value:
        stats.approvedApplications || 0
    },

    {
      name: "Rejected",
      value:
        stats.rejectedApplications || 0
    },

    {
      name: "Pending",
      value:
        stats.pendingApplications || 0
    }
  ];

  const barData = [

    {
      name: "Students",
      value:
        stats.totalStudents || 0
    },

    {
      name: "Recruiters",
      value:
        stats.totalRecruiters || 0
    },

    {
      name: "Internships",
      value:
        stats.totalInternships || 0
    },

    {
      name: "Applications",
      value:
        stats.totalApplications || 0
    }
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#facc15"
  ];

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">
            Students
          </h2>

          <p className="text-4xl font-bold text-blue-600">
            {stats.totalStudents || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">
            Recruiters
          </h2>

          <p className="text-4xl font-bold text-green-600">
            {stats.totalRecruiters || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">
            Internships
          </h2>

          <p className="text-4xl font-bold text-purple-600">
            {stats.totalInternships || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">
            Applications
          </h2>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalApplications || 0}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Application Status
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                label
              >

                {
                  pieData.map(
                    (
                      entry,
                      index
                    ) => (

                      <Cell
                        key={index}
                        fill={
                          COLORS[index]
                        }
                      />
                    ))
                }

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Platform Statistics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="value"
                fill="#2563eb"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <h2 className="text-3xl font-semibold mb-6">
        Applications
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

                    <p className="mb-2">
                      <b>Student:</b>
                      {" "}
                      {
                        app.studentId?.name
                      }
                    </p>

                    <p className="mb-2">
                      <b>Email:</b>
                      {" "}
                      {
                        app.studentId?.email
                      }
                    </p>

                    <p className="mb-4">
                      <b>Internship:</b>
                      {" "}
                      {
                        app.internshipId?.title
                      }
                    </p>

                    <p className="mb-4">

                      <b>Status:</b>
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

                    <div className="flex gap-2 flex-wrap">

                      <button
                        onClick={() =>
                          updateStatus(
                            app._id,
                            "approved"
                          )
                        }
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(
                            app._id,
                            "rejected"
                          )
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() =>
                          deleteApplication(
                            app._id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))
            }

          </div>
        )
      }

    </div>
  );
}

export default AdminDashboard;