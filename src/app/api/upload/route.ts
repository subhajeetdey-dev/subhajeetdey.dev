import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const session = await auth()
    if(!session?.user){
        return NextResponse.json({error: 'Unauthoruzed'}, {status:401})
    }

    try {
        const formData = await req.formData()    
        const file = formData.get('file') as File

        if(!file){
            return NextResponse.json({ error: 'No file provided'}, {status: 400})
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if(!validTypes.includes(file.type)){
            return NextResponse.json(
                {error: "Invalid file type. Only JPEG, PNG, WebP. GIF allowed"},
                {status: 400},
            )
        }

        const maxSize = 5 * 1024 * 1024
        if(file.size > maxSize){
            return NextResponse.json (
                {error: 'File too large. Max size is 5MB'},
                {status: 400},
            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        const base64 = `data:${file.type};base64, ${buffer.toString('base64')}`

        const result = await cloudinary.uploader.upload(base64, {
            folder: 'subhajeetdey-portfolio',
            transformation: [
                {quality: 'auto'},
                {fetch_format: 'auto'},
            ],
        })

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
        })
    } catch (error) {
        console.log('Upload error', error);
        return NextResponse.json({error: 'Upload failed'}, {status: 500})
    }
}