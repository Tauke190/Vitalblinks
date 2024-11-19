import { createFileRoute } from '@tanstack/react-router'
import GameMap from '../../../components/map/Map'
import Levels from '../../../components/map/LevelCircle'

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
