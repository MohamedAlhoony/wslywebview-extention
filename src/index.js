import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import 'bootstrap/dist/css/bootstrap.rtl.min.css'
const App = () => {
    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))
