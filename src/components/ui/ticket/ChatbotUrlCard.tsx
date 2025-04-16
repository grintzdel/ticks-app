import {Card} from "@/components/ui/card/card";
import CopyPaste from "@/components/SVG/icons/CopyPaste";
import {useState, useCallback, useRef} from "react";
import {encrypt} from "@/utils/model/aes";
import {toast} from "sonner";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip/tooltip";

interface ChatbotUrlCardProps {
    ticketId: string;
}

export function ChatbotUrlCard({ticketId}: ChatbotUrlCardProps) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleCopy = useCallback(async () => {
        if (ticketId === "exemple") {
            toast.error("Modèle Ticks : copie impossible");
            return;
        }

        try {
            const encryptedId = encrypt(ticketId);
            const chatbotUrl = `${window.location.origin}/chatbot/${encryptedId}`;
            await navigator.clipboard.writeText(chatbotUrl);

            setTimeout(() => setCopied(true), 0);
            toast.success("Lien copié avec succès !");

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (error) {
            console.error("Erreur lors de la copie:", error);
            toast.error("Erreur lors de la copie du lien");
        }
    }, [ticketId]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card
                        className="p-7 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={handleCopy}>
                        <div className="flex items-center gap-5">
                            <span className="text-2xl font-medium">Url Chatbot</span>
                            <CopyPaste/>
                        </div>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Cliquer pour copier le lien du Chatbot</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
} 