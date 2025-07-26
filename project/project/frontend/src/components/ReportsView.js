"use client"

import { useState } from "react"

function ReportsView() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Track project performance and team productivity</p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`${
                activeTab === "projects"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab("team")}
              className={`${
                activeTab === "team"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Team Performance
            </button>
            <button
              onClick={() => setActiveTab("budget")}
              className={`${
                activeTab === "budget"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Budget
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "overview" && (
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="card">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-primary-100 text-primary-600">
                    <i className="fas fa-project-diagram text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Active Projects</p>
                    <p className="text-3xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Completed Tasks</p>
                    <p className="text-3xl font-semibold text-gray-900">42</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">In Progress</p>
                    <p className="text-3xl font-semibold text-gray-900">15</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 p-3 rounded-md bg-red-100 text-red-600">
                    <i className="fas fa-exclamation-triangle text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Overdue</p>
                    <p className="text-3xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Project Progress</h3>
              </div>
              <div className="card-body">
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <i className="fas fa-chart-bar text-4xl mb-3"></i>
                    <p>Chart visualization will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-medium text-gray-900">Task Completion Trend</h3>
              </div>
              <div className="card-body">
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <i className="fas fa-chart-line text-4xl mb-3"></i>
                    <p>Chart visualization will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Project Status Distribution</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-pie text-4xl mb-3"></i>
                  <p>Pie chart showing project status distribution</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Budget vs Actual Spending</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-3"></i>
                  <p>Bar chart comparing budget vs actual spending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Team Performance</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-3"></i>
                  <p>Team performance comparison chart</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Workload Distribution</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-pie text-4xl mb-3"></i>
                  <p>Workload distribution among team members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Budget Utilization</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-line text-4xl mb-3"></i>
                  <p>Budget utilization over time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-medium text-gray-900">Cost Breakdown</h3>
            </div>
            <div className="card-body">
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <i className="fas fa-chart-pie text-4xl mb-3"></i>
                  <p>Cost breakdown by category</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportsView
