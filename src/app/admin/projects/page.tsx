'use client'

import { useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"

export default function NewProjectPage() {
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')

    return(
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-6">Add project</h1>

            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mb-4" />

            <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} label="Project screenshot"/>
        </div>
    )
}