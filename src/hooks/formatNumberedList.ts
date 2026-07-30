export type NumberedListItem = {
    value: string;
};

export const formatNumberedList = (items: NumberedListItem[]) => {
    return items
        .map((item, index) => {
            const trimmedValue = item.value.trim();
            return trimmedValue ? `${index + 1}. ${trimmedValue}` : '';
        })
        .filter(Boolean)
        .join('\n');
};

export const formatWordText = (value: string) => {
    const normalizedValue = (value ?? '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n');

    return normalizedValue
        .split('\n')
        .map((part) => part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))
        .join('<w:br/>');
};
