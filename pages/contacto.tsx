import { useEffect, useRef, useState } from "react"


type FormInputProps = { name: string, children: string }

function TextFormInput({ name, children }: FormInputProps) {
    return (
        <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label htmlFor="fileName" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">{children}</label>
            </div>
            <div className="md:w-2/3">
                <input type="text" name={name} id={name} className="bg-gray-200 text-gray-700 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
            </div>
        </div>
    )
}

function FileFormInput({ children }: { children: string }) {
    const fileDropDown = useRef<HTMLLabelElement>(null)
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<null | string>(null)

    useEffect(() => {
        const element = fileDropDown.current
        const input = fileInput.current
        if (!element || !input) return
        element.ondragover = element.ondragenter = (event: Event) => {
            event.preventDefault()
        }
        element.ondrop = (event: DragEvent) => {
            event.preventDefault()
            if (event.dataTransfer?.files) {
                input.files = event.dataTransfer.files
                setFileName(input.files[0].name)
            }
        }
    })
    return (
        <label ref={fileDropDown} className="bg-gray-200 w-64 flex flex-col items-center px-4 py-6 rounded-md w-full tracking-wide cursor-pointer">
            <span className="mt-2 text-base leading-normal">{fileName ? fileName : children}</span>
            <input ref={fileInput} type='file' className="hidden" />
        </label>
    )
}

export default function ContactForm() {
    return (
        <form className="w-full max-w-sm">
            <TextFormInput name="fileName">Correo de Contacto</TextFormInput>
            <FileFormInput >Arrastra el archivo aquí</FileFormInput>
        </form>
    )
}