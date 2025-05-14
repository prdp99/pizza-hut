"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  currentImage: string | File | null;
  onImageChange: (image: File | null) => void;
}

export function ImageUpload({ currentImage, onImageChange }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const fileInputRef = useRef(null);


  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!event.target.files) return
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-md border">
          {previewUrl ? (
            <Image
              src={previewUrl as string}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="80px"
            />
          ) : (
            <p className="text-gray-500 text-xs flex items-center justify-center h-full">
              No image selected
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2"
          // @ts-expect-error error
            onClick={() => fileInputRef && fileInputRef?.current?.click()}
          >
            <Upload className="h-4 w-4" />
            Upload Image
          </Button>
          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-red-500 hover:text-red-600"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500">Recommended: 500x500px, JPEG or PNG, max 2MB</p>
    </div>
  );
}