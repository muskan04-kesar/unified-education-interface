import { Button } from "../ui/button";
import { useState } from "react";


export default function EditSchemesForm({ schemes, setSchemes }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleAddScheme = () => {
    if (!name || !description || !link) return;
    setSchemes([...schemes, { name, description, link }]);
    setName(""); setDescription(""); setLink("");
    alert("Scheme added successfully!");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded">
      <h2 className="text-xl font-bold mb-4">Add / Edit Scheme</h2>
      <input
        type="text"
        placeholder="Scheme Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-2"
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
      />
      <Button onClick={handleAddScheme}>Add Scheme</Button>
    </div>
  );
}
