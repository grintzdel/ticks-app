import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card/card";
import {cn} from "@/lib/utils";
import {steps} from "@/utils/project/steps";

export function TicketSteps() {
    return (
        <div className="flex gap-4 flex-1">
            {steps.map((step) => (
                <Card
                    key={step.number}
                    className={cn(
                        "flex-1 relative",
                        step.active ? "border-blue-500" : "opacity-50"
                    )}
                >
                    <CardHeader>
                        <div className="flex items-center justify-center gap-2">
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                                    step.active ? "bg-blue-500 text-white" : "bg-gray-200"
                                )}
                            >
                                {step.number}
                            </div>
                            <CardTitle>{step.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{step.description}</CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 