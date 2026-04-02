export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse border p-4 rounded">
      <div className="bg-gray-300 h-40 mb-2"></div>
      <div className="bg-gray-300 h-4 w-3/4 mb-1"></div>
      <div className="bg-gray-300 h-4 w-1/2"></div>
    </div>
  );
}