import { createFileRoute } from '@tanstack/react-router'

import Levels from '@/components/map/levels'
import GameMap from '@/components/map/map'

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
