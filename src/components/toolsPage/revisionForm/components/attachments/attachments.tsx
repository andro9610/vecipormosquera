import { MaterialIcon } from "../../../../../fragments/materialIcon/MaterialIcon";
import { useAttachementUtilities } from "./hooks/useAttachementUtilities";

type AttachmentsProps = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
};

export const Attachments = ({ attachmentNames, onAttachmentsChange }: AttachmentsProps) => {
  const { clearAttachments, removeAttachment, manualInput, setManualInput, handleAddManual } =
    useAttachementUtilities({ attachmentNames, onAttachmentsChange });

  return (
    <div className="space-y-4">
      {attachmentNames.length > 0 && (
        <div className="surface-panel bg-base-200/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="font-semibold text-base-content">DOCUMENTOS SELECCIONADOS</h5>
            <button type="button" className="btn btn-danger" onClick={clearAttachments}>
              <MaterialIcon icon="delete_sweep" className="mr-2" />
              Eliminar todos
            </button>
          </div>
          <ul className="space-y-1 text-sm text-base-content/80">
            {attachmentNames.map((name, index) => (
              <li key={`${name}-${index}`} className="flex items-center justify-between gap-2 ml-5">
                <span className="">
                  {index + 1}. {name}
                </span>
                <button
                  type="button"
                  className="btn btn-danger btn-outline"
                  onClick={() => removeAttachment(name, index)}>
                  <MaterialIcon icon="close" className="mr-2" />
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-row w-full gap-2">
        <input
          aria-label="Agregar documento manualmente"
          placeholder="Escribe el nombre del documento y presiona agregar"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddManual();
            }
          }}
          className="input w-full"
        />
        <button type="button" className="btn btn-primary" onClick={handleAddManual}>
          <MaterialIcon icon="add" className="mr-2" />
          Agregar
        </button>
      </div>
    </div>
  );
};
