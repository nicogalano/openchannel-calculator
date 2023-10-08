import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 p-4">
            <div className="container mx-auto">
                <nav className="flex items-center justify-between">
                    <div className="text-white text-2xl font-bold">OPEN CHANNEL CALCULATOR</div>
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                className="text-white hover:text-blue-300 transition duration-300"
                                href="/inicio"
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white hover:text-blue-300 transition duration-300"
                                href="/acerca"
                            >
                                Acerca de
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white hover:text-blue-300 transition duration-300"
                                href="/contacto"
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
