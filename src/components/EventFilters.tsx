import { useEffect, useState } from "react";
import { useEventStore } from "../storage/useEventStore";

export type FilterOptions = {
    startYear?: number,
    endYear?: number,
    region?: string,
    description?: string,
    tag?: string,
    sortOrder?: 'asc' | 'desc',
}

type Props = {
    onChange: (filters: FilterOptions) => void;
    layout?: 'grid' | 'stack';
    filters: FilterOptions;
}

export default function EventFilters({onChange, layout, filters: externalFilters}: Props) {
    const [filters, setFilters] = useState<FilterOptions>(externalFilters);

    useEffect(() => {
        setFilters(externalFilters);
    }, [externalFilters]);


    useEffect(() => {
        onChange(filters);
    }, [filters]);

    const events = useEventStore((state) => state.events)
    const uniqueRegions = Array.from(new Set(events.map(e => e.region))).sort()
    const uniqueTags = Array.from(new Set(events.flatMap(e => e.tags))).sort()

    function handleNumberChange(name: keyof FilterOptions, value: string) {
        const num = value.trim() === '' ? undefined : Number(value);
        setFilters((prev) => ({ ...prev, [name]: num }));
    }

    function handleClearFilters() {
        setFilters({ sortOrder: 'asc' });
    }

    return (
        <div 
        className={`p-4 rounded shadow mb-4 ${
            layout === 'stack' ? 'flex flex-col gap-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'
        }`}
        style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}
        >
           <div>
                <label className="block text-sm font-medium">Ano inicial</label>
                <input
                type="number"
                value={filters.startYear || ''}
                onChange={(e) => handleNumberChange('startYear', e.target.value)}
                className="w-full border px-2 py-1 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Ano final</label>
                <input
                type="number"
                value={filters.endYear || ''}
                onChange={(e) => handleNumberChange('endYear', e.target.value)}
                className="w-full border px-2 py-1 rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Região</label>
                <select
                    className="border p-2 rounded bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]"
                    value={filters.region || ''}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value || undefined })}
                    >
                    <option value="">Todas as regiões</option>
                    {uniqueRegions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
            </div>
            <div>
            <label className="block text-sm font-medium">Tag</label>
            <select
                className="border p-2 rounded bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]"
                value={filters.tag || ''}
                onChange={(e) =>
                setFilters({ ...filters, tag: e.target.value || undefined })
                }
            >
                <option value="">Todas as tags</option>
                {uniqueTags.map((tag) => (
                <option key={tag} value={tag}>
                    {tag}
                </option>
                ))}
            </select>
            </div>

            <div>
            <label className="block text-sm font-medium">Descrição</label>
            <input
                type="text"
                value={filters.description || ''}
                onChange={(e) =>
                setFilters({ ...filters, description: e.target.value || undefined })
                }
                className="w-full border px-2 py-1 rounded"
            />
            </div>
            <div>
                <label className="block text-sm font-medium">Ordenar</label>
                <select
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortOrder: e.target.value as 'asc' | 'desc' }))
                }
                className="w-full border px-2 py-1 rounded bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]"
                >
                <option value="asc">Mais antigo → Mais recente</option>
                <option value="desc">Mais recente → Mais antigo</option>
                </select>
            </div>

            <div className={layout === 'stack' ? 'mt-2' : 'md:col-span-3 mt-2'}>
                <button
                onClick={handleClearFilters}
                className="px-4 py-2 rounded font-semibold hover:opacity-90 transition"
                style={{
                    backgroundColor: 'var(--btn-delete-bg)',
                    color: 'var(--color-text-primary)',
                }}
                >
                Limpar filtros
                </button>
            </div> 
        </div>
    );
}