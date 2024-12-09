import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
    component: RegisterPage,
})

function RegisterPage() {
    return (
        <section id='registerationSection' className='w-full h-screen py-5 flex justify-center flex-col gap-5'>
            <div className="greetings">
                <h2 className="font-bold text-xl">Welcome to Vitalblinks.</h2>
                <p className="text-gray-400">Your virtual business trainner.</p>
            </div>

            <Outlet />
        </section>
    )
}
