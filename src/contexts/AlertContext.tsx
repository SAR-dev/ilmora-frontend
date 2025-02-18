import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { AiFillAlert } from "react-icons/ai";

interface AlertContextType {
    openAlert: (onConfirm: () => void) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => () => {});

    const closeAlert = () => {
        setIsOpen(false);
    };

    const openAlert = (onConfirm: () => void) => {
        setConfirmAction(() => onConfirm);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        setIsOpen(false);
        confirmAction();
    };

    return (
        <AlertContext.Provider value={{ openAlert }}>
            {children}
            <Dialog open={isOpen} onClose={closeAlert} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                        <div className="flex flex-col justify-center items-center gap-5">
                            <AiFillAlert className="size-20 text-warning" />
                            <div className="text-center">
                                Are you sure you want to continue?
                                <br />
                                Please make sure before proceeding!
                            </div>
                            <div className="flex gap-5">
                                <button className="btn" onClick={closeAlert}>
                                    Go Back
                                </button>
                                <button className="btn btn-primary flex-1" onClick={handleConfirm}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </AlertContext.Provider>
    );
};

// Custom hook to access AlertContext
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within a AlertProvider.");
    }
    return context;
};
