export default function Page({ params }: { params: Promise<{ slug: string }> }) {

    return (
        <main>
            <h1 className="text-4xl font-bold mt-20">Objective</h1>
            <p className="mt-4">
                Imagine you’re building a secure gateway for an application using Django and Django REST Framework. Your mission is to create a REST API that handles user authentication and authorization. Here’s what it will do:
            </p>
            <p className="mt-4">
                It will warmly welcome new users by allowing them to register. Once they’re part of the system, they can log in with ease. For added security, users will have the ability to refresh their tokens to stay authenticated.
            </p>
            <p className="mt-4">
                If a user decides to take a break, they can log out anytime. The system will also let users view and update their personal details whenever they need to, making the experience seamless and user-friendly.
            </p>
            <p className="mt-4">
                The complete code can be downloaded from my <a href="https://github.com/AtamanKit/school-django-auth" target="_blank" className="underline text-blue-400">GitHub</a> repository.
            </p>




            <h1 className="text-4xl font-bold mt-20">Let's See the API in Action</h1>
            <p>and then we'll look at how to build it.</p>

            <p className="mt-8 text-2xl">
                <strong>User Registration</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X POST http://localhost:8000/api/register/ \\
    -d '{"email": "first@example.com", "password": "securepassword"}' \\
    -H "Content-Type: application/json"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`{"id": 1, "email": "first@example.com"}`}
                    </code>
                </pre>
            </p>

            <p className="mt-12 text-2xl">
                <strong>Authentication (Login)</strong>
            </p>
            <p>
                Obtain Access and Refresh tokens:
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X POST http://localhost:8000/api/login/ \\
    -d '{"email": "first@example.com", "password": "securepassword"}' \\
    -H "Content-Type: application/json"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded overflow-x-auto">
                    <code className="language-bash">
                        {`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE1NTF9.qZ8vlF65ovei8hk0mqqshjlIsEzFApZZWTIAdAUib4g",
    "refresh_token": "c9c1a1fd-f886-404a-862b-2c123b0ec1a5"
}`}
                    </code>
                </pre>
            </p>


            <p className="mt-12 text-2xl">
                <strong>Access Token Refresh</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X POST http://localhost:8000/api/refresh/ \\
    -d '{"refresh_token": "c9c1a1fd-f886-404a-862b-2c123b0ec1a5"}' \\
    -H "Content-Type: application/json"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded overflow-x-auto">
                    <code className="language-bash">
                        {`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3Mzc2NzE3MjR9.2PtaZVq5ioGNyQoPDU6U2ED-sgALWJZAq1Kw9-UL8no",
    "refresh_token": "2f37b70f-18dd-471c-9ef7-8065cb2f4634"
}`}
                    </code>
                </pre>
            </p>


            <p className="mt-12 text-2xl">
                <strong>Logout (Invalidate Refresh Token)</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X POST http://localhost:8000/api/logout/ \\
    -d '{"refresh_token": "2f37b70f-18dd-471c-9ef7-8065cb2f4634"}' \\
    -H "Content-Type: application/json"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`{"success": "User logged out."}`}
                    </code>
                </pre>
            </p>


            <p className="mt-12 text-2xl">
                <strong>Retrieve Personal Info</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X GET http://localhost:8000/api/me/ \\
    -H "Authorization: Bearer <ACCESS_TOKEN>"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`{"id": 1, "username": "", "email": "first@example.com"}`}
                    </code>
                </pre>
            </p>


            <p className="mt-12 text-2xl">
                <strong>Update Personal Info</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`curl -X PUT http://localhost:8000/api/me/ \\
    -d '{"email": "first@example.com", "username": "John Doe"}' \\
    -H "Authorization: Bearer <ACCESS_TOKEN>" \\
    -H "Content-Type: application/json"`}
                    </code>
                </pre>
            </p>
            <p className="mt-4">
                <strong>Response:</strong>
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        {`{"id": 1, "username": "John Doe", "email": "first@example.com"}`}
                    </code>
                </pre>
            </p>





            <h1 className="text-4xl font-bold mt-20">Prerequisites</h1>
            <ul className="list-disc list-inside mt-4">
                <li>Ubuntu (or WSL for Windows users)</li>
                <li>Python 3.x</li>
                <li>Django</li>
                <li>Django REST Framework</li>
                <li>PyJWT</li>
                <li>Constance — Dynamic Django settings</li>
                <li>Redis</li>
            </ul>
            <p className="mt-12">
                To install the dependencies and tools for this project, we will use the <a href="https://docs.astral.sh/uv/" target="_blank" className="underline text-blue-400">uv package manager</a>. First, we will initialize a new project then to add all the necessary dependencies.
            </p>
            <p className="mt-4">
                <pre className="dark:bg-gray-800 text-white p-8 rounded">
                    <code className="language-bash">
                        uv init<br />
                        uv add django djangorestframework pyjwt django-constance redis<br />
                    </code>
                </pre>
            </p>
        </main>
    );
}
