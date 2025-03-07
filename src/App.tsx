import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { MetricCard } from './components/MetricCard';
import { PredictiveChart } from './components/PredictiveChart';
import { RiskAnalysis } from './components/RiskAnalysis';
import { ProfitabilityHeatmap } from './components/ProfitabilityHeatmap';
import { Navigation } from './components/Navigation';
import { FileUpload } from './components/FileUpload';
import { PredictionOptions } from './components/PredictionOptions';
import { FlipCard } from './components/FlipCard';
import { NavSection, PredictionType, PredictiveData, RiskMetric, CostCategory, CostRecommendation } from './types';

// Data constants
const metrics = [
  {
    title: 'Revenue',
    value: '$125,000',
    change: 12.5,
    icon: 'DollarSign'
  },
  {
    title: 'Customers',
    value: '1,240',
    change: 8.2,
    icon: 'Users'
  },
  {
    title: 'Risk Score',
    value: '85/100',
    change: -2.4,
    icon: 'AlertTriangle'
  },
  {
    title: 'Efficiency',
    value: '94%',
    change: 5.1,
    icon: 'TrendingUp'
  }
];

const risks: RiskMetric[] = [
  { category: 'Market Volatility', value: 75, status: 'high' },
  { category: 'Operational Risk', value: 45, status: 'medium' },
  { category: 'Credit Risk', value: 30, status: 'low' },
  { category: 'Compliance Risk', value: 60, status: 'medium' }
];

const costCategories: CostCategory[] = [
  {
    name: 'Operations',
    currentCost: 50000,
    previousCost: 55000,
    predictedReduction: 3000,
    efficiency: 92
  },
  {
    name: 'Marketing',
    currentCost: 30000,
    previousCost: 28000,
    predictedReduction: 2000,
    efficiency: 85
  },
  {
    name: 'Technology',
    currentCost: 25000,
    previousCost: 22000,
    predictedReduction: 1500,
    efficiency: 88
  }
];

const recommendations: CostRecommendation[] = [
  {
    category: 'Operations Optimization',
    impact: 'high',
    potentialSavings: 15000,
    description: 'Streamline operational processes through automation',
    actionItems: [
      'Implement automated inventory management',
      'Optimize workforce scheduling',
      'Reduce manual data entry tasks'
    ]
  },
  {
    category: 'Marketing Efficiency',
    impact: 'medium',
    potentialSavings: 8000,
    description: 'Improve marketing ROI through targeted campaigns',
    actionItems: [
      'Focus on high-performing channels',
      'Implement A/B testing',
      'Optimize ad spend allocation'
    ]
  }
];

const generatePredictiveData = (): PredictiveData[] => {
  const data: PredictiveData[] = [];
  const startDate = new Date();
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const actual = i < 15 ? 50000 + Math.random() * 10000 : undefined;
    const predicted = 52000 + Math.random() * 12000;
    
    data.push({
      date: date.toISOString(),
      actual: actual as number,
      predicted
    });
  }
  
  return data;
};

const flipCards = [
  {
    title: 'Risk Assessment',
    frontContent: 'Comprehensive analysis of potential risks and mitigation strategies.',
    backContent: 'AI-powered risk scoring and automated alert system for proactive risk management.',
    icon: 'AlertTriangle',
    riskPercentage: 75,
    tip: 'Implement automated risk monitoring systems to reduce exposure by 30%'
  },
  {
    title: 'Demand Forecasting',
    frontContent: 'Advanced predictive modeling for future market demand.',
    backContent: 'Machine learning algorithms analyzing historical data and market trends.',
    icon: 'LineChart',
    riskPercentage: 45,
    tip: 'Utilize historical data patterns to improve forecast accuracy by 25%'
  },
  {
    title: 'Market Analysis',
    frontContent: 'Deep insights into market trends and competitive landscape.',
    backContent: 'Real-time competitor tracking and market opportunity identification.',
    icon: 'BarChart2',
    riskPercentage: 60,
    tip: 'Diversify market presence to reduce dependency on primary segments'
  }
];

function App() {
  const [activeSection, setActiveSection] = useState<NavSection>('dashboard');
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionType | null>(null);

  const handleFileSelect = (file: File) => {
    console.log('Selected file:', file.name);
    toast.success('File uploaded successfully! Analyzing data...', {
      duration: 3000,
      position: 'top-right',
      icon: '📊'
    });
    // Handle file processing here
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <PredictiveChart data={generatePredictiveData()} />
              </div>
              <div>
                <RiskAnalysis risks={risks} />
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Profitability Optimization</h2>
              <ProfitabilityHeatmap 
                costCategories={costCategories}
                recommendations={recommendations}
              />
            </div>
          </>
        );

      case 'predictions':
        return (
          <>
            <FileUpload onFileSelect={handleFileSelect} />
            <PredictionOptions
              selectedOption={selectedPrediction}
              onOptionSelect={setSelectedPrediction}
            />
            {selectedPrediction && (
              <>
                <div className="mb-8">
                  <PredictiveChart data={generatePredictiveData()} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {flipCards.map((card, index) => (
                    <FlipCard key={index} {...card} />
                  ))}
                </div>
              </>
            )}
          </>
        );

      case 'analytics':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileUpload onFileSelect={handleFileSelect} />
            {/* Add analytics content */}
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FileUpload onFileSelect={handleFileSelect} />
            {/* Add settings content */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;