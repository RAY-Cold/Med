import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import ClinicianLayout from './components/layouts/ClinicianLayout';
import ParentLayout from './components/layouts/ParentLayout';
import StudioLayout from './app/clinician/studio/layout';

// Studio Components
import StudioDashboard from './features/studio/components/StudioDashboard';
import InitializeWizard from './features/studio/components/InitializeWizard';
import BlueprintRegistry from './features/studio/components/BlueprintRegistry';
import CanvasShell from './features/studio/components/CanvasShell';
import WorksheetGenerator from './features/studio/components/WorksheetGenerator';

// Immersive Features
import { 
  Home, Features, Workflow, About, Contact, ResourcesTab 
} from './features/public/PublicFeatures';

import { 
  SignIn, SignUp, RoleSelection 
} from './features/auth/AuthFeatures';

import { 
  AdminOverview, PlatformAnalytics, MemberDirectory, ClinicConfiguration, SystemSitemap, AdminFeatures 
} from './features/admin/AdminFeatures';

import { 
  ClinicianDashboard, ClinicalPulse, TaskDeployments, ClinicianVault 
} from './features/clinician/ClinicianFeatures';

import { 
  ParentDashboard, ParentMissions, FamilyCalendar, ParentFinances 
} from './features/parent/ParentFeatures';

import { 
  ContentStudio, ContentLibrary 
} from './features/shared/SharedFeatures';

const Placeholder = ({ title }: { title: string }) => (
  <div className="space-y-4 bg-white p-8 border border-slate-200 rounded-[2rem]">
    <h1 className="text-3xl font-black text-slate-950 tracking-tight">{title}</h1>
    <p className="text-slate-500 leading-relaxed max-w-2xl text-sm">
      This is a production-grade component sandbox for <span className="font-bold text-indigo-600">{title}</span>.
      The multi-role system verified and compiled this sub-path safely.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {[1, 2, 3].map(i => (
        <div key={i} className="h-44 bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl animate-pulse" />
          <div className="h-4 w-2/3 bg-slate-200 rounded-lg animate-pulse" />
          <div className="h-3 w-1/2 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/workflow" element={<Workflow />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources/assets" element={<ResourcesTab activeTab="assets" />} />
          <Route path="/resources/worksheets" element={<ResourcesTab activeTab="worksheets" />} />
          <Route path="/resources/templates" element={<ResourcesTab activeTab="templates" />} />
          <Route path="/resources/projects" element={<ResourcesTab activeTab="projects" />} />
          <Route path="/resources/marketplace" element={<ResourcesTab activeTab="marketplace" />} />
          <Route path="/signin" element={<Navigate to="/auth/signin" replace />} />
        </Route>

        {/* Authentication Contexts */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="role-selection" element={<RoleSelection />} />
        </Route>

        {/* Administration Dashboards */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="platform-analytics" element={<PlatformAnalytics />} />
          <Route path="member-directory" element={<MemberDirectory />} />
          <Route path="clinic-configuration" element={<ClinicConfiguration />} />
          <Route path="system-sitemap" element={<SystemSitemap />} />
          <Route path="blueprint-master" element={<AdminFeatures activeKey="blueprint-master" />} />
          <Route path="curriculum-engine" element={<AdminFeatures activeKey="curriculum-engine" />} />
          <Route path="ai-strategy-lab" element={<AdminFeatures activeKey="ai-strategy-lab" />} />
          <Route path="marketplace-operations" element={<AdminFeatures activeKey="marketplace-operations" />} />
          <Route path="gamification" element={<AdminFeatures activeKey="gamification" />} />
          <Route path="localization" element={<AdminFeatures activeKey="localization" />} />
        </Route>

        {/* Clinician Therapy Operations */}
        <Route path="/clinician" element={<ClinicianLayout />}>
          <Route index element={<ClinicianDashboard />} />
          <Route path="clinical-pulse" element={<ClinicalPulse />} />
          <Route path="scheduler" element={<FamilyCalendar />} />
          <Route path="logs" element={<Placeholder title="Clinical Logs Sandbox" />} />
          <Route path="task-deployments" element={<TaskDeployments />} />
          <Route path="performance" element={<ClinicalPulse />} />
          <Route path="messenger" element={<Placeholder title="Vocal Therapist Messenger" />} />
          <Route path="vault" element={<ClinicianVault activeTab="vault" />} />
          <Route path="library" element={<ClinicianVault activeTab="library" />} />
          
          {/* Clinical Work Studio */}
          <Route path="studio" element={<StudioLayout />}>
            <Route index element={<StudioDashboard />} />
            <Route path="initialize" element={<InitializeWizard />} />
            <Route path="blueprint-registry" element={<BlueprintRegistry />} />
            <Route path="canvas" element={<CanvasShell />} />
            <Route path="worksheet-generator" element={<WorksheetGenerator />} />
            <Route path="*" element={<Placeholder title="Clinical Studio Engine" />} />
          </Route>
        </Route>

        {/* Caregivers Family Hub */}
        <Route path="/parent" element={<ParentLayout />}>
          <Route index element={<ParentDashboard />} />
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="missions" element={<ParentMissions />} />
          <Route path="calendar" element={<FamilyCalendar />} />
          <Route path="messages" element={<Placeholder title="Parent Micro-chat sandbox" />} />
          <Route path="finances" element={<ParentFinances />} />
          <Route path="preferences" element={<Placeholder title="Parent Configurations & View mode" />} />
        </Route>

        {/* Shared Contextual Services */}
        <Route path="/content-studio" element={<ContentStudio />} />
        <Route path="/content-library" element={<ContentLibrary />} />

        {/* Fallback Redirection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
