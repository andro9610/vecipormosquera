import { toast } from 'react-toastify';
import { type ToastOptions } from 'react-toastify';
type NotifyPayload = {
    type?: 'success' | 'info' | 'warn' | 'error' | string;
    message: string;
};

export const useToastNotification = () => {
    const notify = (arg1: NotifyPayload | string, arg2?: string, options?: ToastOptions) => {
        const payload: NotifyPayload = typeof arg1 === 'string'
            ? { type: arg1, message: (arg2 ?? '') }
            : arg1;

        const { type = '', message } = payload;

        const baseOptions: ToastOptions = {
            className: 'my-toast',
            progressClassName: 'my-toast-progress',
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            ...options,
        };

        switch (type) {
            case 'success':
                toast.success(message, { ...baseOptions, className: `${baseOptions.className} my-toast--success` });
                break;
            case 'info':
                toast.info(message, { ...baseOptions, className: `${baseOptions.className} my-toast--info` });
                break;
            case 'warn':
                toast.warn(message, { ...baseOptions, className: `${baseOptions.className} my-toast--warning` });
                break;
            case 'error':
                toast.error(message, { ...baseOptions, className: `${baseOptions.className} my-toast--error` });
                break;
            default:
                toast(message, baseOptions);
                break;
        }
    };

    return { notify };
};