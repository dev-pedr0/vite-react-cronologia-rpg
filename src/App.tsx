import { useState } from 'react';
import './App.css'
import EventList from './components/EventList'
import Timeline from "./components/Timeline";
import { useEventStore } from "./storage/useEventStore";
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher';

function App() {
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  
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
        <div className="flex justify-center mb-4">
          <ThemeSwitcher />
        </div>
        <div className="flex justify-center items-center mb-4">
          <button
            onClick={() => setViewMode(viewMode === 'list' ? 'timeline' : 'list')}
            className="px-4 py-2 rounded hover:opacity-90 font-bold"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-secondary)',
            }}
          >
            Ver como {viewMode === 'list' ? 'Linha do Tempo' : 'Lista'}
          </button>
        </div>

        {viewMode === 'list' ? (
          <EventList />
        ) : (
          <Timeline events={events} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
