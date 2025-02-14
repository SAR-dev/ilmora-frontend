import { createContext, useContext, useState, ReactNode } from "react";
import { api } from "helpers";
import toast from "react-hot-toast";
import { Dialog, DialogPanel } from "@headlessui/react";

interface ClassNoteContextType {
    openNoteModal: (id: string) => void;
}

const ClassNoteContext = createContext<ClassNoteContextType | undefined>(undefined);

export const ClassNoteProvider = ({ children }: { children: ReactNode }) => {
    const [classLogId, setClassLogId] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [note, setNote] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const closeNoteModal = () => {
        setNote("")
        setIsOpen(false)
        setIsEditing(false)
        setClassLogId("")
    }

    const openNoteModal = (id: string) => {
        setClassLogId(id)
        setIsOpen(true)
        setIsLoading(true)
        api
            .get(`/api/t/class-notes/${id}`)
            .then(res => setNote(res.data))
            .catch(() => toast.error("Failed to retrive class note"))
            .finally(() => setIsLoading(false))
    }

    const saveClassNote = () => {
        setIsLoading(true)
        api
            .post(`/api/t/class-notes/${classLogId}`, {
                classNote: note
            })
            .then(() => {
                toast.success("CLass note saved.")
                closeNoteModal()
            })
            .catch(() => toast.error("Class not save failed!"))
            .finally(() => setIsLoading(false))
    }

    return (
        <ClassNoteContext.Provider value={{ openNoteModal }}>
            {children}
            <Dialog open={isOpen} onClose={closeNoteModal} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-base-300/75">
                    <DialogPanel className="card max-w-lg space-y-4 border bg-base-100 border-base-300 p-8">
                        <label className="w-72 lg:w-96">
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-sm">Class Note</div>
                                {!isEditing && (
                                    <button 
                                        className="btn btn-xs btn-info" 
                                        onClick={() => setIsEditing(true)}
                                        disabled={isLoading}
                                    >
                                        Edit Note
                                    </button>
                                )}
                            </div>
                            <textarea
                                className="textarea textarea-bordered min-h-32 w-full"
                                value={note}
                                disabled={!isEditing}
                                onChange={e => setNote(e.target.value)}
                            />
                        </label>
                        <div className="flex gap-5">
                            <button
                                className="btn w-20"
                                onClick={closeNoteModal}
                                disabled={isLoading}
                            >
                                Back
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={saveClassNote}
                                disabled={isLoading}
                            >
                                Save
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </ClassNoteContext.Provider>
    );
};

// Custom hook to access PocketContext
export const useClassNote = () => {
    const context = useContext(ClassNoteContext);
    if (!context) {
        throw new Error("usePocket must be used within a PocketProvider.");
    }
    return context;
};
