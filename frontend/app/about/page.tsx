import { AboutBreadcrumb } from "@/components/mains/breadcrumbs/AboutBreadcrumb";


export default function AboutPage() {
    return (
        <div className="mx-auto max-md:px-6 py-12">
            <AboutBreadcrumb />
            <h1 className="text-4xl font-bold text-center mb-6">Hey there! I'm Rodion 👋</h1>
            <p className="text-lg text-secondary-foreground text-center mb-8">
                Full-Stack Developer | Python, JavaScript | DevOps Enthusiast
            </p>
            <div className="space-y-6">
                <p>
                    Welcome to my little corner of the internet! I'm a <strong>Full-Stack Developer</strong> with a passion for
                    <span className="text-blue-600"> Python (Django, FastAPI) </span> and <span className="text-blue-600">JavaScript (React.js, Next.js)</span>.
                    I love building web applications that are fast, reliable, and user-friendly.
                </p>

                <p>
                    But my passion doesn’t stop at development—I’m also into <strong>DevOps</strong>, making sure everything runs smoothly with
                    <span className="text-blue-600"> Docker, Kubernetes, and CI/CD pipelines</span>.
                </p>

                <h2 className="text-2xl font-semibold mt-8">What I Love to Do 🚀</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Backend Wizardry:</strong> Crafting robust APIs with Django & FastAPI.</li>
                    <li><strong>Frontend Magic:</strong> Creating sleek UIs with React.js & Next.js.</li>
                    <li><strong>Deployment & DevOps:</strong> Making apps scalable with Docker & Kubernetes.</li>
                    <li><strong>Exploring AI & Data Science:</strong> Digging into AI-powered apps and data-driven projects.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8">My Tech Toolbox 🧰</h2>
                <p>
                    <strong>Languages:</strong> Python, JavaScript, TypeScript<br />
                    <strong>Backend:</strong> Django, FastAPI, Django REST Framework<br />
                    <strong>Frontend:</strong> React.js, Next.js, TailwindCSS<br />
                    <strong>Databases:</strong> PostgreSQL, SQLite<br />
                    <strong>DevOps & Cloud:</strong> Docker, Kubernetes, DigitalOcean<br />
                    <strong>AI & Data Science:</strong> Pandas, NumPy, TensorFlow (still learning!)
                </p>
            </div >

            <div className="text-center mt-10">
                <p className="text-lg font-semibold">Let’s Connect! 🤝</p>
                <p className="text-secondary-foreground">If you’re looking for a developer who loves building cool things, solving problems, and making the web a better place—hit me up!</p>
            </div>
        </div >
    );
}
