import type { EventItem } from "../models/Event"
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type EventStore = {
    events: EventItem[],
    addEvent: (event: EventItem) => void,
    deleteEvent: (id: string) => void,
    updateEvent: (event:EventItem) => void,
}

export const useEventStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      deleteEvent: (id) => set((state) => ({events: state.events.filter((e) => e.id !== id),
        })),
      updateEvent: (event) => set((state) => ({events: state.events.map((e) => e.id === event.id ? event : e),
        })),
    }),
    {
      name: 'event-storage',
    }
  ),
);

