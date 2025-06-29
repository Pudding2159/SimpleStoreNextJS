import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBasketShopping,
    faSignOutAlt,
    faBars,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div>
            <div className="md:hidden">
                <header className="bg-white border-b border-gray-300 z-50 fixed top-0 inset-x-0">
                    <div className="flex items-center justify-between p-4">
                        <Link href="/">
                            <img
                                src="./image/logo-test.png"
                                alt="Logo1"
                                className="h-10 w-auto cursor-pointer"
                            />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(open => !open)}
                            className="text-gray-800 hover:text-gray-600 text-2xl"
                            aria-label="Toggle menu"
                        >
                            <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
                        </button>
                    </div>
                </header>

                <div
                    className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                <aside
                    className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 pt-16 shadow-lg ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <div className="px-4 space-y-6">
                        <nav>
                            <ul className="flex flex-col gap-y-4 uppercase font-bold text-lg">
                                <li>
                                    <Link href="#" className="block text-gray-800 hover:text-[#5E60CE]">
                                        Electronics & Gadgets
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="block text-gray-800 hover:text-[#5E60CE]">
                                        Home & Kitchen
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="block text-gray-800 hover:text-[#5E60CE]">
                                        Fashion & Apparel
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="block text-gray-800 hover:text-[#5E60CE]">
                                        Health & Beauty
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center gap-4 border-t pt-4">
                            {user && (
                                <span className="text-lg font-medium text-[#5E60CE]">
                                    {user.firstName}
                                </span>
                            )}
                            <button className="p-2 rounded hover:bg-gray-100">
                                <FontAwesomeIcon icon={faUser} className="text-2xl text-[#5E60CE]" />
                            </button>
                            <button className="p-2 rounded hover:bg-gray-100">
                                <FontAwesomeIcon icon={faBasketShopping} className="text-2xl" />
                            </button>
                            {user && (
                                <button onClick={handleLogout} className="p-2 rounded hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
            </div>

            <div className="hidden md:block z-50 top-0 inset-x-0 border-b ">
                <header className="pt-5 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white">
                    <nav className="relative max-w-[95rem] w-full mx-auto md:flex md:items-center md:justify-between md:gap-3 py-2 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center gap-x-1">
                            <Link href="/">
                                <img
                                    src="../image/logo-test.png"
                                    alt="Logo2"
                                    className="cursor-pointer h-16 w-auto"
                                />
                            </Link>
                        </div>

                        <div
                            id="hs-header-base"
                            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
                        >
                            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1">
                                    <div className="grow flex justify-end items-center gap-2">
                                        <div className='border-[#333333] hover:bg-gray-700 bg-[#5E60CE] text-white rounded-xl flex flex-row justify-center items-center gap-3 p-1 px-4'>
                                            {user && (

                                                <span className="text-lg font-light text-[#ffffff]">
                                                    {user.firstName}
                                                </span>
                                            )}
                                            <button
                                                onClick={() => setIsMenuOpen(o => !o)}
                                                className="p-2 px-2 flex flex-row justify-center items-center gap-2 "
                                            >
                                                <FontAwesomeIcon icon={faUser} className="text-xl text-[#ffffff]" />
                                            </button>
                                        </div>
                                        <button className="p-2 px-2.5 rounded-xl hover:bg-gray-700 bg-[#5E60CE] text-white border border-gray-300">
                                            <span className="text-lg font-light p-2 py-0">Сart</span>
                                            <FontAwesomeIcon
                                                icon={faBasketShopping}
                                                className="text-xl px-1"
                                            />
                                        </button>
                                        {user && (
                                            <button
                                                onClick={handleLogout}
                                                className="p-2 px-2.5 rounded-xl hover:bg-gray-700 bg-[#5E60CE] text-white border border-gray-300">
                                                <span className="text-lg font-light p-2 py-0">Log out</span>
                                                <FontAwesomeIcon icon={faSignOutAlt} className="text-xl px-1" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <nav className="bg-white">
                    <div className="max-w-[95rem] w-full mx-auto sm:flex sm:flex-row sm:justify-between sm:items-center sm:gap-x-3 py-3 px-4 sm:px-6 lg:px-8">
                        <div
                            id="hs-nav-secondary"
                            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
                        >
                            <div className="py-2 sm:py-0 flex flex-col sm:flex-row sm:justify-start gap-y-2 sm:gap-y-0 sm:gap-x-6 text-lg uppercase font-bold">
                                <a className="text-gray-800 hover:text-[#1D1AEA]" href="#">Electronics & Gadgets</a>
                                <a className="text-gray-800 hover:text-[#1D1AEA]" href="#">Home &amp; Kitchen</a>
                                <a className="text-gray-800 hover:text-[#1D1AEA]" href="#">Fashion & Apparel</a>
                                <a className="text-gray-800 hover:text-[#1D1AEA]" href="#">Health & Beauty</a>
                            </div>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};
