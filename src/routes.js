import React from 'react'
import HomePage from './pages/home/home'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/notFound/notFound'
import Layout from './components/layout/layout'
import Success from './pages/success/success'
const routes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/:itemID" element={<HomePage />} />
                <Route path="/notFound" element={<NotFound />} />
                <Route path="/success" element={<Success />} />
                <Route path="/*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default routes
