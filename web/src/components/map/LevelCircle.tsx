type levelCirleProps = {
    isActive: boolean,
    isPassed: boolean,
    levelName: string,
}

const LevelCircle = (props: levelCirleProps) => {
    const { isActive = false, isPassed = false, } = props;

}

export default LevelCircle;
