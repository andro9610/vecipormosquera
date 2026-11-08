type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div className="rounded-2xl bg-base-100/50 p-8 text-center text-sm text-error shadow-lg shadow-base-300/20">
    {message}
  </div>
);
