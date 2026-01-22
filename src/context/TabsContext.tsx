import { createContext, useContext, useState, type ReactNode } from 'react';

type TabId = 'fase1' | 'fase2' | 'fase3';

interface TabsContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>('fase1');

  const handleSetActiveTab = (tab: TabId) => {
    setActiveTab(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}