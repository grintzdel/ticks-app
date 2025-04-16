import {LigneType} from "@/actions/model/types";
import {Card, CardContent, CardHeader} from "@/components/ui/card/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/forms/common/select";
import {Input} from "@/components/ui/sidebar/input";
import AddToBin from "@/components/SVG/icons/AddToBin";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip/tooltip";
import {Skeleton} from "@/components/ui/skeleton/skeleton";

interface TicketFormCardProps {
    ligneTypes: LigneType[];
    value: {
        typeId: number;
        prompt: string;
    };
    onChange: (value: { typeId: number; prompt: string }) => void;
    onDelete?: () => void;
    showDeleteButton?: boolean;
    isLoading?: boolean;
}

function SkeletonTicketFormCard() {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-32"/>
                    <Skeleton className="h-[42px] w-[200px]"/>
                </div>
                <Skeleton className="h-6 w-6"/>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-2">
                    <Skeleton className="h-[17px] w-40"/>
                    <Skeleton className="h-[50px] w-full"/>
                </div>
            </CardContent>
        </Card>
    );
}

export function TicketFormCard({
                                   ligneTypes,
                                   value,
                                   onChange,
                                   onDelete,
                                   showDeleteButton,
                                   isLoading = false,
                               }: TicketFormCardProps) {

    if (isLoading) {
        return <SkeletonTicketFormCard/>;
    }

    return (
        <Card className="overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-start">
                <div className="space-y-2">
                    <label className="block text-[17px] text-[#0C1421]">
                        Sélection du type
                    </label>
                    <Select
                        value={value.typeId.toString()}
                        onValueChange={(newValue) => {
                            console.log("Nouvelle valeur sélectionnée:", newValue);
                            onChange({...value, typeId: parseInt(newValue)});
                        }}
                    >
                        <SelectTrigger className="w-[200px] p-4">
                            <SelectValue placeholder="Sélectionner un type"/>
                        </SelectTrigger>
                        <SelectContent>
                            {ligneTypes.map((type) => {
                                console.log("Rendu du type:", type);
                                return (
                                    <SelectItem key={type.id} value={type.id.toString()}>
                                        {type.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
                {showDeleteButton && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={onDelete}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <AddToBin/>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cliquer pour supprimer ce champs</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-2">
                    <label className="block text-[17px] text-[#0C1421]">
                        Données attendues
                    </label>
                    <Input
                        value={value.prompt}
                        onChange={(e) => onChange({...value, prompt: e.target.value})}
                        placeholder="Entrez votre prompt..."
                        className="w-full px-4 py-[25px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
