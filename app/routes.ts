import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/headphones", "routes/headphones.tsx"),
    route("/speakers", "routes/speakers.tsx"),
    route("/earphones", "routes/earphones.tsx"),
    route("/product/:id", "routes/product.$id.tsx"),
    route("/checkout", "routes/checkout.tsx")
] satisfies RouteConfig;
