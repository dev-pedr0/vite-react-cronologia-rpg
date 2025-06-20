import { motion } from "framer-motion";
import type { EventItem } from "../models/Event";
import { getTagMeta } from "../models/Tags";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Props = {
    events: EventItem[];
};

export default function Timeline({ events }: Props) {
    return (
        <div className="overflow-x-auto p-8 border bg-gray-50">
            <div className="relative min-w-max min-h-[300px] flex items-center">
                
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-black z-0" />

                {events.map((event) => (
                    <motion.div
                        key={event.id}
                        className="relative z-10 w-56 mx-4 p-4 bg-white text-black rounded shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="font-bold text-sm mb-1 break-words">
                            {event.startYear}
                            {event.endYear && event.endYear !== event.startYear ? ` - ${event.endYear}` : ""} — {event.region}
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
                ))}
            </div>
        </div>
    );
}