interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface Error {
  row: number;
  error: string;
}

interface ErrorModalProps {
  errors: { sheet: string; errors: Error[] }[];
  closeModal: () => void;
}

interface DragDropFileUploadProps {
  setFileData: (data: any) => void;
  setErrors: (errors: any) => void;
  showErrorModal: (show: boolean) => void;
}


interface DataPreviewProps {
  fileData: { [sheetName: string]: any[] };
  errors: { [sheetName: string]: { row: number; error: string }[] };
}

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}