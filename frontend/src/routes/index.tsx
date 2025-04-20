import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Welcome from '../pages/onboarding/Welcome';
import BasicInfo from '../pages/onboarding/BasicInfo';
import StyleExplorer from '../pages/onboarding/StyleExplorer';
import NeedsAnalysis from '../pages/onboarding/NeedsAnalysis';
import Results from '../pages/onboarding/Results';
import Dashboard from '../pages/Dashboard';
import NeedsList from '../pages/needs/NeedsList';
import NeedsDetail from '../pages/needs/NeedsDetail';
import DesignList from '../pages/designs/DesignList';
import DesignDetail from '../pages/designs/DesignDetail';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* 默认重定向到引导页 */}
      <Route path="/" element={<Navigate to="/onboarding" replace />} />

      {/* 引导页面路由 */}
      <Route path="/onboarding" element={<Welcome />} />
      <Route path="/onboarding/basic-info" element={<BasicInfo />} />
      <Route path="/onboarding/style-explorer" element={<StyleExplorer />} />
      <Route path="/onboarding/needs-analysis" element={<NeedsAnalysis />} />
      <Route path="/onboarding/results" element={<Results />} />

      {/* 主应用路由 */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/needs">
          <Route index element={<NeedsList />} />
          <Route path=":id" element={<NeedsDetail />} />
        </Route>
        <Route path="/designs">
          <Route index element={<DesignList />} />
          <Route path=":id" element={<DesignDetail />} />
        </Route>
      </Route>

      {/* 捕获所有其他路由并重定向到引导页 */}
      <Route path="*" element={<Navigate to="/onboarding" replace />} />
    </Routes>
  );
};

export default AppRoutes;
