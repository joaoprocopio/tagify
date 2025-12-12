import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/lib/ui/components/empty"
import { Sparkle } from "lucide-react"

export default function NotFound() {
    return (
        <>
            <div className="h-layout-header border-b" />

            <div className="container mx-auto py-24">
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia
                            variant="icon"
                            className="text-accent-foreground">
                            <Sparkle />
                        </EmptyMedia>

                        <EmptyTitle>Not found</EmptyTitle>
                        <EmptyDescription>
                            We could not find the page that you were looking
                            for.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        </>
    )
}
