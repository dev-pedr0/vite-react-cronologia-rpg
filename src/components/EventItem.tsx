import type { EventItem as EventItemType } from '../models/Event'

type Props = {
    event: EventItemType,
    onEdit: (event: EventItemType) => void,
    onDelete: (id: string) => void,
    onViewDetails: (event: EventItemType) => void,
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
                    <div className='mt-1 text-sm text-gray-500'>
                        Tags: {event.tags.join(', ')}
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