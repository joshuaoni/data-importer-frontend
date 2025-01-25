"use client";

import { useState } from "react";

export default function ErrorModal({ errors, closeModal }: ErrorModalProps) {
    const [activeSheet, setActiveSheet] = useState(errors[0]?.sheet);

    return (
        <div
        className="error-modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closeModal} 
        >
            <div
                className="w-full max-w-3xl sm:max-w-2xl md:max-w-lg p-6 bg-white rounded shadow-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="mb-4 text-xl font-bold">Validation Errors</h2>
        
                <div className="flex space-x-4 border-b pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
                    {errors.map((sheetErrors, idx) => (
                        <button
                        key={idx}
                        onClick={() => setActiveSheet(sheetErrors.sheet)}
                        className={`px-4 py-2 whitespace-nowrap ${
                            activeSheet === sheetErrors.sheet
                            ? "border-b-2 border-blue-500 text-blue-600"
                            : "text-gray-500"
                        }`}
                        >
                        {sheetErrors.sheet}
                        </button>
                    ))}
                </div>
        
                <div className="mt-4 space-y-2 max-h-80 overflow-y-auto">
                    {errors
                        .find((sheetErrors) => sheetErrors.sheet === activeSheet)
                        ?.errors.map((err, index) => (
                        <div
                            key={index}
                            className="p-2 border rounded bg-red-50 text-red-700"
                        >
                            Row {err.row}: {err.error}
                        </div>
                    ))}
                </div>
        
                <button
                onClick={closeModal}
                className="mt-6 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                Close
                </button>
            </div>
        </div>
    );
}
