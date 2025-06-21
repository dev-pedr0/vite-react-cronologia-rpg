import { useEffect, useState } from "react";
import type { EventItem } from "../models/Event";
import { STANDARD_TAGS } from "../models/Tags";
import CreatableSelect from "react-select/creatable";

type Props = {
    onSave: (event: EventItem) => void,
    onCancel: () => void,
    eventToEdit?: EventItem,
}

const tagOptions = STANDARD_TAGS.map(tag => ({
    label: tag.label,
    value: tag.value,
}));

export default function EventForm({onSave, onCancel, eventToEdit}: Props){
    const [startYear, setStartYear] = useState(eventToEdit?.startYear ?? 0);
    const [endYear, setEndYear] = useState(eventToEdit?.endYear ?? undefined);
    const [region, setRegion] = useState(eventToEdit?.region ?? '');
    const [description, setDescription] = useState(eventToEdit?.description ?? '');

    const [selectedTags, setSelectedTags] = useState<{ label: string, value: string }[]>(
        eventToEdit?.tags.map(tag => ({ label: tag, value: tag})) ?? []
    );

    useEffect(() => {
        if (eventToEdit) {
        setStartYear(eventToEdit.startYear)
        setEndYear(eventToEdit.endYear)
        setRegion(eventToEdit.region)
        setDescription(eventToEdit.description)
        setSelectedTags(eventToEdit.tags.map(tag => ({ label: tag, value: tag})));
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
            tags: selectedTags.map(t => t.value),
        }
        onSave(newEvent);
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow max-w-md mx-auto"
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          color: 'var(--color-text-primary)',
        }}
        >
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
                <label className="block font-semibold mb-1">
                    Tags
                </label>
                <CreatableSelect
                    isMulti
                    options={tagOptions}
                    value={selectedTags}
                    onChange={(newValue) => setSelectedTags(newValue as { label: string, value: string }[])}
                    className="text-sm"
                    styles={{
                        control: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        menu: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        option: (base, state) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        multiValueLabel: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        multiValueRemove: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        singleValue: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                        input: (base) => ({
                        ...base,
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary',
                        }),
                    }}
                />
            </div>

            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 rounded"
                style={{
                    backgroundColor: 'var(--btn-delete-bg)',
                    color: 'var(--color-text-primary)'
                }}
                >
                    Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded"
                style={{
                    backgroundColor: 'var(--btn-details-bg)',
                    color: 'var(--color-text-primary)'
                }}
                >
                    Salvar
                </button>
            </div>
        </form>
    );
}
