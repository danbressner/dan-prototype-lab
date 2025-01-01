import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const mockData = {
  todaySpend: 1234.56,
  previousDaySpend: 1100.00,
  weeklyTrend: [980, 1050, 1150, 1100, 1200, 1180, 1234.56],
  budget: 1500,
  clusterCosts: [
    { name: 'ML Training', cost: 456.78 },
    { name: 'Data Processing', cost: 345.67 },
    { name: 'Development', cost: 432.11 }
  ]
};

export default function CostWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const percentChange = ((mockData.todaySpend - mockData.previousDaySpend) / mockData.previousDaySpend) * 100;
  const spendRatio = mockData.todaySpend / mockData.budget;
  
  const getStatusColor = (ratio: number) => {
    if (ratio > 0.9) return 'text-red-500';
    if (ratio > 0.7) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <DollarSign className={getStatusColor(spendRatio)} />
        <div className="text-sm">
          <div className="font-medium">${mockData.todaySpend.toFixed(2)}</div>
          <div className="flex items-center text-xs">
            {percentChange >= 0 ? (
              <TrendingUp className="w-3 h-3 text-red-500 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-green-500 mr-1" />
            )}
            {Math.abs(percentChange).toFixed(1)}%
          </div>
        </div>
      </button>

      {isExpanded && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>Daily Budget</span>
                <span>${mockData.budget.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${getStatusColor(spendRatio)}`}
                  style={{ width: `${(spendRatio * 100)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Cluster Costs</h4>
              {mockData.clusterCosts.map(cluster => (
                <div key={cluster.name} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span>{cluster.name}</span>
                  <span>${cluster.cost.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-medium mb-2">7-Day Trend</h4>
              <div className="h-24 flex items-end space-x-1">
                {mockData.weeklyTrend.map((value, index) => {
                  const height = (value / Math.max(...mockData.weeklyTrend)) * 100;
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-purple-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}