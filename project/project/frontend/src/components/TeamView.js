"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import apiService from "../services/api"

function TeamView() {
  const { currentUser } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentUser) {
      fetchTeamMembers()
    }
  }, [currentUser])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get all users (assuming current user is admin)
      const response = await apiService.getAllUsers(currentUser.id)
      setTeamMembers(response.data?.users || [])
    } catch (error) {
      console.error('Error fetching team members:', error)
      setError('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading team members...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your team members and their assignments</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="btn btn-primary">
            <i className="fas fa-user-plus mr-2"></i>
            Add Member
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 max-w-md"
          />
        </div>
      </div>

      {teamMembers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No team members found</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div key={member.id} className="card">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="avatar avatar-lg mr-4">{getInitials(member.name)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="badge badge-success">Active</span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-envelope mr-2 w-4"></i>
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="fas fa-user mr-2 w-4"></i>
                    <span>{member.role}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {member.projects ? member.projects.length : 0}
                      </div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-green-600">
                        {member.role === 'admin' ? 'Admin' : 'Member'}
                      </div>
                      <div className="text-xs text-gray-500">Role</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="btn btn-outline btn-sm flex-1">
                    <i className="fas fa-eye mr-1"></i>
                    View
                  </button>
                  <button className="btn btn-outline btn-sm flex-1">
                    <i className="fas fa-edit mr-1"></i>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamView
