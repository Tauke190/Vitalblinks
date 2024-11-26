import { createFileRoute, redirect } from '@tanstack/react-router'
import { DEFAULT_USER_ID } from '@/data/user';
import { DEFAULT_LEVEL } from '@/data/levels';

export const Route = createFileRoute('/vital/$userId/game/$level')({
    component: FirstLevel,
    loader: (ctx) => {
        const { userId, level } = ctx.params;
        if (userId !== DEFAULT_USER_ID)
            redirect({
                to: "/auth/login",
                throw: true
            })

        const userLevel = DEFAULT_LEVEL;

        if (Number(level) > userLevel)
            redirect({
                to: "/vital/$userId/game/$level", params: {
                    userId: DEFAULT_USER_ID,
                    level: String(DEFAULT_LEVEL),
                },
                throw: true
            })

        return { userId, level };
    }
})

function FirstLevel() {
    const { userId, level } = Route.useParams();
    return <main className="first">
        welcome {userId} to {level} level game.
    </main>
}
