import { motion } from "framer-motion";
import type { EventItem } from "../models/Event";
import { getTagMeta } from "../models/Tags";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import EventDetailsModal from "./EventDetailsModal";
import type { FilterOptions } from "./EventFilters";

type Props = {
    events: EventItem[];
    filters: FilterOptions;
};

export default function Timeline({ events, filters }: Props) {
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const timelineWidth = events.length * 260;

    const filteredEvents = events.filter((event) => {
        const {
            startYear,
            endYear,
            region,
            description,
            tag,
        } = filters;

        if (startYear && event.startYear < startYear) return false;
        if (endYear && (event.endYear ?? event.startYear) > endYear) return false;
        if (region && event.region !== region) return false;
        if (description && !event.description.toLowerCase().includes(description.toLowerCase())) return false;
        if (tag && !event.tags.includes(tag)) return false;

        return true;
    });

    const sortedEvents = [...filteredEvents].sort((a, b) => {
        if (filters.sortOrder === 'desc') {
            return (b.startYear ?? 0) - (a.startYear ?? 0);
        }
        return (a.startYear ?? 0) - (b.startYear ?? 0);
    });

    return (
        <div 
        className="overflow-x-auto p-8 border"
        style={{ backgroundColor: 'var(--color-bg-secondary)'}}
        >
            <h1>Linha do Tempo</h1>
            <div
                className="relative min-h-[500px]"
                style={{ width: `${timelineWidth}px` }}
            >

                <div className="absolute top-1/2 left-0 right-0 h-1 z-0" 
                style={{ backgroundColor: 'var(--color-bg-primary)' }}
                />

                {sortedEvents.map((event, index) => {
                    const isEven = index % 2 === 0;
                    const positionStyle = isEven
                        ? {
                            bottom: "calc(50% + 25px)",
                        }
                        : {
                            top: "calc(50% + 30px)",
                        };

                    return (
                        <motion.div
                        key={event.id}
                        className="absolute z-10 w-56 mx-4 p-4 rounded shadow cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300"
                        style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        left: `${index * 260}px`,
                        transform: 'translateY(-50%)',
                        ...positionStyle,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setSelectedEvent(event)}
                        >
                            <span
                                className="absolute left-1/2 w-0.5 h-6"
                                style={{
                                    backgroundColor: 'var(--color-bg-primary)',
                                    top: isEven ? '100%' : 'auto',
                                    bottom: isEven ? 'auto' : '100%',
                                    transform: 'translateX(-50%)',
                                }}
                                />
                            <div className="font-bold text-sm mb-1 break-words">
                                {event.startYear}
                                {event.endYear && event.endYear !== event.startYear
                                ? ` - ${event.endYear}`
                                : ""}{" "}
                                — {event.region}
                            </div>
                            <div className="text-xs mb-2 break-words">{event.description}</div>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {event.tags.map((tag) => {
                                const meta = getTagMeta(tag);
                                if (!meta) return null;
                                const IconComp = Icons[meta.icon as keyof typeof Icons] as LucideIcon;
                                return (
                                    <span
                                    key={tag}
                                    className="flex items-center px-2 py-1 rounded text-xs font-medium text-white"
                                    style={{ backgroundColor: meta.color }}
                                    >
                                    {IconComp && <IconComp className="w-4 h-4 mr-1" />}
                                    {meta.label}
                                    </span>
                                );
                                })}
                            </div>
                        </motion.div>
                );
                })}
            </div>
            {selectedEvent && (
                <EventDetailsModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>    
    );
}