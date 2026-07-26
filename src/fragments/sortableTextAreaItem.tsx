import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { DragEndEvent } from '@dnd-kit/core';

type SortableTextareaItemProps = {
    id: string;
    value: string;
    placeholder: string;
    onChange: (id: string, value: string) => void;
    onRemove: (id: string) => void;
};

export const handleDragEnd = (event: DragEndEvent, fun: Function) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
        return;
    }

    fun?.();
}


export const SortableTextareaItem = ({
    id,
    value,
    placeholder,
    onChange,
    onRemove,
}: SortableTextareaItemProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        backgroundColor: isDragging ? '#f8fafc' : '#ffffff',
        border: isDragging ? '1px solid #0d6efd' : '1px solid #d7dde5',
        borderRadius: '1rem',
        boxShadow: isDragging ? '0 10px 24px rgba(13, 110, 253, 0.18)' : '0 6px 18px rgba(15, 23, 42, 0.06)',
        touchAction: 'none',
    };

    return (
        <div ref={setNodeRef} style={style} className="d-flex align-items-start gap-2 ps-3 py-3 mb-3">
            <Form.Control
                as="textarea"
                rows={4}
                value={value}
                onChange={(event) => onChange(id, event.target.value)}
                placeholder={placeholder}
                className="flex-grow-1 border-0 shadow-none"
                style={{ resize: 'vertical', minHeight: '4.5rem', backgroundColor: 'transparent' }}
            />
            <div className="d-flex flex-column gap-2" style={{ minWidth: '3.5rem' }}>
                <Button
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{ width: '3rem', height: '3rem', padding: 0 }}
                    onClick={() => onRemove(id)}
                    aria-label="Eliminar elemento"
                >
                    <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>×</span>
                </Button>
                <Button
                    type="button"
                    variant="outline-secondary"
                    size="sm"
                    className="d-flex align-items-center justify-content-center rounded"
                    style={{ width: '3rem', height: '3rem', padding: 0, userSelect: 'none', touchAction: 'none' }}
                    {...attributes}
                    {...listeners}
                    aria-label="Mover elemento"
                >
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>⋮⋮</span>
                </Button>
            </div>
        </div>
    );
}
