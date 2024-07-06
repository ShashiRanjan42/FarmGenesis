import React from "react";
import { useRoutes } from "react-router-dom";
// importing components
import Dashboard from "../Components/Dashboard/Dashboard";
import SellCrops from "../Components/Dashboard/SellCrops";
import Stats from "../Components/Dashboard/Stats";
import Settings from "../Components/Dashboard/Settings";
import Schemes from "../Components/Dashboard/Schemes";
import AnalyseCrops from "../Components/Dashboard/AnalyseCrops";
import AnalyseSoil from "../Components/Dashboard/AnalyseSoil";
import BuyCrops from "../Components/Dashboard/BuyCrops";


const AppRoutes = () => {
    const elements = useRoutes([
        {
            path: 'dashboard', element: <Dashboard />,
            children: [
                { path: 'stats', element: <Stats /> },
                { path: 'sellcrops', element: <SellCrops /> },
                { path: 'analysecrop', element: <AnalyseCrops /> },
                { path: 'analysesoil', element: <AnalyseSoil /> },
                { path: 'schemes', element: <Schemes /> },
                { path: 'settings', element: <Settings /> },
                { path: 'buycrops', element: <BuyCrops /> }
            ]
        }
    ])
    return elements
}

export default AppRoutes