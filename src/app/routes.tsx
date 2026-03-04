import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";

import Dashboard from "./pages/Dashboard";
import MedicalAudit from "./pages/MedicalAudit";
import EvidencePack from "./pages/EvidencePack";
import RiskRadar from "./pages/RiskRadar";
import CreatorFeed from "./pages/CreatorFeed";
import OpportunityScanner from "./pages/OpportunityScanner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      { path: "", Component: MedicalAudit }, // Default tab
      { path: "evidence", Component: EvidencePack },
      { path: "risk", Component: RiskRadar },
      { path: "creator", Component: CreatorFeed },
      { path: "opportunities", Component: OpportunityScanner },
    ],
  },
]);
