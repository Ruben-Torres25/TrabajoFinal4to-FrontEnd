import Carrousel from "../carrousel/carrousel";

// components/NavBar.tsx
export default function NavBar() {
    return (
        <>
            <div className="navbar bg-gray-800 justify-center">
                <div className="">
                    <a className="btn btn-ghost text-xl text-white">BursaBraz</a>
                </div>
                <div className="mx-auto h-[100px]">
                    <ul className="menu menu-horizontal bg-base-200 rounded-box">
                       
                        <li>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                                </svg>

                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-5">
                        <li>
                            <details>
                                <summary className="text-white">Idioma</summary>
                                <ul className="bg-gray-700 rounded-t-none p-2">
                                    <li><a className="text-white" href="#">Español</a></li>
                                    <li><a className="text-white" href="#">Portugues</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    );
} 