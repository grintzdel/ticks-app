export interface LigneType {
    id: number;
    name: string;
    prompt: string;
    issueTypes: string;
    issueTypesId: number;
}

export interface Ligne {
    id?: number;
    issueTypesId: number;
    project_id: number;
    prompt: string;
}

export enum Platform {
    Jira = "jira"
}