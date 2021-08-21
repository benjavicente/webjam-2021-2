import Link from "next/link";
// import Image from 'next/image'
import { majors } from "../lib/helpers"
import Card from "../components/Card";



export default function Index() {
  return (
    <div>

      <section className="flex justify-center text-center my-20 items-center px-4">
        <div>
          <h1 className="font-extrabold font-inter mb-4 text-5xl">
            Pasa tus ramos
          </h1>
          <p>Estudia con ejercicios de pruebas anteriores</p>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-6">

        <Card url="comun" name="Plan Común"/>

        {majors.map(Card)}

      </section>

    </div>
  )
}
