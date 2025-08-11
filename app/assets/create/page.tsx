"use client";

import { useState } from "react";
import { createAsset } from "@/lib/data";
import { useRouter } from "next/navigation";

export default function CreateAssetPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [events, setEvents] = useState([{ date: "", title: "", description: "" }]);

  const handleEventChange = (index: number, field: string, value: string) => {
    const updatedEvents = [...events];
    (updatedEvents[index] as any)[field] = value;
    setEvents(updatedEvents);
  };

  const addEvent = () => {
    setEvents([...events, { date: "", title: "", description: "" }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Call createAsset without providing `id`
    const newAsset = createAsset({
      name,
      description,
      image,
      events,
    });

    // Redirect to the asset’s page
    router.push(`/assets/${newAsset.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Asset</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Asset Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <h2 className="font-semibold">Events</h2>
        {events.map((event, index) => (
          <div key={index} className="space-y-2 border p-2 rounded">
            <input
              type="text"
              placeholder="Date"
              value={event.date}
              onChange={(e) => handleEventChange(index, "date", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={event.title}
              onChange={(e) => handleEventChange(index, "title", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={event.description}
              onChange={(e) => handleEventChange(index, "description", e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addEvent} className="px-4 py-2 bg-gray-200 rounded">
          + Add Event
        </button>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Asset
        </button>
      </form>
    </div>
  );
}