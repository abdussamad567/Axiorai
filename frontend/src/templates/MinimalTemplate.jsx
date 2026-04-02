export default function MinimalTemplate({ data }) {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-semibold">
        {data?.name || "Your Name"}
      </h1>

      <p className="text-gray-500">
        {data?.role || "Your Role"}
      </p>

      <p className="mt-4 text-gray-600">
        {data?.bio || "Your bio"}
      </p>
    </div>
  );
}