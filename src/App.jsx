import "./App.css";
import { RouterProvider } from "react-router-dom";
import AppRouting from "./AppRouting";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./utils/axiosInterceptors";
import Loading from "./views/Loading";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./Redux Store/Slices/auth";
import PhoneInputComponent from "./views/userAuth/PhoneInput";
import { useSelector } from "react-redux";
import { successToast } from "./utils/toasts";
import NetworkStatus from "./views/NetworkStatus";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // default: true
        },
    },
});

function App() {
    const dispatch = useDispatch();
    const phoneRequired = useSelector(state => state.auth.phoneRequired);
    const toastMessage = useSelector(state => state.auth.toastMessage);

    useEffect(() => {
        if (toastMessage) {
            successToast(toastMessage);
            // setTimeout(() => dispatch(clearToastMessage()), 3000); // Clear after 3 seconds
        }

        dispatch(fetchUser()); // Runs when app starts
    }, [dispatch, toastMessage]);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Loading />
                <NetworkStatus />

           
                <RouterProvider
                    router={AppRouting}
                    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
                />
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </QueryClientProvider>
        </>
    );
}

export default App;
