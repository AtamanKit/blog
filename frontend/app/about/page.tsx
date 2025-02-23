import { BreadcrumbTemplate } from "@/components/mains/Breadcrumb";
import Image from "next/image";


export default function AboutPage() {
    return (
        <div className="mx-auto max-md:px-6 py-12">
            <BreadcrumbTemplate param="About Me" />
            <h1 className="text-4xl font-bold text-center mb-6">Hey there! My name is Rodion Atamaniuc 👋</h1>
            <p className="text-lg text-center mb-8">
                Full-Stack Developer | Python, JavaScript | DevOps Enthusiast
            </p>
            <div className="space-y-6 flex flex-wrap md:flex-nowrap items-start">
                <Image 
                    src="/images/jpg/about.jpg"
                    alt="Rodion Atamaniuc"
                    width={330}
                    height={330}
                    className="rounded-lg md:mr-10 mb-4 mb-0 float-left"
                />
                <div>
                    <p className="text-secondary-foreground">
                        Welcome to my little corner of the internet! I'm a <strong>Full-Stack Developer</strong> with a passion for
                        <span className="text-blue-600"> Python (Django, FastAPI) </span> and <span className="text-blue-600">JavaScript (React.js, Next.js)</span>.
                        I love building web applications that are fast, reliable, and user-friendly.
                    </p>

                    <p className="text-secondary-foreground">
                        But my passion doesn’t stop at development—I’m also into <strong>DevOps</strong>, making sure everything runs smoothly with
                        <span className="text-blue-600"> Docker, Docker Compose and Kubernetes</span>.
                    </p>
                    <h2 className="text-2xl font-semibold mt-8">What I Love to Do 🚀</h2>
                <ul className="list-disc list-inside space-y-2 text-secondary-foreground">
                    <li><strong>Backend Wizardry:</strong> Crafting robust APIs with Django & FastAPI.</li>
                    <li><strong>Frontend Magic:</strong> Creating sleek UIs with React.js & Next.js.</li>
                    <li><strong>Deployment & DevOps:</strong> Making apps scalable with Docker & Kubernetes.</li>
                    <li><strong>Exploring AI & Data Science:</strong> Digging into AI-powered apps and data-driven projects.</li>
                </ul>
                </div>
            </div >
            
                

                <h2 className="text-2xl font-semibold mt-8">My Tech Toolbox 🧰</h2>
                <p className="text-secondary-foreground">
                    <strong>Languages:</strong> Python, JavaScript, TypeScript<br />
                    <strong>Backend:</strong> Django, FastAPI, Django REST Framework<br />
                    <strong>Frontend:</strong> React.js, Next.js, TailwindCSS<br />
                    <strong>Databases:</strong> PostgreSQL, SQLite<br />
                    <strong>DevOps & Cloud:</strong> Docker, Kubernetes, DigitalOcean<br />
                    <strong>AI & Data Science:</strong> Pandas, NumPy, TensorFlow (still learning!)
                </p>

            <div className="text-center mt-10">
                <p className="text-lg font-semibold">Let’s Connect! 🤝</p>
                <p className="text-secondary-foreground">If you’re looking for a developer who loves building cool things, solving problems, and making the web a better place—hit me up!</p>
            </div>
        </div >
    );
}
