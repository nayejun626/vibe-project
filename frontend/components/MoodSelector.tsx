"use client";

const MOODS = ["😊", "😢", "😡", "😴", "🥰", "😐"];

interface MoodSelectorProps {
  value: string;
  onChange: (mood: string) => void;
}

export default function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(mood)}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl transition-all duration-200 ${
            value === mood
              ? "scale-105 bg-primary/10 shadow-sm ring-2 ring-accent ring-offset-2 ring-offset-card"
              : "bg-slate-50 hover:bg-slate-100"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
