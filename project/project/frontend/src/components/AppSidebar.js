"use client"

function AppSidebar({ activeView, onViewChange, isOpen, onToggle }) {
  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: "fas fa-home" },
    { id: "projects", name: "Projects", icon: "fas fa-project-diagram" },
    { id: "tasks", name: "Tasks", icon: "fas fa-tasks" },
    { id: "team", name: "Team", icon: "fas fa-users" },
    { id: "reports", name: "Reports", icon: "fas fa-chart-bar" },
    { id: "inventory", name: "Inventory", icon: "fas fa-boxes" },
    { id: "settings", name: "Settings", icon: "fas fa-cog" },
  ]

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={onToggle}
      ></div>

      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto md:relative md:flex md:flex-col`}
      >
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mr-2">
            PM
          </div>
          <span className="text-xl font-bold text-gray-900">ProjectHub</span>
        </div>
        <div className="mt-5 flex-1 flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`${
                  activeView === item.id
                    ? "bg-primary-50 text-primary-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                } group flex items-center px-2 py-2 text-base font-medium rounded-md cursor-pointer`}
              >
                <i className={`${item.icon} mr-3 text-gray-400 group-hover:text-gray-500`}></i>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="avatar avatar-md">JD</div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs font-medium text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AppSidebar
