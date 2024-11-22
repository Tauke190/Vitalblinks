import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: IndexPage,
})

function IndexPage() {
    return (
        <div>
            This is the landing page.
        </div>
    )
}
