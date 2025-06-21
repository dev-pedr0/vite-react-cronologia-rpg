import { useState } from 'react';
import './App.css'
import EventList from './components/EventList'
import Timeline from "./components/Timeline";
import { useEventStore } from "./storage/useEventStore";
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';
import type { FilterOptions } from './components/EventFilters';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({});
  const events = useEventStore((state) => state.events);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen p-4"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text-primary)',
        }}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-50 bg-gray-800 text-white px-3 py-2 rounded"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
            }}
          >
            &#9776;
          </button>
        )}

        <div className="flex justify-center mb-4">
          <ThemeSwitcher />
        </div>

        {viewMode === 'list' ? (
          <EventList filters={filters}/>
        ) : (
          <Timeline events={events} filters={filters} />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          viewMode={viewMode}
          toggleViewMode={() =>
            setViewMode(viewMode === 'list' ? 'timeline' : 'list')
          }
          filters={filters}
          setFilters={setFilters}
        />
        
      </div>
      <Footer/>
    </ThemeProvider>
  );
}

export default App;
