"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import type { brand } from "@prisma/client"

type Product = {
    id: number
    title: string
    price: number
    brandId: number
}
export default function UpdateProduct({ brands, product }: { brands: brand[], product: Product }) {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [brand, setBrand] = useState(product.brandId)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    async function handleUpdate(e: SyntheticEvent) {
        setLoading(true)
        e.preventDefault()
        await axios.patch(`api/products/${product.id}`, {
            title: title,
            price: Number(price),
            brandId: Number(brand),
        })
        router.refresh()
        setIsOpen(false)
        setLoading(false)
    }

    function handleModal() {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button onClick={handleModal} className="btn btn-primary btn-sm">Edit</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Form Update Product {product.title}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" placeholder="Type here..." className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="text" placeholder="Type here..." className="input input-bordered" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select name="" id="" className="select select-bordered" value={brand} onChange={(e) => setBrand(Number(e.target.value))}>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {!loading ? <button type="submit" className="btn btn-primary">Update</button> : <button type="button" className="btn loading">Updating...</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
