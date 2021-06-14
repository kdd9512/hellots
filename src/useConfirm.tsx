export const useConfirm = (msg: string, onConfirm: any, onCancel: any) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(msg)) {
            onConfirm();
        } else {
            onCancel();
        }
    };
    return confirmAction;
};