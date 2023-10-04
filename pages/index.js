import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
// import { PrismaClient } from '@prisma/client' //hay que importarlo; siempre que se quiere interactuar con la BD

export default function Home() {
  const {categoriaActual} = useQuiosco()

  // console.log(categorias) // Información de BD desde el lado del servidor

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1> {/* ? porque al principio categoriaActual es un objeto vacío y evitar que te genere error por la falta de nombre */}

      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>

      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}

