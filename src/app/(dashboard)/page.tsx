"use client";

import {LigneType} from "@/actions/model/types";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {ChatbotUrlCard} from "@/components/ui/ticket/ChatbotUrlCard";
import {TicketSteps} from "@/components/ui/ticket/TicketSteps";
import {getTicketLigneTypes} from "@/actions/model/ticket";
import {TicketForm} from "@/components/ui/ticket/TicketForm";
import {Toaster} from "@/components/ui/sonner/sonner";

export default function ModelTicketPage() {
    const [ligneTypes, setLigneTypes] = useState<LigneType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const types = await getTicketLigneTypes();
                setLigneTypes(types);
            } catch (error) {
                console.error("Erreur lors du chargement des types:", error);
                toast.error("Erreur lors du chargement des options du formulaire");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            <Toaster/>
            <div className="sticky top-0 bg-white border-b z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-semibold">Modèle Ticks</h1>
                    </div>

                    <div className="flex gap-6 items-start">
                        <ChatbotUrlCard ticketId="exemple"/>
                        <TicketSteps/>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <TicketForm
                    ticketId="exemple"
                    ligneTypes={ligneTypes}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}