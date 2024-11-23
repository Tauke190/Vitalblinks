import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
    component: AuthLayout,
    notFoundComponent: () => {
        return 'No matching route found'
    },
})

export function AuthLayout() {
    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-between max-w-screen-2xl">
            <div className="quote_section w-7/12 bg-gray-900 h-full relative">
                <div className="absolute bottom-10 w-full flex flex-col items-center justify-between">
                    <strong>
                        <h2>Some random game quote.</h2>
                    </strong>
                    <h4>- Author, Business</h4>
                </div>
            </div>

            <div className="split1 w-5/12 h-full relative flex items-center  px-20 ">
                <Outlet />
            </div>
        </div>
    )
}
