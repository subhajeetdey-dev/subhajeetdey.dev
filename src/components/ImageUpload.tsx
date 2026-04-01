'use client'

import { useState } from "react"
import Image from "next/image"
import { ImSpinner11 } from "react-icons/im";
import { BiUpArrowAlt } from "react-icons/bi";


interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image'}: ImageUploadProps){
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState< string | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        if(!file) return 

        setUploading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('file', file)

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()

            if(!res.ok){
                throw new Error(data.error || 'Upload failed')
            }
            onChange(data.url)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    return(
        <div className="flex flex-col gap-3">
            <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">{label}</label>

            {value && (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-800">
                    <Image src={value} alt="Uploaded image" fill className="object-cover" />
                    <button onClick={() => onChange('')} className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded hover:bg-black/80 transition">
                        Remove
                    </button>
                </div>
            )}

            <label className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg border border-dashed border-gray-700 cursor-pointer text-sm text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-all duration-200 ${uploading? 'opacity-50 pointer-events-none': ''}`}>
                <input type="file" accept="image/jpeg, image/png, image/webp, image/gif" onChange={handleUpload} className="hidden" />
                {uploading ? (
                    <>
                    <span className="animate-spin"><ImSpinner11 /></span> Uploading...
                    </>
                ):(
                    <>
                    <BiUpArrowAlt />{value ? 'Replace image' : 'Uploaad image'}
                    </>
                )}
            </label>

            {
                error && (
                    <p className="text-xs text-red-400">{error}</p>
                )
            }
            <p className="text-xs text-gray-600">
                JPEG, PNG, WebP or GIf · Max 5MB
            </p>
        </div>
    )
}