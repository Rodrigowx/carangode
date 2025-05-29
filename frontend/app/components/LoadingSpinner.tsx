export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 pointer-events-none">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin pointer-events-auto"></div>
    </div>
  );
} 