import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface Widget {
  id: string;
  title: string;
  content: React.ReactNode;
  width: number;
  height: number;
}

const initialWidgets: Widget[] = [
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    content: (
      <div className="grid grid-cols-2 gap-4">
        <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h3 className="font-medium mb-1">New Notebook</h3>
          <p className="text-sm text-gray-500">Create a new notebook</p>
        </button>
        <button className="p-4 text-left rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <h3 className="font-medium mb-1">New Job</h3>
          <p className="text-sm text-gray-500">Schedule a new job</p>
        </button>
      </div>
    ),
    width: 2,
    height: 1
  },
  {
    id: 'recent-notebooks',
    title: 'Recent Notebooks',
    content: (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
            <h4 className="font-medium">Analysis Notebook {i}</h4>
            <p className="text-sm text-gray-500">Modified 2h ago</p>
          </div>
        ))}
      </div>
    ),
    width: 1,
    height: 2
  },
  {
    id: 'cluster-status',
    title: 'Cluster Status',
    content: (
      <div className="space-y-3">
        {[
          { name: 'ML Training', status: 'Running', memory: '85%' },
          { name: 'Development', status: 'Stopped', memory: '0%' }
        ].map(cluster => (
          <div key={cluster.name} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-medium">{cluster.name}</h4>
              <p className="text-sm text-gray-500">{cluster.status}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{cluster.memory}</div>
              <div className="text-xs text-gray-500">Memory</div>
            </div>
          </div>
        ))}
      </div>
    ),
    width: 1,
    height: 2
  }
];

export default function DashboardGrid() {
  const [widgets, setWidgets] = useState(initialWidgets);

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-6">
        {widgets.map(widget => (
          <div
            key={widget.id}
            className={`col-span-${widget.width} row-span-${widget.height} bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700`}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">{widget.title}</h3>
              <button
                onClick={() => removeWidget(widget.id)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {widget.content}
            </div>
          </div>
        ))}
        
        <button className="col-span-1 row-span-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 hover:border-purple-500 dark:hover:border-purple-400 flex items-center justify-center">
          <Plus className="w-6 h-6 text-gray-400" />
        </button>
      </div>
    </div>
  );
}