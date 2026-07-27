import React from 'react'

export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-gray-900">404</h1>
        <p className="mb-6 text-xl font-medium text-gray-600">
          Page Not Found
        </p>
        <button className="rounded-lg bg-[#232323] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-black">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}