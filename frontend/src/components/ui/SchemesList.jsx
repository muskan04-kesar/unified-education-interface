import { Card } from "../ui/card";


export default function SchemesList({ schemes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {schemes.map((scheme, idx) => (
        <Card key={idx} className="p-4 shadow-lg">
          <h3 className="font-bold text-lg">{scheme.name}</h3>
          <p className="text-gray-600">{scheme.description}</p>
          <a href={scheme.link} target="_blank" className="text-indigo-600 hover:underline">Go to Scheme</a>
        </Card>
      ))}
    </div>
  );
}
