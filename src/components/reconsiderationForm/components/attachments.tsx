import { MaterialIcon } from "../../../fragments/MaterialIcon";
import { ACCEPTED_EXTENSIONS } from "../const/const";
import { useAttachementUtilities } from "../hooks/useAttachementUtilities";

type AttachmentsProps = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
};

export const Attachements = ({ attachmentNames, onAttachmentsChange }: AttachmentsProps) => {
  const { fileInputRef, handleFileChange, clearAttachments, removeAttachment, openFilePicker } =
    useAttachementUtilities({ attachmentNames, onAttachmentsChange });

  return (
    <div className="space-y-4">
      <div>
        <input
          id="reconsideracionAnexos"
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleFileChange}
        />
      </div>

      {attachmentNames.length > 0 && (
        <div className="surface-panel bg-base-200/30 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h5 className="text-sm font-semibold text-base-content">Documentos seleccionados</h5>
            <button type="button" className="btn btn-danger btn-sm" onClick={clearAttachments}>
              <MaterialIcon icon="delete_sweep" className="mr-2" />
              Limpiar
            </button>
          </div>
          <ul className="space-y-1 text-sm text-base-content/80">
            {attachmentNames.map((name, index) => (
              <li key={`${name}-${index}`} className="flex items-center justify-between gap-2">
                <span>
                  {index + 1}. {name}
                </span>
                <button
                  type="button"
                  className="btn btn-danger btn-outline btn-sm"
                  onClick={() => removeAttachment(name, index)}>
                  <MaterialIcon icon="close_small" className="mr-2" />
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-center gap-2">
        <button type="button" className="btn btn-outline" onClick={openFilePicker}>
          <MaterialIcon icon="add_notes" className="mr-2" />
          Agregar Documentos
        </button>
      </div>
    </div>
  );
};
