'use client'

import {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Loader2} from "lucide-react"
import {toast} from "sonner"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/forms/common/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/forms/common/select"
import {Button} from "@/components/ui/forms/common/button"
import {createProjectSchema, type CreateProjectData} from "@/schemas/projects/create-project.schema"
import {Platform, PlatformProject} from "@/actions/projects/types";
import {DialogDescription} from "@radix-ui/react-dialog";
import {createProject} from "@/actions/projects/projects"

interface CreateProjectDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    platforms: Platform[]
    onSuccess?: () => void
}

export function CreateProjectDialog({open, onOpenChange, platforms, onSuccess}: CreateProjectDialogProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<CreateProjectData>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            type: "",
            title: "",
            info: {
                account: 0,
                id: 0,
                issues: 0
            }
        }
    })

    const currentPlatform = platforms.find(p => p.type === form.watch("type"))
    const currentProjects = currentPlatform?.projects || []
    const currentIssueTypes = currentProjects.find(
        (p: PlatformProject) => p.projectId === form.watch("info.id")
    )?.issuesType || []

    const onSubmit = async (data: CreateProjectData) => {
        setIsLoading(true)
        try {
            const formattedData = {
                type: currentPlatform?.type.toLowerCase() || "",
                title: currentProjects.find(p => p.projectId === form.watch("info.id"))?.name || "",
                info: {
                    account: currentPlatform?.id || 0,
                    id: form.watch("info.id"),
                    issues: form.watch("info.issues")
                }
            }

            const result = await createProject(formattedData)

            if (result.success) {
                setTimeout(() => toast.success("Projet ajouté avec succès"), 0)
                onSuccess?.()
                onOpenChange(false)
                form.reset()
            } else {
                const errorMessage = result.error === "Project already exists"
                    ? "Ce projet existe déjà dans votre compte"
                    : result.error || "Erreur lors de la création du projet"

                setTimeout(() => toast.error("Erreur", {
                    description: errorMessage
                }), 0)
            }
        } catch (error) {
            setTimeout(() => toast.error("Erreur lors de la création du projet"), 0)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle>Lier un projet</DialogTitle>
                    <DialogDescription className="sr-only">
                        Sélectionnez une plateforme et un projet à lier à votre compte.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Plateforme</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.setValue("info.id", 0)
                                            form.setValue("info.issues", 0)
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner une plateforme"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {platforms.map((platform) => (
                                                <SelectItem
                                                    key={platform.id}
                                                    value={platform.type}
                                                >
                                                    {platform.type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="info.id"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Projet</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(Number(value))
                                            form.setValue("title", currentProjects.find(p => p.projectId === Number(value))?.name || "")
                                        }}
                                        value={field.value?.toString() || ""}
                                        disabled={!form.watch("type")}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un projet"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {currentProjects.map((project) => (
                                                <SelectItem
                                                    key={project.projectId}
                                                    value={project.projectId.toString()}
                                                >
                                                    {project.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="info.issues"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Type de ticket</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value?.toString() || ""}
                                        disabled={!form.watch("info.id")}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un type de ticket"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {currentIssueTypes.map((type) => (
                                                <SelectItem
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Création...
                                </>
                            ) : (
                                'Lier le projet'
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}