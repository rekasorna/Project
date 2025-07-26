"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface UpdateStockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
  onUpdateStock: (itemId: number, newStock: number) => void
}

export function UpdateStockModal({ open, onOpenChange, item, onUpdateStock }: UpdateStockModalProps) {
  const [newStock, setNewStock] = useState("")
  const [updateType, setUpdateType] = useState("add")
  const [reason, setReason] = useState("")

  useEffect(() => {
    if (item) {
      setNewStock("")
      setUpdateType("add")
      setReason("")
    }
  }, [item])

  const handleUpdate = () => {
    if (!item || !newStock) return

    const stockChange = Number.parseInt(newStock)
    let finalStock = item.availableCount

    if (updateType === "add") {
      finalStock += stockChange
    } else if (updateType === "subtract") {
      finalStock = Math.max(0, finalStock - stockChange)
    } else {
      finalStock = stockChange
    }

    onUpdateStock(item.id, finalStock)
    onOpenChange(false)
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Stock - {item.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Stock</Label>
            <div className="text-2xl font-bold text-blue-600">{item.availableCount.toLocaleString()} units</div>
          </div>

          <div className="space-y-2">
            <Label>Update Type</Label>
            <Select value={updateType} onValueChange={setUpdateType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add Stock</SelectItem>
                <SelectItem value="subtract">Remove Stock</SelectItem>
                <SelectItem value="set">Set Exact Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              {updateType === "add"
                ? "Quantity to Add"
                : updateType === "subtract"
                  ? "Quantity to Remove"
                  : "New Stock Amount"}
            </Label>
            <Input
              type="number"
              placeholder="Enter quantity"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label>Reason for Update</Label>
            <Textarea
              placeholder="Enter reason for stock update..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {newStock && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Preview:</div>
              <div className="font-medium">
                {item.availableCount.toLocaleString()} →{" "}
                {updateType === "add"
                  ? (item.availableCount + Number.parseInt(newStock)).toLocaleString()
                  : updateType === "subtract"
                    ? Math.max(0, item.availableCount - Number.parseInt(newStock)).toLocaleString()
                    : Number.parseInt(newStock).toLocaleString()}{" "}
                units
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={!newStock} className="flex-1">
              Update Stock
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
