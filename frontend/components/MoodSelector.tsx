"use client";

const MOODS = ["😊", "😢", "😡", "😴", "🥰", "😐"];

interface MoodSelectorProps {
  value: string;
  onChange: (mood: string) => void;
}

export default function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="flex gap-2">
      {MOODS.map((mood) => (
        <button
          key={mood}
          type="button"
          onClick={() => onChange(mood)}
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all ${
            value === mood
              ? "bg-foreground/10 ring-2 ring-foreground/40 scale-110"
              : "hover:bg-foreground/5"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}
