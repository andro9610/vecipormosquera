import { useState } from "react";

type useAttachmentsUtilitiesProps = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
};

export const useAttachementUtilities = ({ attachmentNames, onAttachmentsChange }: useAttachmentsUtilitiesProps) => {
  const clearAttachments = () => {
    onAttachmentsChange([]);
  };

  const removeAttachment = (attachmentName: string, indexToRemove: number) => {
    const nextAttachments = attachmentNames.filter((name, index) => {
      return !(name === attachmentName && index === indexToRemove);
    });

    onAttachmentsChange(nextAttachments);
  };

  const [manualInput, setManualInput] = useState("");

  const handleAddManual = () => {
    if (manualInput.trim()) {
      onAttachmentsChange([...attachmentNames, manualInput.trim()]);
      setManualInput("");
    }
  };

  return {
    clearAttachments,
    removeAttachment,
    manualInput,
    setManualInput,
    handleAddManual,
  };
};
