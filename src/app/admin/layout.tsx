import getServerSession  from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect('/login');
    }

    return(
        <div className='min-h-screen bg-gray-950 text-white'>
            <main>{children}</main>
        </div>
    )
}