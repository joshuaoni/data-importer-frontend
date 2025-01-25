"use client";

export default function ConfirmationDialog({
  message,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
    return (
        <div
        className="error-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onCancel} 
        >
            <div
                className="bg-white p-6 rounded shadow-lg w-96 text-center space-y-4"
                onClick={(e) => e.stopPropagation()} 
            >
                <p className="text-gray-800">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
