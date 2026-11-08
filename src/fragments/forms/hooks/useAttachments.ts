import { useState } from "react";

type UseAttachmentsProps = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
};

export const useAttachments = ({ attachmentNames, onAttachmentsChange }: UseAttachmentsProps) => {
  const [manualInput, setManualInput] = useState("");

  const addAttachment = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onAttachmentsChange([...attachmentNames, trimmedName]);
    setManualInput("");
  };

  const clearAttachments = () => onAttachmentsChange([]);

  const removeAttachment = (attachmentName: string, indexToRemove: number) =>
    onAttachmentsChange(attachmentNames.filter((name, index) => !(name === attachmentName && index === indexToRemove)));

  const handleAddManual = () => addAttachment(manualInput);

  return { clearAttachments, removeAttachment, addAttachment, manualInput, setManualInput, handleAddManual };
};
