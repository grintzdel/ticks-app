import {useState, useEffect} from 'react'
import {sendMessage, getTicketPrompt, PromptResponse} from '@/actions/model/chat'
import {createJiraTicket} from '@/actions/model/ticket'
import {Platform} from '@/actions/model/types'

interface Message {
    role: "system" | "user" | "assistant"
    content: string
}

export function useModel(ticketId: string, platform: Platform = Platform.Jira) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [conversationHistory, setConversationHistory] = useState<Message[]>([])
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [isComplete, setIsComplete] = useState(false)
    const [promptData, setPromptData] = useState<PromptResponse | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoadingData(true);

                const fetchedPromptData = await getTicketPrompt(platform, ticketId);

                if (!fetchedPromptData) {
                    throw new Error("Les données du prompt n'ont pas pu être récupérées.");
                }

                setPromptData(fetchedPromptData);

                const welcomeMessage = {
                    role: 'assistant' as const,
                    content: `Bonjour et merci de prendre le temps de nous signaler ce problème. 🚀

Notre objectif est de résoudre votre bug le plus rapidement possible, et pour cela, nous avons besoin de quelques précisions. Pas d'inquiétude, notre assistant est là pour vous guider afin de transmettre les bonnes informations dès le départ.

En quelques questions, nous allons identifier le souci et s'assurer que l'équipe technique puisse agir efficacement, sans allers-retours inutiles.

🔍 Décrivez simplement le problème, et nous nous occupons du reste !`
                };

                setConversationHistory([welcomeMessage]);

            } catch {
                setError("Erreur lors du chargement des données du ticket");
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchData();
    }, [ticketId, platform]);

    const sendTicketQuestion = async (userInput: string) => {
        if (!promptData) {
            setError("Données du prompt non disponibles")
            return
        }

        try {
            setIsLoading(true)
            setError(null)

            setConversationHistory(prev => [
                ...prev,
                {
                    role: 'user',
                    content: userInput
                }
            ]);

            const response = await sendMessage(userInput, conversationHistory, promptData)

            if (!response) {
                throw new Error("Pas de réponse du modèle");
            }

            if (response.title && response.description && response.priority) {
                try {
                    await createJiraTicket(platform, ticketId, {
                        title: response.title,
                        description: response.description,
                        priority: response.priority
                    });

                    setIsComplete(true);

                    setConversationHistory(prev => [
                        ...prev,
                        {
                            role: 'assistant',
                            content: "Merci beaucoup pour votre retour ainsi que de votre temps ! 🎉\n\nVos informations ont bien été enregistrées et envoyées à l'administrateur.\nVous pouvez fermer cette page."
                        }
                    ]);
                } catch {
                    setConversationHistory(prev => [
                        ...prev,
                        {
                            role: 'assistant',
                            content: "Une erreur est survenue lors de la création du ticket. Veuillez réessayer."
                        }
                    ]);
                }
            } else if (response.message) {
                setConversationHistory(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: response.message || "Désolé, je n'ai pas compris votre demande."
                    }
                ]);
            } else {
                throw new Error("Format de réponse invalide");
            }
        } catch {
            setError('Erreur lors de la communication avec Mistral');
            setConversationHistory(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: "Désolé, une erreur est survenue lors de la communication avec l'assistant. Veuillez réessayer."
                }
            ]);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        sendTicketQuestion,
        isLoading,
        isLoadingData,
        error,
        conversationHistory,
        isComplete
    }
}