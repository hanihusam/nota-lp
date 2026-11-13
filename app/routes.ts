import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("app", "routes/app.tsx", [
    index("routes/app._index.tsx"),
    route("proposals", "routes/app.proposals.tsx"),
    route("proposals/:id", "routes/app.proposal.tsx"),
  ]),
] satisfies RouteConfig;
