"use client";
import useFamily from "@/hooks/useFamily"

export default function YourFamilyPage() {

    const { family } = useFamily()

    console.log(family)

    return (
        <h1>Hello world</h1>
    )
}