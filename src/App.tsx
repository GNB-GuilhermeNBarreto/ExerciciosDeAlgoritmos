import React, { useState } from 'react';
import { Calculator, ListChecks as ListCheck, Users } from 'lucide-react';
import AdjacentProductExercise from './components/AdjacentProductExercise';
import LongestStringsExercise from './components/LongestStringsExercise';
import PerformanceScalabilityExercise from './components/PerformanceScalabilityExercise';
import RestApiExercise from './components/RestApiExercise';

function App() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { 
      id: 0, 
      title: 'Exercício 1', 
      icon: <Calculator className="w-5 h-5" />,
      component: <AdjacentProductExercise />
    },
    { 
      id: 1, 
      title: 'Exercício 2', 
      icon: <ListCheck className="w-5 h-5" />,
      component: <LongestStringsExercise />
    },
    { 
      id: 2, 
      title: 'Exercício 3', 
      icon: <Calculator className="w-5 h-5" />,
      component: <PerformanceScalabilityExercise />
    },
    { 
      id: 3, 
      title: 'Exercício 4', 
      icon: <Users className="w-5 h-5" />,
      component: <RestApiExercise />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Exercícios de PHP - Algoritmos</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.title}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-6">
              {tabs[activeTab].component}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;