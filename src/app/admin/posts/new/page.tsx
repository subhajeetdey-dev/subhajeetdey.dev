'use client'

import { useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"

export default function NewPostPage(){
    const [imageUrl, setImageUrl] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    return(
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-xl font-semibold mb-6">New Post</h1>

            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mb-4" />

            <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} label="Cover image"/>

            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post in Markdown..." className="w-full h-64 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 mt-4 font-mono text-sm"/>
        </div>
    )
}