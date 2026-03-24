export default function ModernTemplate({ data }) {
  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold">
        {data.name || "Your Name"}
      </h1>

      <p className="text-purple-500">
        {data.role || "Your Role"}
      </p>

      <p className="mt-4 text-gray-600">
        {data.bio || "Your bio will appear here"}
      </p>

    </div>
  );
}