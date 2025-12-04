import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export default function SchemesPage() {
  const [schemes, setSchemes] = useState([]);

  // demo data for now
  useEffect(() => {
    setSchemes([
      { id: 1, name: "PM Scholarship", description: "Scholarship for meritorious students" },
      { id: 2, name: "Girl Child Grant", description: "Financial aid for girl child education" },
      { id: 3, name: "Rural Digital Program", description: "Digital literacy program in rural areas" }
    ]);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Schemes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="p-6 shadow-lg border">
            <h2 className="text-xl font-bold mb-2">{scheme.name}</h2>
            <p className="text-gray-700">{scheme.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
