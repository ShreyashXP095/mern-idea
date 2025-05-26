import { AlertTriangle } from "lucide-react";

export default function RateLimitedUI() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="card-title text-xl font-semibold text-gray-800">
            Rate Limit Reached
          </h2>
          <p className="text-gray-600">
            You've made too many requests. Please wait before making another request.
          </p>
          <div className="bg-orange-50 rounded-lg p-3 text-sm text-orange-700 border border-orange-200 w-full mt-2">
            Please try again in a few minutes.
          </div>
          <div className="card-actions w-full mt-4">
            <button
              className="btn btn-outline btn-block"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
