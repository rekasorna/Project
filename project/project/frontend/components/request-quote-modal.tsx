"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, Building2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ChevronDown, X } from "lucide-react"

interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  rating: number
  specialties: string[]
  lastQuoteDate?: string
  averageResponseTime: string
  location: string
}

interface RequestQuoteModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
}

export function RequestQuoteModal({ open, onOpenChange, item }: RequestQuoteModalProps) {
  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([])
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [openVendorSelect, setOpenVendorSelect] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const vendors: Vendor[] = [
    {
      id: "v1",
      name: "ABC Suppliers",
      email: "sales@abc.com",
      phone: "+1 (555) 123-4567",
      rating: 4.5,
      specialties: ["Fasteners", "Mechanical Parts"],
      averageResponseTime: "24 hours",
      location: "San Francisco, CA",
    },
    {
      id: "v2",
      name: "XYZ Components",
      email: "info@xyz.com",
      phone: "+1 (555) 234-5678",
      rating: 4.2,
      specialties: ["Mechanical Parts", "Hydraulics"],
      averageResponseTime: "48 hours",
      location: "Los Angeles, CA",
    },
    {
      id: "v3",
      name: "Hydraulic Solutions",
      email: "quotes@hysol.com",
      phone: "+1 (555) 345-6789",
      rating: 4.8,
      specialties: ["Hydraulics", "Pneumatics"],
      averageResponseTime: "12 hours",
      location: "Chicago, IL",
    },
    {
      id: "v4",
      name: "Pneumatic Systems",
      email: "sales@pneusys.com",
      phone: "+1 (555) 456-7890",
      rating: 4.0,
      specialties: ["Pneumatics", "Sealing"],
      averageResponseTime: "36 hours",
      location: "New York, NY",
    },
    {
      id: "v5",
      name: "Seal Tech",
      email: "info@sealtech.com",
      phone: "+1 (555) 567-8901",
      rating: 4.6,
      specialties: ["Sealing", "Filters"],
      averageResponseTime: "24 hours",
      location: "Houston, TX",
    },
    {
      id: "v6",
      name: "Filter Pro",
      email: "quotes@filterpro.com",
      phone: "+1 (555) 678-9012",
      rating: 4.3,
      specialties: ["Filters", "Mechanical Parts"],
      averageResponseTime: "48 hours",
      location: "Phoenix, AZ",
    },
    {
      id: "v7",
      name: "Precision Parts",
      email: "sales@precision.com",
      phone: "+1 (555) 789-0123",
      rating: 4.7,
      specialties: ["Mechanical Parts", "Fasteners"],
      averageResponseTime: "12 hours",
      location: "Dallas, TX",
    },
    {
      id: "v8",
      name: "Bearing Solutions",
      email: "info@bearings.com",
      phone: "+1 (555) 890-1234",
      rating: 4.1,
      specialties: ["Mechanical Parts"],
      averageResponseTime: "36 hours",
      location: "Atlanta, GA",
    },
  ]

  const filteredVendors = vendors.filter((vendor) => vendor.name.toLowerCase().includes(searchValue.toLowerCase()))

  const handleVendorSelect = (vendor: Vendor) => {
    setSelectedVendors([...selectedVendors, vendor])
  }

  const handleVendorRemove = (vendorId: string) => {
    setSelectedVendors(selectedVendors.filter((v) => v.id !== vendorId))
  }

  const handleRequestQuote = () => {
    // Here you would typically send the request to your backend
    console.log("Requesting quote:", {
      item: item?.name,
      vendors: selectedVendors.map((v) => v.name),
      additionalNotes,
    })

    onOpenChange(false)
    // Reset form
    setSelectedVendors([])
    setAdditionalNotes("")
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center space-x-3 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span>Request Quote - {item.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Item Information */}
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-gray-200/50 shadow-sm backdrop-blur-sm">
            <CardContent className="space-y-3 p-4">
              <div className="text-sm font-medium text-gray-600">Item Information</div>
              <div className="text-lg font-semibold text-gray-800">{item.name}</div>
              <div className="text-sm text-gray-600 bg-white/50 px-3 py-2 rounded-lg">
                Category: <span className="font-medium">{item.category}</span> | Cost per piece:{" "}
                <span className="font-medium">₹{item.costPerPiece.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Select Vendors</Label>
            <Popover open={openVendorSelect} onOpenChange={setOpenVendorSelect}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openVendorSelect}
                  className="w-full justify-between border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200 min-h-[44px]"
                >
                  {selectedVendors.length > 0
                    ? `${selectedVendors.length} vendor${selectedVendors.length > 1 ? "s" : ""} selected`
                    : "Select Vendors"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[600px] p-0 rounded-xl border-gray-200 shadow-xl">
                <Command className="rounded-xl">
                  <CommandInput
                    placeholder="Search vendors..."
                    value={searchValue}
                    onValueChange={setSearchValue}
                    className="border-0"
                  />
                  <CommandList>
                    <CommandEmpty>No vendors found.</CommandEmpty>
                    <CommandGroup heading="Available Vendors">
                      {filteredVendors.map((vendor) => (
                        <CommandItem
                          key={vendor.id}
                          onSelect={() => {
                            if (!selectedVendors.find((v) => v.id === vendor.id)) {
                              handleVendorSelect(vendor)
                            }
                            setOpenVendorSelect(false)
                            setSearchValue("")
                          }}
                          className="rounded-lg cursor-pointer hover:bg-blue-50"
                          disabled={selectedVendors.find((v) => v.id === vendor.id)}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Building2 className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">{vendor.name}</div>
                                <div className="text-xs text-gray-500">{vendor.location}</div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end space-y-1">
                              <Badge variant="secondary" className="text-xs">
                                {vendor.specialties.join(", ")}
                              </Badge>
                              <div className="text-xs text-gray-500">
                                ⭐ {vendor.rating} • {vendor.averageResponseTime}
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedVendors.length > 0 && (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-600">Selected Vendors ({selectedVendors.length})</div>
                <div className="grid gap-3">
                  {selectedVendors.map((vendor) => (
                    <div
                      key={vendor.id}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Building2 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{vendor.name}</div>
                          <div className="text-sm text-gray-600">
                            {vendor.email} • {vendor.phone}
                          </div>
                          <div className="text-xs text-gray-500">
                            ⭐ {vendor.rating} • Response: {vendor.averageResponseTime}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVendorRemove(vendor.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Additional Notes */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Additional Notes</Label>
            <Textarea
              placeholder="Enter any additional notes or specifications..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={4}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-all duration-200 resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-6">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRequestQuote}
              disabled={selectedVendors.length === 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              Request Quote ({selectedVendors.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
