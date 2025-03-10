import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonPost() {
    return (
        <div className="flex flex-col space-y-10">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-[500px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
            </div>
        </div>
    )
}
