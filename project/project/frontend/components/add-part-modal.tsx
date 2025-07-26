"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddPartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddPart: (part: any) => void
}

export function AddPartModal({ open, onOpenChange, onAddPart }: AddPartModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    facility: "",
    storeLocation: "",
    partLocation: "",
    availableCount: "",
    minimumCount: "",
    costPerPiece: "",
    category: "",
    supplier: "",
    description: "",
  })

  const facilities = ["Primary-Facility-1", "Secondary-Facility-2", "Warehouse-A"]
  const categories = ["Fasteners", "Mechanical Parts", "Hydraulics", "Pneumatics", "Sealing", "Filters"]

  const handleSubmit = () => {
    if (
      !formData.name ||
      !formData.facility ||
      !formData.availableCount ||
      !formData.minimumCount ||
      !formData.costPerPiece
    ) {
      return
    }

    const newPart = {
      ...formData,
      availableCount: Number.parseInt(formData.availableCount),
      minimumCount: Number.parseInt(formData.minimumCount),
      costPerPiece: Number.parseFloat(formData.costPerPiece),
      lastUpdated: new Date().toISOString().split("T")[0],
    }

    onAddPart(newPart)
    onOpenChange(false)
    setFormData({
      name: "",
      facility: "",
      storeLocation: "",
      partLocation: "",
      availableCount: "",
      minimumCount: "",
      costPerPiece: "",
      category: "",
      supplier: "",
      description: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Part</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Part Name *</Label>
              <Input
                placeholder="Enter part name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Facility *</Label>
              <Select
                value={formData.facility}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, facility: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility} value={facility}>
                      {facility}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Supplier</Label>
              <Input
                placeholder="Enter supplier name"
                value={formData.supplier}
                onChange={(e) => setFormData((prev) => ({ ...prev, supplier: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Store Location</Label>
              <Input
                placeholder="e.g., loc1, location_1"
                value={formData.storeLocation}
                onChange={(e) => setFormData((prev) => ({ ...prev, storeLocation: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Part Location</Label>
              <Input
                placeholder="e.g., Building 1, Warehouse A"
                value={formData.partLocation}
                onChange={(e) => setFormData((prev) => ({ ...prev, partLocation: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Available Count *</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.availableCount}
                onChange={(e) => setFormData((prev) => ({ ...prev, availableCount: e.target.value }))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Count *</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.minimumCount}
                onChange={(e) => setFormData((prev) => ({ ...prev, minimumCount: e.target.value }))}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Cost per Piece (₹) *</Label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.costPerPiece}
                onChange={(e) => setFormData((prev) => ({ ...prev, costPerPiece: e.target.value }))}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter part description..."
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Add Part
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
