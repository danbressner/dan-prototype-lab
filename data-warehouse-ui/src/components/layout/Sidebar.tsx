import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FolderTree, Database, Brain, PlayCircle, Settings } from 'lucide-react';

interface NavItem {
  title: string;
  icon: React.ReactNode;
  isExpanded?: boolean;
  children?: NavItem[];
}

export default function Sidebar() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    {
      title: 'Workspace',
      icon: <FolderTree className="w-5 h-5" />,
      isExpanded: true,
      children: [
        { title: 'Notebooks', icon: <ChevronRight className="w-4 h-4" /> },
        { title: 'Repos', icon: <ChevronRight className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Data',
      icon: <Database className="w-5 h-5" />,
      children: [
        { title: 'Tables', icon: <ChevronRight className="w-4 h-4" /> },
        { title: 'Catalogs', icon: <ChevronRight className="w-4 h-4" /> }
      ]
    },
    {
      title: 'ML',
      icon: <Brain className="w-5 h-5" />,
      children: [
        { title: 'Experiments', icon: <ChevronRight className="w-4 h-4" /> },
        { title: 'Models', icon: <ChevronRight className="w-4 h-4" /> }
      ]
    },
    {
      title: 'Jobs',
      icon: <PlayCircle className="w-5 h-5" />
    },
    {
      title: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ]);

  const toggleExpand = (index: number) => {
    setNavItems(items => 
      items.map((item, i) => 
        i === index ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-800">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <img src="/databricks-logo.svg" alt="Databricks" className="h-8" />
        </div>
        
        <nav>
          {navItems.map((item, index) => (
            <div key={item.title} className="mb-2">
              <button
                onClick={() => toggleExpand(index)}
                className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="mr-2">{item.icon}</span>
                <span className="flex-1 text-left">{item.title}</span>
                {item.children && (
                  <span className="ml-auto">
                    {item.isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </span>
                )}
              </button>
              
              {item.children && item.isExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map(child => (
                    <button
                      key={child.title}
                      className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                    >
                      <span className="mr-2">{child.icon}</span>
                      <span>{child.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}