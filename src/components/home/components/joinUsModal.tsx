import { MaterialIcon } from "../../../fragments/materialIcon/MaterialIcon";
import { JoinUsForm } from "./joinUsForm/joinUsForm";

interface JoinUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const JoinUsModal: React.FC<JoinUsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg surface-organic p-8"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="btn btn-sm absolute top-4 right-4 bg-transparent p-1"
                    onClick={onClose}
                    aria-label="Cerrar"
                >
                    <MaterialIcon icon="close" className="text-primary" />
                </button>
                <JoinUsForm />
            </div>
        </div>
    );
};
