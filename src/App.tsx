import React, { useState } from 'react';
import Header from './components/Header';
import LoginScreen from './components/LoginScreen';
import PipelineDashboard from './components/PipelineDashboard';
import ImageUpload from './components/ImageUpload';
import EnhancedImageViewer from './components/EnhancedImageViewer';
import DamageSummary from './components/DamageSummary';
import VulnerabilityMap from './components/VulnerabilityMap';
import ChatAssistant from './components/ChatAssistant';
import ReportDownload from './components/ReportDownload';
import { LanguageProvider } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeStep, setActiveStep] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SKAI Response Platform...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <PipelineDashboard activeStep={activeStep} setActiveStep={setActiveStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <ImageUpload onUpload={() => setActiveStep(1)} />
            <EnhancedImageViewer onEnhancementComplete={() => setActiveStep(2)} />
            <VulnerabilityMap />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <DamageSummary onSummaryComplete={() => setActiveStep(3)} />
            <ChatAssistant />
            <ReportDownload />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;