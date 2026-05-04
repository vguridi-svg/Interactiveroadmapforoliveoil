import { createBrowserRouter } from "react-router";
import Roadmap from "./pages/Roadmap";
import MarketLaunch from "./pages/MarketLaunch";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Roadmap,
  },
  {
    path: "/market-launch",
    Component: MarketLaunch,
  },
]);
