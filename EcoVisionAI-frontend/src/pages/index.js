import React from "react";

export default function DashboardPage() {
    return (
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col text-white">
            {/* Header Section */}
            <header className="flex items-center justify-between w-full px-6 py-4 bg-gray-900 shadow-lg">
                <h1 className="text-2xl font-bold">CommuneVerse Dashboard</h1>
                <button
                    onClick={() => (window.location.href = "/logout")}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-grow p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ESG Score Section */}
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Project ESG Score</h2>
                        <p className="text-4xl font-bold text-green-400">85</p>
                        <p className="mt-2 text-sm text-gray-300">
                            Your project has a high ESG score based on environmental, social, and governance metrics.
                        </p>
                    </div>

                    {/* Optimization Suggestions */}
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Optimization Insights</h2>
                        <ul className="list-disc ml-6 space-y-2">
                            <li>Allocate resources to projects with scores above 70.</li>
                            <li>Reduce budget allocation for low-impact initiatives.</li>
                            <li>Diversify investments across renewable energy and green infrastructure.</li>
                        </ul>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-gray-700 p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                        <ul className="space-y-2">
                            <li className="text-sm">
                                <span className="font-semibold text-blue-400">[12:00 PM]</span> ESG score updated for Project X.
                            </li>
                            <li className="text-sm">
                                <span className="font-semibold text-blue-400">[11:30 AM]</span> Optimization report generated.
                            </li>
                            <li className="text-sm">
                                <span className="font-semibold text-blue-400">[10:45 AM]</span> User logged in and accessed dashboard.
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Projects Overview */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Projects Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Green Energy Plant",
                                location: "Chennai",
                                budget: "$2M",
                                status: "High Priority",
                            },
                            {
                                title: "Desalination Plant",
                                location: "Mumbai",
                                budget: "$1.5M",
                                status: "Moderate Priority",
                            },
                            {
                                title: "Solar Power Grid",
                                location: "Delhi",
                                budget: "$3M",
                                status: "High Priority",
                            },
                        ].map((project, index) => (
                            <div
                                key={index}
                                className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition"
                            >
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-300">
                                    Location: {project.location}
                                </p>
                                <p className="text-sm text-gray-300">
                                    Budget: {project.budget}
                                </p>
                                <p className="text-sm">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${
                                            project.status === "High Priority"
                                                ? "text-green-400"
                                                : "text-yellow-400"
                                        }`}
                                    >
                                        {project.status}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Section */}
            <footer className="w-full text-center py-4 bg-gray-900">
                <p className="text-sm text-gray-400">
                    @Powered by RMS Troopso | Green Finance Optimization Platform
                </p>
            </footer>
        </div>
    );
}
