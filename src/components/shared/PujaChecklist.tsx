"use client";

import { useEffect, useState } from "react";

interface ChecklistItem {
  icon: string;
  name: string;
}

interface PujaChecklistProps {
  items: ChecklistItem[];
  storageKey: string;
}

const DEFAULT_ITEMS: ChecklistItem[] = [
  { icon: "🥛", name: "Milk (Dudh)" },
  { icon: "🍯", name: "Honey (Madhu)" },
  { icon: "🫙", name: "Yogurt (Dahi)" },
  { icon: "🧈", name: "Ghee" },
  { icon: "💧", name: "Gangajal (Holy Water)" },
  { icon: "🌿", name: "Bel Patra (Bael Leaves)" },
  { icon: "🌸", name: "Dhatura Flowers" },
  { icon: "🌺", name: "Red Hibiscus" },
  { icon: "🪔", name: "Diya (Oil Lamp)" },
  { icon: "🕯️", name: "Camphor (Kapoor)" },
  { icon: "🪷", name: "Incense Sticks (Agarbatti)" },
  { icon: "🍌", name: "Fruits and Prasad" },
];

export default function PujaChecklist({
  items = DEFAULT_ITEMS,
  storageKey,
}: PujaChecklistProps) {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setChecked(
      Array.isArray(saved) && saved.length === items.length
        ? saved
        : new Array(items.length).fill(false)
    );
  }, [storageKey, items.length]);

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  function reset() {
    const blank = new Array(items.length).fill(false);
    localStorage.setItem(storageKey, JSON.stringify(blank));
    setChecked(blank);
  }

  const checkedCount = checked.filter(Boolean).length;
  const progress = items.length ? (checkedCount / items.length) * 100 : 0;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
        <span style={{ fontSize: "0.9rem", color: "var(--text-medium)" }}>
          {checkedCount} / {items.length} items prepared
        </span>
        <button className="sk-btn sk-btn-outline" onClick={reset} style={{ padding: "0.3rem 1rem", fontSize: "0.8rem" }}>
          Reset
        </button>
      </div>

      <div className="checklist-progress-bar">
        <div className="checklist-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="checklist-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className={`checklist-item${checked[i] ? " checked" : ""}`}
            onClick={() => toggle(i)}
            role="checkbox"
            aria-checked={checked[i]}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); }
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-medium)", flex: 1 }}>{item.name}</span>
            <span className="item-tick">{checked[i] ? "✓" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
