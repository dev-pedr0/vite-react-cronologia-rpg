import { useState } from "react";
import { useEventStore } from "../storage/useEventStore";
import type { EventItem as EventItemType } from '../models/Event';
import EventItem from "./EventItem";
import EventForm from "./EventForm";
import type { FilterOptions } from "./EventFilters";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent, } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy, } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EventDetailsModal from './EventDetailsModal';

function SortableEventItem({event, onEdit, onDelete, onViewDetails}: {
  event: EventItemType;
  onEdit: (event: EventItemType) => void;
  onDelete: (ide: string) => void;
  onViewDetails: (event: EventItemType) => void;
}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: event.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-start mb-2">
      <div {...attributes} {...listeners} 
      className="w-4 h-4 rounded cursor-grab mt-3 mr-2"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
      >
        <img src="/icons/hand-paper.svg" alt="Mover" className="w-5 h-5 opacity-70"/>
      </div>
      
      <div className="flex-1">
        <EventItem event={event} onEdit={onEdit} onDelete={onDelete} onViewDetails={onViewDetails}/>
      </div>
    </div>
  );
}

type EventListProps = {
  filters: FilterOptions;
};

export default function EventList({ filters }: EventListProps) {
  const events = useEventStore((state) => state.events);
  const addEvent = useEventStore((state) => state.addEvent);
  const updateEvent = useEventStore((state) => state.updateEvent);
  const deleteEvent = useEventStore((state) => state.deleteEvent);
  const clearEvents = useEventStore((state) => state.clearEvents);

  const [viewingEvent, setViewingEvent] = useState<EventItemType | null>(null);
  const [editingEvent, setEditingEvent] = useState<EventItemType | null>(null);
  const [showForm, setShowForm] = useState(false);

  function applyFilters(event: EventItemType): boolean {
    const {
      startYear,
      endYear,
      region,
      description,
      tag,
    } = filters;

    if (startYear !== undefined && event.startYear < startYear) return false;
    if (endYear !== undefined && (event.endYear ?? event.startYear) > endYear) return false;
    if (region && !event.region.toLowerCase().includes(region.toLowerCase())) return false;
    if (description && !event.description.toLowerCase().includes(description.toLowerCase())) return false;
    if (tag && !event.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))) return false;

    return true;
  }

  const filtered = [...events].filter(applyFilters);

  if (filters.sortOrder === 'desc') {
    filtered.sort((a, b) => (b.startYear ?? 0) - (a.startYear ?? 0));
  } else {
    filtered.sort((a, b) => (a.startYear ?? 0) - (b.startYear ?? 0));
  }

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = filtered.findIndex((e) => e.id === active.id);
    const newIndex = filtered.findIndex((e) => e.id === over.id);
    const reordered = arrayMove(filtered, oldIndex, newIndex);
    const moved = reordered[newIndex];

    const before = reordered[newIndex - 1];
    const after = reordered[newIndex + 1];

    let newYear: number;

    if (before && after) {
       newYear = Math.round((before.startYear + after.startYear) / 2);
    } else if (before) {
      newYear = before.startYear + 10;
    } else if (after) {
      newYear = after.startYear - 10;
    } else {
      newYear = moved.startYear;
    }

    if (newYear !== moved.startYear) {
      updateEvent({ ...moved, startYear: newYear });
    }
  }

  function handleSave(event: EventItemType) {
    if (editingEvent) {
      updateEvent(event);
    } else {
      addEvent(event);
    }
    setShowForm(false);
    setEditingEvent(null);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingEvent(null);
  }

  function handleEdit(event: EventItemType) {
    setEditingEvent(event);
    setShowForm(true);
  }

  function handleAddNew() {
    setEditingEvent(null);
    setShowForm(true);
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify(events, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'meus-eventos.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported)) {
          imported.forEach((ev: any) => {
            const newEvent = { ...ev, id: crypto.randomUUID() };
            addEvent(newEvent);
          });
          alert('Eventos importados com sucesso!');
        } else {
          alert('Arquivo inválido.');
        }
      } catch {
        alert('Erro ao importar arquivo.');
      }
    };
    reader.readAsText(file);
  }

  function handleImportDemo() {
    fetch('/eventos_demo.json')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          data.forEach((ev: any) => {
            const newEvent = {...ev, id: crypto.randomUUID()};
            addEvent(newEvent);
          });
          alert('Demo importada com sucesso!');
        } else {
          alert('Arquivo de demo inválido.');
        }
      })
      .catch(() => {
        alert('Erro ao importar a demo.');
      });
  }

  return (
    <div
      className="max-w-2xl mx-auto p-4"
      style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Cronologia de Eventos
        </h1>

        <button
          onClick={handleAddNew}
          className="px-4 py-2 rounded hover:opacity-90 transition font-extrabold"
          style={{ backgroundColor: 'var(--color-bg-primary)' }}
        >
          + Novo Evento
        </button>
      </div>

      {showForm && !editingEvent && (
      <div className="my-4">
        <EventForm
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    )}

    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={filtered.map((e) => e.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-4">
          {filtered.length === 0 && <p>Nenhum evento encontrado.</p>}
          {filtered.map((event) => (
            <div key={event.id} className="mb-4">
              <SortableEventItem
                event={event}
                onEdit={handleEdit}
                onDelete={deleteEvent}
                onViewDetails={setViewingEvent}
              />

              {showForm && editingEvent?.id === event.id && (
                <div className="my-2">
                  <EventForm
                    eventToEdit={editingEvent}
                    onSave={handleSave}
                    onCancel={handleCancel}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </SortableContext>
    </DndContext>

      <button
        onClick={handleExport}
        style={{ backgroundColor: 'var(--btn-details-bg)', color: 'var(--color-text-primary)' }}
        className="font-bold px-4 py-2 mx-2 rounded hover:opacity-90 transition"
      >
        Exportar eventos
      </button>

      <label
        className="font-bold mx-2 cursor-pointer px-4 py-2 rounded hover:opacity-90 transition"
        style={{ backgroundColor: 'var(--btn-edit-bg)', color: 'var(--color-text-primary)' }}
      >
        Importar eventos
        <input
          type="file"
          accept="application/json"
          onChange={handleImport}
          className="hidden"
        />
      </label>

      <button
      onClick={handleImportDemo}
      className="font-bold px-4 py-2 mx-2 rounded hover:opacity-90 transition"
      style={{ backgroundColor: 'var(--btn-edit-bg)', color: 'var(--color-text-primary)' }}
      >
        Importar Demo
      </button>

      <button
        onClick={() => {
          if (confirm('Tem certeza que deseja apagar todos os eventos?')) {
            clearEvents();
          }
        }}
        style={{ backgroundColor: 'var(--btn-delete-bg)', color: 'var(--color-text-primary)' }}
        className="mx-2 px-4 py-2 rounded hover:opacity-90 transition font-bold"
      >
        Limpar Tudo
      </button>

      {viewingEvent && (
        <EventDetailsModal event={viewingEvent} onClose={() => setViewingEvent(null)} />
      )}
    </div>
  );
}