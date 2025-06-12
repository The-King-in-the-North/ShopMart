import { UserIcon, ShoppingBagIcon } from "@/public/icons";

function Header({ setView }) {
    return (
        <header className="bg-white shadow-md sticky top-0 z-20">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <button onClick={() => setView({ page: 'home' })} className="text-2xl font-bold text-gray-800 tracking-tight">
                            Shop<span className="text-indigo-600">Mart</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 hover:text-gray-700">
                            <UserIcon />
                        </button>
                        <button className="text-gray-500 hover:text-gray-700">
                            <ShoppingBagIcon />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;