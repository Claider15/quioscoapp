import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([]) // como puede agregar múltiples elementos, inicia como arreglo vacío
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const router = useRouter()
    
    const obtenerCategorias = async () => {
        try {
            const {data} = await axios('/api/categorias') // esta API pertenece al mismo dominio (localhost:3000) por lo que la url solo es '/api/categorias
            setCategorias(data.categorias)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]) 

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) 
        + total, 0)

        setTotal(parseFloat(nuevoTotal.toFixed(2)))
    }, [pedido])

    const handleSetproducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if (pedido.some(productoState => productoState.id === producto.id)) {

            // Actualizar la cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === 
            producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast.success("Pedido Actualizado")
        } else {
            setPedido([...pedido, producto])
            toast.success("Agregado al Pedido")
        }

        setModal(false)
    }

    
    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)
        setProducto(productoActualizar[0]) // filter retorna un arreglo
        
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const productoAEliminar = pedido.filter(producto => producto.id !== id)
        setPedido(productoAEliminar)
    }

    const colocarOrden = async e => {
        e.preventDefault()

        // Establecer conexión a API (end point)
        try {
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app
            setCategoriaActual(categorias[0]) // para que cuando envies los datos de la orden, se resetee la página, incluyendo si te encontrabas en una categoría distinta a la primera
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')
            setTimeout(() => {
                router.push('/')
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetproducto,
                producto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext