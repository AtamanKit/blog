export function Burger() {
    return (
        <div className="flex flex-col space-y-1">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="w-5 h-0.5 bg-foreground"></div>
            ))}
        </div>
    )
}