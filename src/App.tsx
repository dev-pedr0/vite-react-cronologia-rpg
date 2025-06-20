import { useState } from 'react';
import './App.css'
import EventList from './components/EventList'
import Timeline from "./components/Timeline";
import { useEventStore } from "./storage/useEventStore";

function App() {
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  
  const events = useEventStore((state) => state.events);

  return (
    <div className="mx-auto p-4 bg-gray-400">
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'timeline' : 'list')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
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
  );
}

export default App;
