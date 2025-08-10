"use client";

import { useState } from "react";

export default function AddCardForm() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    word: "",
    meaning: "",
    example1: "",
    example2: "",
    other: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Card added successfully!");
        setFormData({
          word: "",
          meaning: "",
          example1: "",
          example2: "",
          other: "",
        });
        setShowForm(false);
      } else {
        alert("Failed to add card");
      }
    } catch (err) {
      alert("Error occurred");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Cancel" : "Add New Card"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4 max-w-lg bg-white p-6 rounded shadow text-black"
        >
          <div>
            <label className="block font-medium mb-1" htmlFor="word">
              Word
            </label>
            <input
              type="text"
              name="word"
              id="word"
              placeholder="Enter the word"
              value={formData.word}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="meaning">
              Meaning
            </label>
            <textarea
              name="meaning"
              id="meaning"
              placeholder="Enter the meaning"
              value={formData.meaning}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="example1">
              Example 1
            </label>
            <input
              type="text"
              name="example1"
              id="example1"
              placeholder="First example"
              value={formData.example1}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="example2">
              Example 2
            </label>
            <input
              type="text"
              name="example2"
              id="example2"
              placeholder="Second example"
              value={formData.example2}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-1" htmlFor="other">
              Other Info
            </label>
            <textarea
              name="other"
              id="other"
              placeholder="Additional notes"
              value={formData.other}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded bg-white text-black"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
