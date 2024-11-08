import { NotFoundRouteProps } from "@tanstack/react-router";

const DefaultRoute404Com = (props: NotFoundRouteProps) => {
    return <div>
        No {JSON.stringify(props.data)} route found.
    </div>
}

DefaultRoute404Com.displayName = 'DefaultRoute404Com';
export default DefaultRoute404Com;
