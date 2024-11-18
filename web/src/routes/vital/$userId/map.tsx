import { createFileRoute } from '@tanstack/react-router'
import Map from '../../../components/map/Map'

export const Route = createFileRoute('/vital/$userId/map')({
    component: MapPage,
})

function MapPage() {
    return <main>
        <Map />
    </main>
}
