"use client"

import { useState } from "react"

function SettingsView() {
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+91 98765 43210",
    role: "Project Manager",
    department: "Engineering",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    projectUpdates: true,
    weeklyReports: false,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    console.log("Profile updated:", profile)
    // Here you would typically send the data to your backend
  }

  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    console.log("Notifications updated:", notifications)
    // Here you would typically send the data to your backend
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("profile")}
              className={`${
                activeTab === "profile"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`${
                activeTab === "notifications"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`${
                activeTab === "security"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Security
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`${
                activeTab === "preferences"
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Preferences
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "profile" && (
        <div className="card max-w-2xl">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-500">Update your personal information and contact details.</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleProfileSubmit}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={profile.role}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={profile.department}
                    onChange={handleProfileChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="card max-w-2xl">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
            <p className="mt-1 text-sm text-gray-500">Choose how you want to be notified about updates.</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleNotificationSubmit}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                    className="form-checkbox"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                  </div>
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={notifications.pushNotifications}
                    onChange={handleNotificationChange}
                    className="form-checkbox"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Task Reminders</h4>
                    <p className="text-sm text-gray-500">Get reminded about upcoming task deadlines</p>
                  </div>
                  <input
                    type="checkbox"
                    name="taskReminders"
                    checked={notifications.taskReminders}
                    onChange={handleNotificationChange}
                    className="form-checkbox"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Project Updates</h4>
                    <p className="text-sm text-gray-500">Receive notifications about project changes</p>
                  </div>
                  <input
                    type="checkbox"
                    name="projectUpdates"
                    checked={notifications.projectUpdates}
                    onChange={handleNotificationChange}
                    className="form-checkbox"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Weekly Reports</h4>
                    <p className="text-sm text-gray-500">Receive weekly summary reports</p>
                  </div>
                  <input
                    type="checkbox"
                    name="weeklyReports"
                    checked={notifications.weeklyReports}
                    onChange={handleNotificationChange}
                    className="form-checkbox"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button type="submit" className="btn btn-primary">
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div className="card max-w-2xl">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <p className="mt-1 text-sm text-gray-500">Manage your password and security preferences.</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Change Password</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input type="password" id="currentPassword" className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input type="password" id="newPassword" className="form-input" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input type="password" id="confirmPassword" className="form-input" />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary">Update Password</button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="btn btn-outline">Enable 2FA</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="card max-w-2xl">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Application Preferences</h3>
            <p className="mt-1 text-sm text-gray-500">Customize your application experience.</p>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select id="theme" className="form-select">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select id="language" className="form-select">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select id="timezone" className="form-select">
                  <option value="IST">India Standard Time (IST)</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                  <option value="PST">Pacific Standard Time (PST)</option>
                </select>
              </div>

              <div>
                <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select id="dateFormat" className="form-select">
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>

              <div className="mt-6">
                <button className="btn btn-primary">Save Preferences</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsView
