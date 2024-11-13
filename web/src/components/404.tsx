import { NotFoundRouteProps } from "@tanstack/react-router";

const DefaultRoute404Comp = (props: NotFoundRouteProps) => {
    return <div>
        No {JSON.stringify(props.data)} route found.
    </div>
}

DefaultRoute404Comp.displayName = 'DefaultRoute404Com';
export default DefaultRoute404Comp;
