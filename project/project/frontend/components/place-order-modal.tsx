"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, ShoppingCart } from "lucide-react"

interface PlaceOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: any
}

export function PlaceOrderModal({ open, onOpenChange, item }: PlaceOrderModalProps) {
  const [orderQuantity, setOrderQuantity] = useState("")
  const [urgency, setUrgency] = useState("normal")
  const [notes, setNotes] = useState("")
  const [supplier, setSupplier] = useState("")

  const handlePlaceOrder = () => {
    // Here you would typically send the order to your backend
    console.log("Placing order:", {
      item: item?.name,
      quantity: orderQuantity,
      urgency,
      notes,
      supplier,
    })

    onOpenChange(false)
    // Reset form
    setOrderQuantity("")
    setUrgency("normal")
    setNotes("")
    setSupplier("")
  }

  if (!item) return null

  const suggestedQuantity = Math.max(item.minimumCount * 2 - item.availableCount, item.minimumCount)
  const totalCost = Number.parseInt(orderQuantity || "0") * item.costPerPiece

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 backdrop-blur-xl border-white/20 shadow-2xl">
        <DialogHeader className="space-y-2 pb-2">
          <DialogTitle className="flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg">
              <ShoppingCart className="h-4 w-4 text-white" />
            </div>
            <span className="truncate">Place Order - {item.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {/* Stock Alert */}
          <div className="flex items-start space-x-2 p-2.5 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200/50 rounded-lg shadow-sm">
            <div className="p-1 bg-red-100 rounded-md">
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <div className="font-medium text-red-800 text-sm">Low Stock Alert</div>
              <div className="text-xs text-red-600">
                Current stock ({item.availableCount}) is below minimum ({item.minimumCount})
              </div>
            </div>
          </div>

          {/* Current Stock Info */}
          <div className="grid grid-cols-2 gap-3 p-2.5 bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200/50 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600">Current Stock</div>
              <div className="text-lg font-bold text-red-600">{item.availableCount}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600">Minimum Required</div>
              <div className="text-lg font-bold text-gray-800">{item.minimumCount}</div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Order Quantity</Label>
            <Input
              type="number"
              placeholder={`Suggested: ${suggestedQuantity}`}
              value={orderQuantity}
              onChange={(e) => setOrderQuantity(e.target.value)}
              min="1"
              className="h-9 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-all duration-200"
            />
            <div className="text-xs text-gray-500">Suggested: {suggestedQuantity} units</div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Supplier</Label>
            <Input
              placeholder={item.supplier || "Enter supplier name"}
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="h-9 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-all duration-200"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Urgency</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger className="h-9 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-all duration-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-gray-200 shadow-xl">
                <SelectItem value="low" className="rounded-md">
                  Low - Standard delivery
                </SelectItem>
                <SelectItem value="normal" className="rounded-md">
                  Normal - 3-5 days
                </SelectItem>
                <SelectItem value="high" className="rounded-md">
                  High - 1-2 days
                </SelectItem>
                <SelectItem value="urgent" className="rounded-md">
                  Urgent - Same day
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">Notes</Label>
            <Textarea
              placeholder="Additional notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg transition-all duration-200 resize-none"
            />
          </div>

          {/* Cost Calculation */}
          {orderQuantity && (
            <div className="p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-blue-700">Total Cost:</span>
                <span className="text-lg font-bold text-blue-800">₹{totalCost.toLocaleString()}</span>
              </div>
              <div className="text-xs text-blue-600">
                {orderQuantity} units × ₹{item.costPerPiece}
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-9 border-gray-200 hover:bg-gray-50 rounded-lg transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePlaceOrder}
              disabled={!orderQuantity}
              className="flex-1 h-9 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              Place Order
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
