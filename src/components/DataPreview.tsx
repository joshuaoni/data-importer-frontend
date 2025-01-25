import { useState } from "react";
import Pagination from "./Pagination";
import ConfirmationDialog from "./ConfirmationDialog";

const ROWS_PER_PAGE = 10;

export default function DataPreview({ fileData, errors }: DataPreviewProps) {
    const [currentSheet, setCurrentSheet] = useState(Object.keys(fileData)[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [data, setData] = useState(fileData);
    const [rowToDelete, setRowToDelete] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmationDialog, setConfirmationDialog] = useState<ConfirmationDialogProps | null>(null);

    const totalPages = Math.ceil(data[currentSheet].length / ROWS_PER_PAGE);
    const paginatedData = data[currentSheet].slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE
    );
    

    const handleDeleteRow = (index: number) => {
        setRowToDelete(index);
        setConfirmationDialog({
        message: "Are you sure you want to delete this row?",
        onConfirm: () => confirmDeleteRow(index),
        onCancel: () => setConfirmationDialog(null),
        });
    };

    const confirmDeleteRow = (index: number) => {
        if (index !== null) {
            const newData = { ...data };
            newData[currentSheet].splice(index, 1); 
            setData(newData);
            setRowToDelete(null); 
            setConfirmationDialog(null); 
        }
    };

    const handleImport = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch("http://localhost:5000/api/files/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rows: data[currentSheet] }),
            });

            const result: {
                importedRows: Record<string, any>[];
                importedCount: number;
                skippedCount: number;
                error?: string;
            } = await response.json();

            if (response.ok) {
                const findRowIndices = (row: Record<string, any>) =>
                data[currentSheet].reduce((indices: number[], currentRow, idx) => {
                    if (Object.keys(row).every((key) => row[key] === currentRow[key])) {
                    indices.push(idx);
                    }
                    return indices;
                }, []);

                const importedRowIndices = result.importedRows.reduce((indices: number[], row: Record<string, any>) => {
                const rowIndices = findRowIndices(row);
                return [...indices, ...rowIndices];
                }, []);

                const filteredData = data[currentSheet].filter(
                (_, idx) => !importedRowIndices.includes(idx)
                );

                setData({
                ...data,
                [currentSheet]: filteredData,
                });

                setConfirmationDialog({
                message: `Imported: ${result.importedCount} rows.\nSkipped: ${result.skippedCount} rows.`,
                onConfirm: () => setConfirmationDialog(null),
                onCancel: () => setConfirmationDialog(null),
                });
            } else {
                setConfirmationDialog({
                message: `Error importing data: ${result.error}`,
                onConfirm: () => setConfirmationDialog(null),
                onCancel: () => setConfirmationDialog(null),
                });
            }
        } catch (error) {
            setConfirmationDialog({
                message: "Failed to import data due to a network error.",
                onConfirm: () => setConfirmationDialog(null),
                onCancel: () => setConfirmationDialog(null),
            });
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <>
            {data[currentSheet].length ? <div className="space-y-4">
                <select
                    className="p-2 border rounded w-full sm:w-auto"
                    value={currentSheet}
                    onChange={(e) => {
                    setCurrentSheet(e.target.value);
                    setCurrentPage(1);
                    }}
                >
                    {Object.keys(data).map((sheet) => (
                    <option key={sheet} value={sheet}>
                        {sheet}
                    </option>
                    ))}
                </select>
        
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr>
                                {Object.keys(data[currentSheet][0]).map((key) => {
                                    if (key === "errors") return null;
                                    return (
                                        <th className="border p-2" key={key}>
                                        {key}
                                        </th>
                                    );
                                })}
                            <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row, index) => {
                                const rowErrors = row.errors || []; 
                                const hasError = rowErrors.length > 0;
                    
                                const rowWithoutErrors = { ...row };
                                delete rowWithoutErrors.errors;
                    
                                return (
                                    <tr key={index}>
                                        {Object.values(rowWithoutErrors).map((value, idx) => (
                                            <td
                                            className={hasError ? "opacity-40 border p-2" : "border p-2"}
                                            key={idx}
                                            >
                                            {String(value)}
                                            </td>
                                        ))}
                                        <td className="border p-2 text-center">
                                            <button
                                            onClick={() => handleDeleteRow(index)}
                                            className="text-red-600 hover:underline"
                                            >
                                            Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
        
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
        
                <button
                    className={`px-4 py-2 text-white rounded w-full sm:w-auto ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                    onClick={handleImport}
                    disabled={isLoading} 
                >
                    {isLoading ? "Importing..." : "Import Data"}
                </button>
            
                {confirmationDialog && (
                    <ConfirmationDialog
                    message={confirmationDialog.message}
                    onConfirm={confirmationDialog.onConfirm}
                    onCancel={confirmationDialog.onCancel}
                    />
                )}
            </div> : <p>File is empty.</p>}
        </>
    );
}
