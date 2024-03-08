import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import { Helmet } from 'react-helmet'
import { ToastContainer } from 'react-toastify';


const layout = () => {

    return (
        <>
            <Helmet>
                <title>WokVault | an opensource hybrid password manager</title>
                <meta name="description" content="WokVault is a free opensource hybrid password manager. It is available on all platforms, stores your passwords locally and syncs your passwords across all your devices." />
                <meta name="keywords" content="password manager, free, opensource, hybrid, sync, password, manager, android, ios, windows, mac, linux, web" />
                <meta name="author" content="WokVault" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <meta property='og:title' content='WokVault | an opensource hybrid password manager' />
                <meta property='og:description' content='WokVault is a free opensource hybrid password manager. It is available on all platforms, stores your passwords locally and syncs your passwords across all your devices.' />
                <meta property='og:type' content='website' />
            </Helmet>
            <Navbar navbarButtons={["FAQ", "Downloads", "Sign Up"]} />
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                limit={5}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default layout