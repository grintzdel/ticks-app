"use server";

import {Ligne, LigneType, Platform} from "@/actions/model/types";
import {cookies} from "next/headers";
import {createTicketSchema} from "@/schemas/tickets/create-ticket.schema";

export async function getTicketLigneTypes(): Promise<LigneType[]> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            throw new Error("Session expirée");
        }

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/get/lignes/types`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            await response.json();
            throw new Error("Erreur lors de la récupération des types de lignes");
        }

        const responseData = await response.json();
        const data = responseData.data;

        if (Array.isArray(data)) {
            const transformedData = data.map((item) => ({
                id: item.id || 0,
                name: item.name || "Sans nom",
                prompt: item.prompt || "",
                issueTypes: item.name || "",
                issueTypesId: item.id || 0
            }));

            return transformedData;
        }

        return [];
    } catch (error) {
        throw error;
    }
}

export async function getTicketLignes(
    projectId: string,
    platform: Platform
): Promise<LigneType[]> {
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/projects/${platform}/${projectId}/get/lignes`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur API:", errorData);
            throw new Error("Erreur lors de la récupération des lignes du ticket");
        }

        const data = await response.json();
        console.log("Données brutes reçues de l'API des lignes:", data);

        if (!Array.isArray(data)) {
            console.error("Les données reçues ne sont pas un tableau:", data);
            return [];
        }

        const transformedData = data.map(item => ({
            id: item.id || 0,
            name: item.issueTypes || "Sans titre",
            prompt: item.prompt || "",
            issueTypes: item.issueTypes || "",
            issueTypesId: item.issueTypesId || 0
        }));

        console.log("Lignes transformées:", transformedData);
        return transformedData;
    } catch (error) {
        console.error("Erreur complète:", error);
        throw error;
    }
}

export async function saveTicketLignes(
    projectId: number,
    idLignes: Omit<Ligne, "id">[],
    platform: Platform
): Promise<void> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");

        if (!token) {
            throw new Error("Session expirée");
        }

        idLignes.forEach((ligne, index) => {
            const validationResult = createTicketSchema.safeParse({
                id_type_champs: ligne.issueTypesId,
                prompt: ligne.prompt
            });

            if (!validationResult.success) {
                throw new Error(`La ligne ${index + 1} est invalide : ${validationResult.error.message}`);
            }

            if (!ligne.prompt.trim()) {
                throw new Error(`La ligne ${index + 1} ne peut pas être vide`);
            }
        });

        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/user/projects/${platform}/${projectId}/set/lignes`;

        const formattedLignes = idLignes.map(ligne => ({
            id_type_champs: ligne.issueTypesId,
            prompt: ligne.prompt.trim()
        }));

        const body = JSON.stringify({
            ligne: formattedLignes
        });

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
            },
            body,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Erreur lors de la sauvegarde des lignes");
        }

        await response.json();
    } catch (error) {
        throw error;
    }
}

export async function createJiraTicket(
    platform: Platform,
    ticketId: string,
    data: {
        title: string;
        description: string;
        priority: string;
    }
): Promise<void> {
    try {
        console.log("Création du ticket avec les données:", {platform, ticketId, data});
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/chat/create/${platform}/${ticketId}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erreur lors de la création du ticket:", errorData);
            throw new Error(errorData.message || "Erreur lors de la création du ticket");
        }

        const responseData = await response.json();
        console.log("Ticket créé avec succès:", responseData);
    } catch (error) {
        console.error("Erreur complète lors de la création du ticket:", error);
        throw error;
    }
}