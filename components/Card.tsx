import Link from "next/link";

export default function Card({url, name}: {url: string, name: string}) {
    return (
        <Link href='/plan-comun'>
        <div className="relative rounded-xl inline-flex flex-col shadow-md cursor-pointer">

          <picture >
            <img src={`./images/${url}.jpg`} alt="plan comun" className="h-52 w-full object-cover rounded-xl" />
          </picture>
          <div className="h-52 absolute bg-gradient-to-t via-transparent w-full from-black rounded-xl"></div>

          <div className="px-5 py-3 absolute bottom-0 w-full text-gray-50">
              <h3 className="text-center font-inter font-bold text-xl">
                  <h3>{name}</h3>
              </h3>
          </div>

        </div>
      </Link>
    )
}


