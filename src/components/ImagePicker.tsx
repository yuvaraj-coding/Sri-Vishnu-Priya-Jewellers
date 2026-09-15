import { useRef, useState } from "react";
import { toast } from "sonner";
import { uploadCatalogImage } from "@/lib/catalog";

interface ImagePickerProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImagePicker({ label = "Photo", value, onChange }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadCatalogImage(file);
      onChange(url);
      toast.success("Photo uploaded");
    } catch (e) {
      toast.error("Could not upload photo", { description: (e as Error).message });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {value ? (
          <img
            src={value}
            alt="Selected photo preview"
            className="h-16 w-16 shrink-0 rounded-md border border-border object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-dashed border-border text-[10px] text-muted-foreground">
            No photo
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:border-gold disabled:opacity-60"
          >
            {uploading ? "Uploading..." : value ? "Change photo" : "Choose from device"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-md px-2 py-2 text-sm text-destructive hover:underline"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </div>
  );
}
