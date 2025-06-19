import type { EventItem as EventItemType } from '../models/Event'
import * as Icons from "lucide-react";
import type { LucideIcon } from 'lucide-react';
import { STANDARD_TAGS } from "../models/Tags";
import React from 'react';

type Props = {
    event: EventItemType,
    onEdit: (event: EventItemType) => void,
    onDelete: (id: string) => void,
    onViewDetails: (event: EventItemType) => void,
}

function getTagMeta(tag: string) {
    return STANDARD_TAGS.find(t => t.value.toLowerCase() === tag.toLocaleLowerCase());
}

export default function EventItem ({event, onEdit, onDelete, onViewDetails}: Props) {
    return (
        <div className='border rouded p-3 mb-2 bg-white shadow flex-col justify-center items-center'>
            <div>
                <div className="font-bold text-lg">
                    {event.startYear}
                    {event.endYear && event.endYear !== event.startYear ? `-${event.endYear}` : ''}
                    {' '} - {event.region}
                </div>
                <div>{event.description}</div>

                {event.tags.length > 0 && (
                    <div className='mt-2 flex flex-wrap justify-center gap-2'>
                        {event.tags.map((tag) => {
                            const meta = getTagMeta(tag);
                            const metaIcon = meta?.icon ? Icons[meta.icon as keyof typeof Icons] as LucideIcon : null;
                            console.log("metaIcon:", metaIcon);
                            return (
                                <span key={tag} className='flex items-center px-2 py-1 rounded text-xs font-medium'
                                style={{ backgroundColor: meta?.color ?? '#999', color: 'white' }}>
                                    {metaIcon && React.createElement(metaIcon, { className: 'w-4 h-4 mr-1' })}
                                    {meta?.label ?? tag}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className='space-x-2'>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(event);
                    }}
                    className='px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500'>
                    Editar
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(event.id);
                    }}
                    className='mt-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600'>
                    Deletar
                </button>
                <button onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(event);
                }} className='px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'>
                    Detalhes
                </button>
            </div>
        </div>
    )
}