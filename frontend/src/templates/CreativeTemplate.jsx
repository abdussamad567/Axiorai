export default function CreativeTemplate({ data }) {
  return (
    <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white min-h-full">

      <h1 className="text-3xl font-bold">
        {data?.name || "Your Name"}
      </h1>

      <p className="text-lg mt-2">
        {data?.role || "Your Role"}
      </p>

      <p className="mt-4 opacity-90">
        {data?.bio || "Your bio"}
      </p>

    </div>
  );
}