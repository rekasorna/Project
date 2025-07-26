"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, FileText, Download } from "lucide-react"

interface ImportStockModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImportStock: (data: any[]) => void
}

export function ImportStockModal({ open, onOpenChange, onImportStock }: ImportStockModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleImport = async () => {
    if (!selectedFile) return

    setIsProcessing(true)

    // Simulate file processing
    setTimeout(() => {
      // Mock imported data
      const mockData = [
        {
          name: "Imported Part 1",
          facility: "Primary-Facility-1",
          storeLocation: "loc1",
          partLocation: "Building 1",
          availableCount: 1000,
          minimumCount: 50,
          costPerPiece: 15.5,
          category: "Imported",
          supplier: "Import Supplier",
          lastUpdated: new Date().toISOString().split("T")[0],
        },
        {
          name: "Imported Part 2",
          facility: "Primary-Facility-1",
          storeLocation: "loc2",
          partLocation: "Building 2",
          availableCount: 500,
          minimumCount: 25,
          costPerPiece: 22.75,
          category: "Imported",
          supplier: "Import Supplier",
          lastUpdated: new Date().toISOString().split("T")[0],
        },
      ]

      onImportStock(mockData)
      setIsProcessing(false)
      onOpenChange(false)
      setSelectedFile(null)
    }, 2000)
  }

  const downloadTemplate = () => {
    // Create CSV template
    const headers = [
      "Name,Facility,Store Location,Part Location,Available Count,Minimum Count,Cost per Piece,Category,Supplier",
    ]
    const sampleData = ["Sample Part,Primary-Facility-1,loc1,Building 1,100,10,25.50,Fasteners,ABC Supplier"]
    const csvContent = [headers, sampleData].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "inventory_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Import Stock Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Upload a CSV file to import multiple parts at once. Make sure your file follows the required format.
          </div>

          <Button variant="outline" onClick={downloadTemplate} className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>

          <div className="space-y-2">
            <Label>Select CSV File</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                {selectedFile ? selectedFile.name : "Drag and drop your CSV file here, or click to browse"}
              </p>
              <input type="file" accept=".csv" onChange={handleFileSelect} className="hidden" id="csv-upload" />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <FileText className="h-4 w-4 mr-2" />
                  Choose File
                </label>
              </Button>
            </div>
          </div>

          {selectedFile && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm font-medium">Selected File:</div>
              <div className="text-sm text-muted-foreground">{selectedFile.name}</div>
              <div className="text-xs text-muted-foreground">Size: {(selectedFile.size / 1024).toFixed(2)} KB</div>
            </div>
          )}

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={!selectedFile || isProcessing} className="flex-1">
              {isProcessing ? "Processing..." : "Import"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
