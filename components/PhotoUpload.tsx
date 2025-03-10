"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface PhotoUploadProps {
  onPhotoUpload: (file: File) => void
  currentPhoto?: string
}

export function PhotoUpload({ onPhotoUpload, currentPhoto }: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onPhotoUpload(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {preview ? (
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image src={preview || "/placeholder.svg"} alt="Pet preview" layout="fill" objectFit="cover" />
        </div>
      ) : (
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-gray-500">No photo</span>
        </div>
      )}
      <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
      <Button type="button" onClick={handleButtonClick} className="bg-dogBlue hover:bg-dogBlue-dark text-white">
        {preview ? "Change Photo" : "Upload Photo"}
      </Button>
    </div>
  )
}

