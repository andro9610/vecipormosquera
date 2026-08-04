import { useRef, type ChangeEvent } from "react";

type useAttachmentsUtilitiesProps = {
  attachmentNames: string[];
  onAttachmentsChange: (attachmentNames: string[]) => void;
};


export const useAttachementUtilities = ({attachmentNames, onAttachmentsChange}: useAttachmentsUtilitiesProps) => {
      const fileInputRef = useRef<HTMLInputElement | null>(null);
    
      const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files ?? []);
        const selectedNames = selectedFiles.map((file) => file.name.trim()).filter(Boolean);
        const mergedNames = Array.from(new Set([...attachmentNames, ...selectedNames]));
        onAttachmentsChange(mergedNames);
        event.target.value = "";
      };
    
      const clearAttachments = () => {
        onAttachmentsChange([]);
      };
    
      const removeAttachment = (attachmentName: string, indexToRemove: number) => {
        const nextAttachments = attachmentNames.filter((name, index) => {
          return !(name === attachmentName && index === indexToRemove);
        });
    
        onAttachmentsChange(nextAttachments);
      };
    
      const openFilePicker = () => {
        fileInputRef.current?.click();
      };

      return {
        fileInputRef,
        handleFileChange,
        clearAttachments,
        removeAttachment,
        openFilePicker
    }
}