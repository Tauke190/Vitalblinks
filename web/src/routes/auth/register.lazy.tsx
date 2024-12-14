import { STAGES, useRegProg } from '@/hooks/useRegisterationProgress'
import { cn } from '@/lib/utils'
import { CircularProgress, Progress } from '@nextui-org/react'
import { createLazyFileRoute, Outlet } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'

export const Route = createLazyFileRoute('/auth/register')({
    component: RegisterPage,
})

function RegisterPage() {
    const stageState = useRegProg();

    return (
        <section
            id="registerationSection"
            className="w-full h-screen py-5 flex justify-center flex-col gap-5"
        >
            {
                stageState.currentStage.sn === 1 &&
                <div className="greetings mb-10">
                    <h2 className="font-bold text-xl">Welcome to Vitalblinks.</h2>
                    <p className="text-gray-400">Your virtual business trainner.</p>
                </div>
            }

            <RegisterationStage />

            <Outlet />
        </section>
    )
}

const RegisterationStage = () => {
    const stageState = useRegProg();
    const lineProgress = stageState.currentStage.lineProgress;

    return <div className=' relative grid  grid-cols-3 place-items-center grid-rows-1'>
        <Progress
            value={lineProgress}
            className='w-[calc(100%-80px)] row-[1/1] col-[1/4] -translate-y-3.5 px-6 z-40'
            size='sm'
            aria-label={`line-progress`}
        />

        {STAGES.map((stage, index) => {
            const isActiveStage = stage.sn === stageState.currentStage.sn;
            const currentProgress = stageState.progress;

            const isPastStage = stage.sn < stageState.currentStage.sn;

            const Label = () => {
                if (isActiveStage) {
                    return <span className='text-sm'>{currentProgress}%</span>;
                }

                if (isPastStage) {
                    return <CheckIcon className='h-4 w-4' />;
                }

                return stage.icon;
            }

            return (
                <div
                    key={index}
                    className={cn(
                        'flex flex-col items-center gap-2.5',
                        !isActiveStage && 'text-blue-500'
                    )}
                    style={{
                        gridColumn: `${index + 1} / ${index + 2}`,
                        gridRow: '1/1'
                    }}
                    aria-disabled={!isActiveStage}>

                    <CircularProgress
                        value={isActiveStage ? currentProgress : 0}
                        aria-label={`${stage}-circular-progress`}
                        classNames={{
                            svg: "h-16 w-16",
                            track: "opacity-100",
                        }}
                        valueLabel={<Label />}
                        showValueLabel
                        className={
                            cn("bg-background rounded-full z-50",
                                isPastStage && "bg-default-100")}
                    />

                    <p className={cn(
                        "text-gray-400 capitalize opacity-50",
                        isActiveStage && "text-blue-500 opacity-100",
                    )}>
                        {stage.name}
                    </p>
                </div>
            )
        })}
    </div>
}
