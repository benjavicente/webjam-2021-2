import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-200 w-full sticky top-0 flex justify-between flex-wrap items-center z-10 px-6 md:px-12">
        <h1 className="text-lg font-semibold py-4 font-inter cursor-pointer"><Link href='/'>Ensaying</Link></h1>
        <ul className="flex">
          <li className="pl-6 hover:underline cursor-pointer">
            <Link href='/'>Home</Link>
          </li>
          <li className="pl-6 hover:underline cursor-pointer">
            <Link href='/contacto'>Contacto</Link>
          </li>
        </ul>
      </nav>
    )
}
