"use client";

import { useEffect, useState } from "react";

type CardType = {
  _id: string;
  word: string;
  meaning: string;
  example1?: string;
  example2?: string;
  other?: string;
  createdAt: string;
};

export default function CardList() {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const res = await fetch("/api/cards");
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  // ✅ Move handleDelete inside the component so it can access setCards
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/cards/${id}`, { method: "DELETE" });

      if (res.ok) {
        setCards((prev) => prev.filter((card) => card._id !== id));
      } else {
        console.error("Failed to delete card");
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <div className="mt-6 space-y-4">
      {cards.map((card) => (
        <div
          key={card._id}
          onClick={() => toggleExpand(card._id)}
          className="cursor-pointer border p-4 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {card.word}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {card.createdAt
                ? new Date(card.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "No Date"}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔒 prevent card toggle on delete click
                handleDelete(card._id);
              }}
              className="text-red-500 text-sm hover:underline"
            >
              Delete
            </button>
          </div>

          {expandedCardId === card._id && (
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <p>
                <strong>Meaning:</strong> {card.meaning}
              </p>
              {card.example1 && (
                <p>
                  <strong>Example 1:</strong> {card.example1}
                </p>
              )}
              {card.example2 && (
                <p>
                  <strong>Example 2:</strong> {card.example2}
                </p>
              )}
              {card.other && (
                <p>
                  <strong>Other Info:</strong> {card.other}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
