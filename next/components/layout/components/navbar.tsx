export function NavBar() {
    return <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
    <div
        className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
    >
        <div className="flex justify-center flex-1 lg:mr-32">
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
        <li className="relative">
            <button
            className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
            aria-label="Account"
            aria-haspopup="true"
            >
            <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
                alt=""
                aria-hidden="true"
            />
            </button>
        </li>
        </ul>
    </div>
</header>;
}