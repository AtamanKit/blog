import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { LogStyleMenu } from "@/components/elements/menus/logstyle/LogStyleMenu"


export function BreadcrumbTemplate({ param }: { param: string }) {
    return (
        <main className="flex w-full justify-between mb-8">
            <Breadcrumb className="flex items-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{param}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <LogStyleMenu />
        </main>
    )
}
