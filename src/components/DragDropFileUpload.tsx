"use client";

import { useState, useRef } from "react";

export default function DragDropFileUpload({
    setFileData,
    setErrors,
    showErrorModal,
}: DragDropFileUploadProps) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); 
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFileUpload = async (file: File) => {
        setErrors(null);
        setIsLoading(true); 
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/api/files/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setFileData(data.sheetData);
                data.validationErrors.length && setErrors(data.validationErrors);
                data.validationErrors && showErrorModal(true);
            } else {
                console.log("Validation errors:", data.validationErrors);
            }
        } catch (error) {
            console.error("File upload failed:", error);
            alert("Failed to upload the file. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div>
            <div
                className="border-2 border-dashed rounded p-6 text-center bg-gray-50 cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                    setFileName(file.name);
                    setFileToUpload(file);
                }
                }}
                onClick={() => inputRef.current?.click()}
            >
                <p className="text-gray-500">Drag and drop your .xlsx file here</p>
                <p className="text-gray-400">or click to browse</p>
                <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept=".xlsx"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                    setFileName(file.name);
                    setFileToUpload(file);
                    }
                }}
                />
            </div>

            {fileName && (
                <div className="mt-4 text-gray-700">
                    <p>Selected file: {fileName}</p>
                    <button
                        className={`px-4 py-2 mt-4 rounded ${
                        isLoading
                            ? "bg-gray-400 text-white cursor-not-allowed" 
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        onClick={() => {
                        if (fileToUpload && !isLoading) {
                            handleFileUpload(fileToUpload);
                        }
                        }}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Loading..." : "Upload"}
                    </button>
                </div>
            )}
        </div>
    );
}
