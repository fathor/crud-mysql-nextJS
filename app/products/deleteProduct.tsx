"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

type Product = {
    id: number
    title: string
    price: number
    brandId: number
}
export default function DeleteProduct({ product }: { product: Product }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleDelete(productId: number) {
        setLoading(true)
        await axios.delete(`api/products/${productId}`)
        router.refresh()
        setLoading(false)
        setIsOpen(false)
    }

    function handleModal() {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn btn-error btn-sm" onClick={handleModal}>Delete</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure you want to delete this product {product.title}?</h3>
                    <div className="modal-action">
                        <button className="btn btn-error" onClick={handleModal}>No</button>
                        {!loading ? <button className="btn btn-primary" onClick={(e) => handleDelete(Number(product.id))}>Yes</button> : <button type="button" className="btn loading">Deleting...</button>}

                    </div>
                </div>
            </div>
        </div>
    )
}
