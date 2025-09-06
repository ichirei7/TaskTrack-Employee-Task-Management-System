import React from 'react'
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
        <h1>404</h1>
        <p>Page not found.</p>
        <p><Link to="/">Return to Homepage</Link></p>
    </div>
  )
}
