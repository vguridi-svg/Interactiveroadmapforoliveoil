import { createHashRouter } from "react-router";
import Roadmap from "./pages/Roadmap";
import MarketLaunch from "./pages/MarketLaunch";

export const router = createHashRouter([
  {
    path: "/",
    Component: Roadmap,
  },
  {
    path: "/market-launch",
    Component: MarketLaunch,
  },
]);
