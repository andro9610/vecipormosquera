import { toast, type ToastOptions } from "react-toastify";

export type NotificationType = "success" | "info" | "warn" | "error" | string;

type NotifyPayload = {
  type?: NotificationType;
  message: string;
};

const baseOptions: ToastOptions = {
  className: "my-toast",
  progressClassName: "my-toast-progress",
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: false,
  pauseOnHover: true,
};

const variantClassNames: Record<string, string> = {
  success: "my-toast--success",
  info: "my-toast--info",
  warn: "my-toast--warning",
  error: "my-toast--error",
};

export const notify = (arg1: NotifyPayload | string, arg2?: string, options?: ToastOptions) => {
  const payload: NotifyPayload = typeof arg1 === "string" ? { type: arg1, message: arg2 ?? "" } : arg1;
  const { type = "", message } = payload;
  const toastOptions: ToastOptions = { ...baseOptions, ...options };
  const variantClassName = variantClassNames[type];

  if (!variantClassName) return toast(message, toastOptions);

  return toast[type as "success" | "info" | "warn" | "error"](message, {
    ...toastOptions,
    className: `${toastOptions.className} ${variantClassName}`,
  });
};
