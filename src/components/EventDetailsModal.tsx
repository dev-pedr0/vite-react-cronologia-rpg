import type { EventItem as EventItemType } from '../models/Event';

type Props = {
    event: EventItemType;
    onClose: () => void;
}

export default function EventDetailsModal({ event, onClose }: Props) {
    return (
        <div className='fixed inset-0 bg-black/80 bg flex items-center justify-center z-50'>
            <div className='bg-white rounded p-6 shadow-md max-w-lg w-full relative'>
                <h2 className='text-xl font-bold mb-2'>
                    {event.startYear}
                    {event.endYear && event.endYear !== event.startYear ? `-${event.endYear}` : ''} - {event.region}
                </h2>
                <p className='mb-2'>{event.description}</p>
                {event.tags.length > 0 && (
                    <p className='text-sm text-gray-600'>Tags: {event.tags.join(', ')}</p>
                )}
                <button onClick={onClose} className='mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800'>
                    Fechar
                </button>
            </div>
        </div>
    );
}