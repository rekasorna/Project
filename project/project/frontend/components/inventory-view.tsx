"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Download,
  Filter,
  Upload,
  Plus,
  MoreHorizontal,
  Package,
  AlertTriangle,
  CheckCircle,
  Edit,
  ShoppingCart,
  FileUp,
  Columns,
  FileText,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UpdateStockModal } from "@/components/update-stock-modal"
import { AddPartModal } from "@/components/add-part-modal"
import { ImportStockModal } from "@/components/import-stock-modal"
import { PlaceOrderModal } from "@/components/place-order-modal"
import { RequestQuoteModal } from "@/components/request-quote-modal"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InventoryItem {
  id: number
  name: string
  facility: string
  storeLocation: string
  partLocation: string
  availableCount: number
  minimumCount: number
  costPerPiece: number
  category: string
  supplier: string
  lastUpdated: string
}

export function InventoryView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false)
  const [showAddPartModal, setShowAddPartModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)

  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([
    {
      id: 1,
      name: "Screw .5 mm",
      facility: "Primary-Facility-1",
      storeLocation: "loc1",
      partLocation: "Building 1",
      availableCount: 5928,
      minimumCount: 5,
      costPerPiece: 200,
      category: "Fasteners",
      supplier: "ABC Hardware",
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      name: "Screw .8 mm",
      facility: "Primary-Facility-1",
      storeLocation: "loc2",
      partLocation: "Building 1",
      availableCount: 53,
      minimumCount: 101,
      costPerPiece: 10,
      category: "Fasteners",
      supplier: "ABC Hardware",
      lastUpdated: "2024-01-19",
    },
    {
      id: 3,
      name: "Arm 3 point and Arm",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 4965,
      minimumCount: 5,
      costPerPiece: 25,
      category: "Mechanical Parts",
      supplier: "XYZ Components",
      lastUpdated: "2024-01-18",
    },
    {
      id: 4,
      name: "Lower Joint",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 3998,
      minimumCount: 5,
      costPerPiece: 10,
      category: "Mechanical Parts",
      supplier: "XYZ Components",
      lastUpdated: "2024-01-17",
    },
    {
      id: 5,
      name: "Upper Joint",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 4481,
      minimumCount: 5,
      costPerPiece: 30.5,
      category: "Mechanical Parts",
      supplier: "XYZ Components",
      lastUpdated: "2024-01-16",
    },
    {
      id: 6,
      name: "Lower Joint Screw - 3",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 2981,
      minimumCount: 210,
      costPerPiece: 55,
      category: "Fasteners",
      supplier: "ABC Hardware",
      lastUpdated: "2024-01-15",
    },
    {
      id: 7,
      name: "Upper Joint Screw .8 mm",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 2188,
      minimumCount: 251,
      costPerPiece: 60,
      category: "Fasteners",
      supplier: "ABC Hardware",
      lastUpdated: "2024-01-14",
    },
    {
      id: 8,
      name: "Hydraulic hoses and fittings",
      facility: "Primary-Facility-1",
      storeLocation: "",
      partLocation: "",
      availableCount: 7965,
      minimumCount: 11,
      costPerPiece: 1,
      category: "Hydraulics",
      supplier: "Hydraulic Solutions",
      lastUpdated: "2024-01-13",
    },
    {
      id: 9,
      name: "Pneumatic cylinders",
      facility: "Primary-Facility-1",
      storeLocation: "location_1",
      partLocation: "",
      availableCount: 8985,
      minimumCount: 330,
      costPerPiece: 400,
      category: "Pneumatics",
      supplier: "Pneumatic Systems",
      lastUpdated: "2024-01-12",
    },
    {
      id: 10,
      name: "Seals and O-rings",
      facility: "Primary-Facility-1",
      storeLocation: "location_2",
      partLocation: "",
      availableCount: 5991,
      minimumCount: 340,
      costPerPiece: 405,
      category: "Sealing",
      supplier: "Seal Tech",
      lastUpdated: "2024-01-11",
    },
    {
      id: 11,
      name: "Fluid (oil or air filters)",
      facility: "Primary-Facility-1",
      storeLocation: "location_3",
      partLocation: "",
      availableCount: 4990,
      minimumCount: 350,
      costPerPiece: 410,
      category: "Filters",
      supplier: "Filter Pro",
      lastUpdated: "2024-01-10",
    },
    {
      id: 12,
      name: "Spindle assembly",
      facility: "Primary-Facility-1",
      storeLocation: "location_4",
      partLocation: "",
      availableCount: 5391,
      minimumCount: 360,
      costPerPiece: 415,
      category: "Mechanical Parts",
      supplier: "Precision Parts",
      lastUpdated: "2024-01-09",
    },
    {
      id: 13,
      name: "Bearings",
      facility: "Primary-Facility-1",
      storeLocation: "location_5",
      partLocation: "",
      availableCount: 5493,
      minimumCount: 370,
      costPerPiece: 420,
      category: "Mechanical Parts",
      supplier: "Bearing Solutions",
      lastUpdated: "2024-01-08",
    },
  ])

  // Filter data based on search and filters
  const filteredData = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Get unique facilities and categories for filters
  const categories = [...new Set(inventoryData.map((item) => item.category))]

  const getStockStatus = (available: number, minimum: number) => {
    if (available <= minimum) {
      return { status: "critical", color: "text-red-600", bgColor: "bg-red-100" }
    } else if (available <= minimum * 1.5) {
      return { status: "low", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    } else {
      return { status: "good", color: "text-green-600", bgColor: "bg-green-100" }
    }
  }

  const getStockIcon = (available: number, minimum: number) => {
    const status = getStockStatus(available, minimum)
    switch (status.status) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "low":
        return <Package className="h-4 w-4 text-amber-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-emerald-500" />
    }
  }

  const handleUpdateStock = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowUpdateStockModal(true)
  }

  const handlePlaceOrder = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowOrderModal(true)
  }

  const handleRequestQuote = (item: InventoryItem) => {
    setSelectedItem(item)
    setShowQuoteModal(true)
  }

  const handleStockUpdate = (itemId: number, newStock: number) => {
    setInventoryData((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, availableCount: newStock, lastUpdated: new Date().toISOString().split("T")[0] }
          : item,
      ),
    )
  }

  const handleAddPart = (newPart: Omit<InventoryItem, "id">) => {
    const newId = Math.max(...inventoryData.map((item) => item.id)) + 1
    setInventoryData((prev) => [...prev, { ...newPart, id: newId }])
  }

  const handleImportStock = (importedData: Omit<InventoryItem, "id">[]) => {
    const newItems = importedData.map((item, index) => ({
      ...item,
      id: Math.max(...inventoryData.map((item) => item.id)) + index + 1,
    }))
    setInventoryData((prev) => [...prev, ...newItems])
  }

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Parts Inventory</h1>
          <p className="text-gray-600 font-medium">
            Parts <span className="text-blue-600">({filteredData.length} records)</span>
          </p>
        </div>
        <TooltipProvider>
          <div className="flex items-center space-x-2">
            {/* Expandable Search */}
            <div className="flex items-center">
              {isSearchExpanded ? (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Input
                      placeholder="Search parts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      autoFocus
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSearchExpanded(false)
                      setSearchTerm("")
                    }}
                    className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  >
                    <Search className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => setIsSearchExpanded(true)}
                      className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    >
                      <Search className="h-4 w-4 text-gray-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                >
                  <Download className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                >
                  <Columns className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Column</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    >
                      <Filter className="h-4 w-4 text-gray-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg border-gray-200">
                <div className="p-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Filter by Category</p>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200 shadow-lg">
                      <SelectItem value="all" className="hover:bg-gray-50">
                        All Categories
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category} className="hover:bg-gray-50">
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  onClick={() => setShowImportModal(true)}
                  className="h-10 w-10 p-0 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                >
                  <Upload className="h-4 w-4 text-gray-600" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Import</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setShowAddPartModal(true)}
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Part
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Part</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Search and Filters - Removed */}
      <div className="hidden"></div>

      {/* Inventory Table */}
      <Card className="shadow-sm border-gray-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Facility</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Store Location</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Part Location</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Available Count</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Minimum Count</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Cost per piece</th>
                  <th className="text-left p-4 font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => {
                  const stockStatus = getStockStatus(item.availableCount, item.minimumCount)
                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          {getStockIcon(item.availableCount, item.minimumCount)}
                          <span className="font-medium text-gray-900">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 text-sm">{item.facility}</td>
                      <td className="p-4 text-gray-600 text-sm">{item.storeLocation || "-"}</td>
                      <td className="p-4 text-gray-600 text-sm">{item.partLocation || "-"}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold ${stockStatus.color}`}>
                            {item.availableCount.toLocaleString()}
                          </span>
                          {item.availableCount <= item.minimumCount && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs font-medium px-2 py-1">
                              Low Stock
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-gray-600 font-medium text-sm">{item.minimumCount.toLocaleString()}</td>
                      <td className="p-4 font-semibold text-gray-900">₹{item.costPerPiece.toLocaleString()}</td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-lg">
                              <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="shadow-lg border-gray-200">
                            <DropdownMenuItem onClick={() => handleUpdateStock(item)} className="hover:bg-gray-50">
                              <Edit className="h-4 w-4 mr-2 text-gray-600" />
                              Update Stock
                            </DropdownMenuItem>
                            {item.availableCount <= item.minimumCount && (
                              <>
                                <DropdownMenuItem onClick={() => handlePlaceOrder(item)} className="hover:bg-gray-50">
                                  <ShoppingCart className="h-4 w-4 mr-2 text-gray-600" />
                                  Place Order
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRequestQuote(item)} className="hover:bg-gray-50">
                                  <FileText className="h-4 w-4 mr-2 text-gray-600" />
                                  Request Quote
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuItem className="hover:bg-gray-50">
                              <FileUp className="h-4 w-4 mr-2 text-gray-600" />
                              View History
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger className="w-32 h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-gray-200 shadow-lg">
              <SelectItem value="10" className="hover:bg-gray-50">
                10 / page
              </SelectItem>
              <SelectItem value="20" className="hover:bg-gray-50">
                20 / page
              </SelectItem>
              <SelectItem value="50" className="hover:bg-gray-50">
                50 / page
              </SelectItem>
              <SelectItem value="100" className="hover:bg-gray-50">
                100 / page
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-9 px-3 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </Button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 p-0 ${
                  currentPage === pageNum
                    ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </Button>
            )
          })}
          {totalPages > 5 && <span className="text-gray-400 px-2">...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="h-9 px-3 border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Modals */}
      <UpdateStockModal
        open={showUpdateStockModal}
        onOpenChange={setShowUpdateStockModal}
        item={selectedItem}
        onUpdateStock={handleStockUpdate}
      />
      <AddPartModal open={showAddPartModal} onOpenChange={setShowAddPartModal} onAddPart={handleAddPart} />
      <ImportStockModal open={showImportModal} onOpenChange={setShowImportModal} onImportStock={handleImportStock} />
      <PlaceOrderModal open={showOrderModal} onOpenChange={setShowOrderModal} item={selectedItem} />
      <RequestQuoteModal open={showQuoteModal} onOpenChange={setShowQuoteModal} item={selectedItem} />
    </div>
  )
}
