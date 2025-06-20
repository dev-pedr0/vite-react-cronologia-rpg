import type { EventItem as EventItemType } from '../models/Event';

type Props = {
    event: EventItemType;
    onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div 
            className="rounded p-6 shadow-md max-w-lg w-full relative"
            style={{
                backgroundColor: 'var(--color-bg-primary)',
                color: 'var(--color-text-secondary)',
            }}
            >
                <h2 className='text-xl font-bold mb-2'>
                    {event.startYear}
                    {event.endYear && event.endYear !== event.startYear ? `-${event.endYear}` : ''} - {event.region}
                </h2>
                <p className='mb-2'>{event.description}</p>
                {event.tags.length > 0 && (
                    <p className='text-sm'>Tags: {event.tags.join(', ')}</p>
                )}
                <button onClick={onClose} 
                    className="mt-4 px-4 py-2 rounded hover:opacity-90"
                    style={{
                    backgroundColor: 'var(--color-bg-secondary)',
                    color: 'white',
                    }}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}