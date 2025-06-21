import type { FilterOptions } from "./EventFilters";
import EventFilters from "./EventFilters";

type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
    filters: FilterOptions;
    setFilters: (filters: FilterOptions) => void;
    viewMode: 'list' | 'timeline';
    toggleViewMode: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
  setFilters,
  viewMode,
  toggleViewMode,
}: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 shadow-md z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{
          backgroundColor: 'var(--color-bg-terciary)',
          color: 'var(--color-text-primary)',
        }}
    >
      <div className="p-4 border-b flex justify-between items-center"
      style={{
          backgroundColor: 'var(--color-bg-terciary)',
          color: 'var(--color-text-primary)',
        }}
      >
        <h2 className="font-bold text-lg text-center">Menu</h2>
        <button onClick={onClose} className="text-white text-xl"
        style={{
          color: 'var(--color-text-primary)',
        }}
        >
          ×
        </button>
      </div>

      <div className="p-4 overflow-y-auto space-y-4">
        <button
          onClick={toggleViewMode}
          className="w-full px-4 py-2 rounded font-bold"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Ver como {viewMode === 'list' ? 'Linha do Tempo' : 'Lista'}
        </button>

        <EventFilters onChange={setFilters} layout="stack"/>
      </div>
    </div>
  );
}