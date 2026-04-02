export default function DarkTemplate({ data }) {
  return (
    <div className="p-8 bg-black text-white min-h-full">

      <h1 className="text-3xl font-bold">
        {data?.name || "Your Name"}
      </h1>

      <p className="text-gray-400">
        {data?.role || "Your Role"}
      </p>

      <p className="mt-4 text-gray-300">
        {data?.bio || "Your bio"}
      </p>

    </div>
  );
}