import { createFileRoute } from '@tanstack/react-router'

import GameMap from '@/components/map/map'
import Levels from '@/components/map/levels'

export const Route = createFileRoute('/vital/$userId/map')({
    component: MapPage,
})

function MapPage() {
    return <main>
        <GameMap>
            <Levels />
        </GameMap>
    </main>
}
