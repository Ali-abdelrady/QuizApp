import { useEffect, useReducer, useState } from "react"
import Loader from "./Loader";
import Error from "./Error"

export default function Main({ children }) {

    return <main className="main">
        {children}
    </main>
}
