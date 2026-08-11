import { useToastNotification } from "../../hooks/useToastNotification";

export const TestPage: React.FC = () => {
    const { notify } = useToastNotification();

    return (
        <>
            <button className="btn btn-outline" onClick={() => notify("success", "This is a test notification!")}>
                Show Notification
            </button>
        </>
    );
}