import {LigneType} from "@/actions/model/types";
import {TicketFormCard} from "@/components/ui/forms/ticket/TicketFormCard";
import {AddLineButton} from "@/components/ui/ticket/AddLineButton";
import {useState, useCallback, useEffect, useRef} from "react";
import { Platform } from "@/actions/model/types";
import {toast} from "sonner";
import {saveTicketLignes} from "@/actions/model/ticket";

interface TicketFormProps {
    ticketId: string;
    ligneTypes: LigneType[];
    initialFormValues?: Array<{ typeId: number; prompt: string; }>;
    isLoading: boolean;
}

interface FormValue {
    typeId: number;
    prompt: string;
}

export function TicketForm({ticketId, ligneTypes, initialFormValues = [], isLoading}: TicketFormProps) {
    const [formValues, setFormValues] = useState<FormValue[]>([]);
    const isModelTicks = ticketId === "exemple";
    const initialized = useRef(false);

    useEffect(() => {
        if (!isLoading && !initialized.current) {
            if (isModelTicks && ligneTypes.length > 0) {
                const defaultValues = ligneTypes.length >= 2 ? [
                    { typeId: ligneTypes[0].id, prompt: "Description du problème rencontré en 1 phrase..." },
                    { typeId: ligneTypes[1].id, prompt: "Demande le navigateur utilisé par l'utilisateur..." }
                ] : ligneTypes.length === 1 ? [
                    { typeId: ligneTypes[0].id, prompt: "Description du problème rencontré en 1 phrase..." },
                    { typeId: -1, prompt: "Demande le navigateur utilisé par l'utilisateur..." }
                ] : [];

                setFormValues(defaultValues);
            } else if (!isModelTicks) {
                setFormValues(initialFormValues);
            }
            initialized.current = true;
        }
    }, [isLoading, ligneTypes, isModelTicks, initialFormValues]);

    const showModelTicksError = useCallback(() => {
        setTimeout(() => toast.error("Modèle Ticks : enregistrement impossible"), 0);
    }, []);

    const showValidationError = useCallback(() => {
        setTimeout(() => toast.error("Aucun formulaire valide n'a été enregistré"), 0);
    }, []);

    const showSuccess = useCallback(() => {
        setTimeout(() => toast.success("Le formulaire a bien été enregistré"), 0);
    }, []);

    const handleSubmit = useCallback(async () => {
        if (isModelTicks) {
            showModelTicksError();
            return;
        }

        try {
            const validLines = formValues.filter(value =>
                value.typeId !== -1 &&
                value.prompt.trim() !== ""
            );

            if (validLines.length === 0) {
                showValidationError();
                return;
            }

            const validatedLignes = validLines.map(value => ({
                issueTypesId: value.typeId,
                project_id: parseInt(ticketId),
                prompt: value.prompt.trim(),
            }));

            await saveTicketLignes(parseInt(ticketId), validatedLignes, Platform.Jira);
            showSuccess();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde:", error);
            if (error instanceof Error) {
                setTimeout(() => toast.error(error.message), 0);
            } else {
                setTimeout(() => toast.error("Une erreur est survenue lors de l'enregistrement du formulaire"), 0);
            }
        }
    }, [formValues, isModelTicks, ticketId, showModelTicksError, showValidationError, showSuccess]);

    if (isLoading) {
        const skeletonCount = isModelTicks ? 2 : 1;
        return (
            <div className="space-y-6">
                {[...Array(skeletonCount)].map((_, index) => (
                    <TicketFormCard
                        key={index}
                        ligneTypes={[]}
                        value={{ typeId: -1, prompt: "" }}
                        onChange={() => {}}
                        isLoading={true}
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {formValues.map((value, index) => (
                <TicketFormCard
                    key={index}
                    ligneTypes={ligneTypes}
                    value={value}
                    onChange={(newValue) =>
                        setFormValues((prev) => {
                            const newValues = [...prev];
                            newValues[index] = newValue;
                            return newValues;
                        })
                    }
                    onDelete={() =>
                        setFormValues((prev) => prev.filter((_, i) => i !== index))
                    }
                    showDeleteButton={true}
                    isLoading={isLoading}
                />
            ))}

            <AddLineButton
                onClick={() =>
                    setFormValues((prev) => [...prev, {typeId: -1, prompt: ""}])
                }
            />

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                >
                    Enregistrer le formulaire
                </button>
            </div>
        </div>
    );
} 