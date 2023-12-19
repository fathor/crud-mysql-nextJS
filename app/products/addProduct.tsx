"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"
import type { brand } from "@prisma/client"
export default function AddProduct({ brands }: { brands: brand[] }) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const router = useRouter()

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setLoading(true)
        await axios.post('api/products', {
            title: title,
            price: Number(price),
            brandId: Number(brand),
        })
        setBrand("")
        setTitle("")
        setPrice("")
        router.refresh()
        setLoading(false)
        setIsOpen(false)
    }

    function handleModal() {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button onClick={handleModal} className="btn btn-primary">Add Product</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Form Add</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Product Name</label>
                            <input type="text" placeholder="Type here..." className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Price</label>
                            <input type="text" placeholder="Type here..." className="input input-bordered" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Brand</label>
                            <select name="" id="" className="select select-bordered" value={brand} onChange={(e) => setBrand(e.target.value)}>
                                <option value="" disabled>Pilih Brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {!loading ? <button type="submit" className="btn btn-primary">Save</button> : <button type="button" className="btn loading">Saving...</button>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
