import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

const Categoria = ({categoria}) => {
    const {nombre, icono, id} = categoria

    const {categoriaActual, handleClickCategoria} = useQuiosco()
  return (
    <div className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center hover:bg-amber-400 p-1`}>
        <Image className="mr-5" src={`/assets/img/icono_${icono}.svg`} width={70} height={70} alt="imagen icono"/>

        <button type="button" className={`text-2xl font-bold hover:cursor-pointer w-full text-left`}
            onClick={() => handleClickCategoria(id)}
        >
            {nombre}
        </button>
    </div>
  )
}

export default Categoria
