"use client"

import { useState } from "react"

function InventoryView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const inventoryItems = [
    {
      id: 1,
      name: "Lithium-ion Battery Cells",
      category: "Electronics",
      sku: "BAT-LI-001",
      quantity: 150,
      minStock: 50,
      unit: "pieces",
      unitPrice: 12500,
      supplier: "BatteryTech Solutions",
      location: "Warehouse A-1",
      lastUpdated: "2024-03-15",
    },
    {
      id: 2,
      name: "Electric Motor Controller",
      category: "Electronics",
      sku: "MOT-CTL-002",
      quantity: 25,
      minStock: 10,
      unit: "pieces",
      unitPrice: 85000,
      supplier: "MotorDrive Systems",
      location: "Warehouse A-2",
      lastUpdated: "2024-03-14",
    },
    {
      id: 3,
      name: "Steel Chassis Frame",
      category: "Mechanical",
      sku: "CHA-STL-003",
      quantity: 8,
      minStock: 5,
      unit: "pieces",
      unitPrice: 125000,
      supplier: "SteelWorks Manufacturing",
      location: "Warehouse B-1",
      lastUpdated: "2024-03-13",
    },
    {
      id: 4,
      name: "Hydraulic Brake System",
      category: "Mechanical",
      sku: "BRK-HYD-004",
      quantity: 12,
      minStock: 8,
      unit: "sets",
      unitPrice: 45000,
      supplier: "BrakeTech Industries",
      location: "Warehouse B-2",
      lastUpdated: "2024-03-12",
    },
    {
      id: 5,
      name: "LED Headlight Assembly",
      category: "Electrical",
      sku: "LED-HLT-005",
      quantity: 30,
      minStock: 15,
      unit: "pairs",
      unitPrice: 8500,
      supplier: "LightTech Components",
      location: "Warehouse C-1",
      lastUpdated: "2024-03-11",
    },
  ]

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const getStockStatus = (quantity, minStock) => {
    if (quantity <= minStock) {
      return { status: "Low Stock", class: "badge-danger" }
    } else if (quantity <= minStock * 1.5) {
      return { status: "Medium Stock", class: "badge-warning" }
    } else {
      return { status: "In Stock", class: "badge-success" }
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your inventory items</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="btn btn-outline">
            <i className="fas fa-download mr-2"></i>
            Export
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-plus mr-2"></i>
            Add Item
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="form-select">
          <option value="all">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Electrical">Electrical</option>
        </select>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  SKU
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unit Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => {
                const stockStatus = getStockStatus(item.quantity, item.minStock)
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.supplier}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="badge badge-secondary">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${stockStatus.class}`}>{stockStatus.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{item.unitPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-blue-100 text-blue-600">
                <i className="fas fa-boxes text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Items</p>
                <p className="text-3xl font-semibold text-gray-900">{inventoryItems.length}</p>
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
                <p className="text-sm font-medium text-gray-500">Low Stock</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {inventoryItems.filter((item) => item.quantity <= item.minStock).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-green-100 text-green-600">
                <i className="fas fa-rupee-sign text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Value</p>
                <p className="text-3xl font-semibold text-gray-900">
                  ₹{(inventoryItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) / 100000).toFixed(1)}
                  L
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 rounded-md bg-yellow-100 text-yellow-600">
                <i className="fas fa-warehouse text-xl"></i>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <p className="text-3xl font-semibold text-gray-900">
                  {[...new Set(inventoryItems.map((item) => item.category))].length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InventoryView
