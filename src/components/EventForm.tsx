import { useEffect, useState } from "react"
import type { EventItem } from "../models/Event"

type Props = {
    onSave: (event: EventItem) => void,
    onCancel: () => void,
    eventToEdit?: EventItem,
}

export default function EventForm({onSave, onCancel, eventToEdit}: Props){
    const [startYear, setStartYear] = useState(eventToEdit?.startYear ?? 0);
    const [endYear, setEndYear] = useState(eventToEdit?.endYear ?? undefined);
    const [region, setRegion] = useState(eventToEdit?.region ?? '');
    const [description, setDescription] = useState(eventToEdit?.description ?? '');
    const [tags, setTags] = useState(eventToEdit?.tags.join(', ') ?? '');

    useEffect(() => {
        if (eventToEdit) {
        setStartYear(eventToEdit.startYear)
        setEndYear(eventToEdit.endYear)
        setRegion(eventToEdit.region)
        setDescription(eventToEdit.description)
        setTags(eventToEdit.tags.join(', '))
        }
    }, [eventToEdit]);

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        if (!region || !description) {
            alert('Preencha ao menos a regão e a descrição');
            return;
        }
        const newEvent: EventItem = {
            id: eventToEdit?.id?? crypto.randomUUID(),
            startYear,
            endYear: endYear || undefined,
            region,
            description,
            tags: tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0),
        }
        onSave(newEvent);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow max-w-md mx-auto">
            <div className="mb-2">
                <label className="block font-semibold">Ano Inicial</label>
                <input type="number" value={startYear} onChange={(e) => setStartYear(Number(e.target.value))} className="w-full border px-2 py-1 rounded" required/>
            </div>
            <div className="mb-2">
                <label className="block font-semibold">Ano Final (opcional)</label>
                <input
                type="number"
                value={endYear ?? ''}
                onChange={(e) => {
                    const val = e.target.value
                    setEndYear(val === '' ? undefined : Number(val))
                }}
                className="w-full border px-2 py-1 rounded"
            />
            </div>

            <div className="mb-2">
                <label className="block font-semibold">Região</label>
                <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                required
                />
            </div>

            <div className="mb-2">
                <label className="block font-semibold">Descrição</label>
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                required
                />
            </div>

            <div className="mb-2">
                <label className="block font-semibold">Tags (separadas por vírgula)</label>
                <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border px-2 py-1 rounded"
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                    Salvar
                </button>
            </div>
        </form>
    );
}
