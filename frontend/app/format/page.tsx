export default function Page({ params }: { params: Promise<{ slug: string }> }) {

    return (
        <main className="py-8">
            <h1 className="text-3xl font-bold">Format</h1>
            <p className="mt-4">
                This is the format page. You can use this page to format your data.
                This is a placeholder page.
            </p>
            <p className="mt-4">
                This is the format page. You can use this page to format your data.
                This is a placeholder page.
            </p>
            <p className="mt-4">
                This is the format page. You can use this page to format your data.
                This is a placeholder page.
            </p>
        </main>
    );
}
