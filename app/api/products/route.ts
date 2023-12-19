import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import type { product } from "@prisma/client"
const prisma = new PrismaClient()

export const POST = async (request: Request) => {
    const body: product = await request.json()
    const product = await prisma.product.create({ data: body })
    return NextResponse.json(product, { status: 201 })
}