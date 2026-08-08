import { toast } from 'react-toastify';

type NotifyPayload = {
    type?: 'success' | 'info' | 'warn' | 'error' | string;
    message: string;
};

export const useToastNotification = () => {
    const notify = (arg1: NotifyPayload | string, arg2?: string) => {
        const payload: NotifyPayload = typeof arg1 === 'string'
            ? { type: arg1, message: (arg2 ?? '') }
            : arg1;

        const { type = '', message } = payload;

        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'info':
                toast.info(message);
                break;
            case 'warn':
                toast.warn(message);
                break;
            case 'error':
                toast.error(message);
                break;
            default:
                toast(message);
                break;
        }
    };

    return { notify };
};