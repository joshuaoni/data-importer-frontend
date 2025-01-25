"use client";

import DataPreview from "@/components/DataPreview";
import DragDropFileUpload from "@/components/DragDropFileUpload";
import ErrorModal from "@/components/ErrorModal";
import { useState } from "react";

export default function ImportPage() {
    const [fileData, setFileData] = useState<any>(null);
    const [errors, setErrors] = useState<any>(null);
    const [isErrorModalVisible, setErrorModalVisible] = useState<boolean>(false);

    const handleUploadAnotherFile = () => {
        setFileData(null);
        setErrors(null);
        window.location.reload();
    };

    return (
        <main className="p-6 max-w-4xl mx-auto space-y-6">
            <h1 className="text-xl font-semibold">Upload and Import Excel Data</h1>

            {fileData && (
                <button
                onClick={handleUploadAnotherFile}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                Upload Another File
                </button>
            )}

            {!fileData ? (
                <DragDropFileUpload
                setFileData={setFileData}
                setErrors={setErrors}
                showErrorModal={setErrorModalVisible}
                />
            ) : (
                <DataPreview fileData={fileData} errors={errors} />
            )}

            {isErrorModalVisible && errors && (
                <ErrorModal
                errors={errors}
                closeModal={() => setErrorModalVisible(false)}
                />
            )}
        </main>
    );
}
