export type TagDefinition = {
    label: string,
    value: string,
    color: string,
    icon: string,
}

export const STANDARD_TAGS: TagDefinition[] = [
    { label: "Anões", value: "Anões", color: "#A0522D", icon: "Mountain" },
    { label: "Bestiais", value: "Bestiais", color: "#8B0000", icon: "PawPrint" },
    { label: "Humanos", value: "Humanos", color: "#18DBDB", icon: "Sword" },
    { label: "Elfos", value: "Elfos", color: "#228B22", icon: "Leaf" },
    { label: "Gnomos", value: "Gnomos", color: "#DAA520", icon: "Cog" },
    { label: "Halflings", value: "Halflings", color: "#CD853F", icon: "Anchor" },
    { label: "Orcs", value: "Orcs", color: "#556B2F", icon: "Tent" },
    { label: "Política", value: "Política", color: "#4B0082", icon: "Scale" },
    { label: "Guerra", value: "Guerra", color: "#B22222", icon: "Swords" },
    { label: "Divino", value: "Divino", color: "#9370DB", icon: "Cross" },
    { label: "Êxodo", value: "Êxodo", color: "#E08C24", icon: "DoorOpen" },
    { label: "Exploração", value: "Exploração", color: "#D4C900", icon: "Compass" },
    { label: "Fundação", value: "Fundação", color: "#2F4F4F", icon: "University" },
    { label: "Desastre", value: "Desastre", color: "#26030A", icon: "CircleAlert" },
    { label: "Morte", value: "Morte", color: "#000000", icon: "Skull" },
    { label: "Magia", value: "Magia", color: "#8A2BE2", icon: "Sparkles" },
];