import { tlevelKey, tlevelInfo } from "../../data/levels";

type tselectedLevelInfoBoxProps = {
    level: tlevelKey;
    isCurrentLevel?: boolean,
    isPassed?: boolean,
} & tlevelInfo;

const SelectedLevelsInfoBox = (props: tselectedLevelInfoBoxProps) => {
    const { level, isCurrentLevel = false, isPassed = false, ...levelsInfo } = props;

    console.log(props)

    return (
        <section className="container bottom-10 left-1/2 -translate-x-1/2 bg-white absolute w-96">
            <div className="title">
                {levelsInfo.name}
            </div>
            <div className="description">
                {levelsInfo.description}
            </div>
            <div className="next">
            </div>
            <div className="previous">
            </div>
        </section>
    )
}

export default SelectedLevelsInfoBox;
