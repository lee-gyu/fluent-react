import type { Route } from "./+types/Home";

export function meta(metaArgs: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return <div>Hello</div>;
}
