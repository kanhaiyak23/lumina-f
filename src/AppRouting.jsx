import { createBrowserRouter ,ScrollRestoration} from "react-router-dom";

//* Import Slices
import { setHeaderTitle } from "./Redux Store/Slices/header.js";
import store from "./Redux Store/store.js";
import Benifits from "./views/Benifits/index.jsx";

//* Import Views with Lazy Loading
import AppWrapper from "./AppWrapper.jsx";
import UserRegister from "./views/userAuth/userRegister.jsx";

// import Login from "./views/auth/Login/Login";
// import SignUp from "./views/auth/SignUp";
import HeroSection from "./views/herosection/herosection.jsx";
import AboutUs from "./views/AboutUs/AboutUs.jsx";
import ProductPage from "./views/ProductPage/ProductPage.jsx";
// import Login from "./views/auth/Login/Login";
import UserLogin from "./views/userAuth/userLogin.jsx";
import ForgotPasswordEmail from "./views/userAuth/forgotPassword/ForgotPasswordEmail.jsx";
import ForgotPasswordOTP from "./views/userAuth/forgotPassword/ForgotPasswordOTP.jsx";
import ResetPassword from "./views/userAuth/forgotPassword/ForgotPasswordReset.jsx";
import EmptyCart from "./views/Cart/EmptyCart.jsx";
import Cart from "./views/Cart/Cart.jsx";
import AddressForm from "./views/Cart/AddressForm.jsx";
import PaymentSuccess from "./views/Cart/paymentSuccess.jsx";
import PaymentFailed from "./views/Cart/paymentFailure.jsx";
import ProductDetails from "./views/ProductPage/ProductDescription.jsx";
import Profile from "./views/userAuth/Profile.jsx";
import Subscription from "./views/Subscription/Subscription.jsx";
import SubscriptionHistory from "./views/Subscription/SubscriptionHistory.jsx";
import BusinessProfile from "./views/userAuth/businessProfile.jsx";
import ScrollToTop from "./views/common/Scrolltotop.jsx";

const { Login } = await import("./views/auth/Login/Login");
// const {UserLogin} =await  import("./views/userAuth/userLogin.jsx");
const { SignUp } = await import("./views/auth/SignUp");
const { NotFountPage } = await import("./views/common/NotFountPage");
const { Components } = await import("./views/Components");
const { Dashboard } = await import("./views/Dashboard");
const { Home } = await import("./views/Home/Home.jsx");
// const {Benifits} = await import("./views/Benifits/index.jsx")
// let routes = createBrowserRouter([
//     {
//         path: "/",
//         element: <AppWrapper />,
//         // loader: async () => {
//         //   const res = await fetchUsersData();
//         //   if (res.status) {
//         //     return true;
//         //   } else return false;
//         // },
//         children: [
//             {
//                 path: "/",
//                 lazy: async () => {
//                     return { Component: Home };
//                 },
//                 // loader: async () => {
//                 //     store.dispatch(setHeaderTitle("Dashboard"));
//                 //     return null;
//                 // },
//             },
//             {
//                 path: "/about-us",
//                 lazy: async () => {
//                     return { Component: AboutUs };
//                 },
//             },
//             {
//                 path: "/benifits",
//                 lazy: async () => {
//                     return { Component: Benifits };
//                 },
//             },
//             {
//                 path: "/products",
//                 lazy: async () => {
//                     return { Component: ProductPage };
//                 },
//             },
//             {
//                 path: "/product/:id",
//                 lazy: async () => {
//                     return { Component: ProductDetails };
//                 },
//             },
//             {
//                 path: "/cart",
//                 lazy: async () => {
//                     return { Component: Cart };
//                 },
//             },
//             {
//                 path: "/login",
//                 lazy: async () => {
//                     return { Component: Login };
//                 },
//             },
//             {
//                 path: "/sign-up",
//                 lazy: async () => {
//                     return { Component: SignUp };
//                 },
//             },
//             {
//                 path: "/userLogin",
//                 lazy: async () => {
//                     return { Component: UserLogin };
//                 },
//             },
//             {
//                 path: "/userRegister",
//                 lazy: async () => {
//                     return { Component: UserRegister };
//                 },
//             },
//             {
//                 path: "/address",
//                 lazy: async () => {
//                     return { Component: AddressForm };
//                 },
//             },
//             {
//                 path: "/forgotPasswordEmail",
//                 lazy: async () => {
//                     return { Component: ForgotPasswordEmail };
//                 },
//             },
//             {
//                 path: "/forgotPasswordreset",
//                 lazy: async () => {
//                     return { Component: ResetPassword };
//                 },
//             },
//             {
//                 path: "/profile",
//                 lazy: async () => {
//                     return { Component: Profile };
//                 },
//             },
//             {
//                 path: "/subscription",
//                 lazy: async () => {
//                     return { Component: Subscription };
//                 },
//             },
//             {
//                 path: "/subscriptionhistory",
//                 lazy: async () => {
//                     return { Component: SubscriptionHistory };
//                 },
//             },
//             {
//                 path: "/businessProfile",
//                 lazy: async () => {
//                     return { Component: BusinessProfile };
//                 },
//             },
//         ],
//     },

//     {
//         path: "/components",
//         lazy: async () => {
//             return { Component: Components };
//         },
//     },
//     {
//         path: "/herosection",
//         lazy: async () => {
//             return { Component: HeroSection };
//         },
//     },

//     ,
//     {
//         path: "/forgotPasswordOTP",
//         lazy: async () => {
//             return { Component: ForgotPasswordOTP };
//         },
//     },

//     {
//         path: "/cart",
//         lazy: async () => {
//             return { Component: Cart };
//         },
//     },
//     {
//         path: "*",
//         lazy: async () => {
//             return { Component: NotFountPage };
//         },
//     },
//     {
//         path: "/paymentSuccess",
//         lazy: async () => {
//             return { Component: PaymentSuccess };
//         },
//     },
//     {
//         path: "/paymentFailed",
//         lazy: async () => {
//             return { Component: PaymentFailed };
//         },
//     },

//* Import Slices
// import { setHeaderTitle } from "./Redux Store/Slices/header.js";
// import store from "./Redux Store/store.js";
// import Benifits from "./views/Benifits/index.jsx";

//* Import Views with Lazy Loading
// import AppWrapper from "./AppWrapper.jsx";
// import UserRegister from "./views/userAuth/userRegister.jsx";

// import Login from "./views/auth/Login/Login";
// // import SignUp from "./views/auth/SignUp";
// import HeroSection from "./views/herosection/herosection.jsx";
// import AboutUs from "./views/AboutUs/AboutUs.jsx";
// import ProductPage from "./views/ProductPage/ProductPage.jsx";
// // import Login from "./views/auth/Login/Login";
// import UserLogin from "./views/userAuth/userLogin.jsx";
// import ForgotPasswordEmail from "./views/userAuth/forgotPassword/ForgotPasswordEmail.jsx";
// import ForgotPasswordOTP from "./views/userAuth/forgotPassword/ForgotPasswordOTP.jsx";
// import ResetPassword from "./views/userAuth/forgotPassword/ForgotPasswordReset.jsx";
// import EmptyCart from "./views/Cart/EmptyCart.jsx";
// import Cart from "./views/Cart/Cart.jsx";
// import AddressForm from "./views/Cart/AddressForm.jsx";
// import PaymentSuccess from "./views/Cart/paymentSuccess.jsx";
// import PaymentFailed from "./views/Cart/paymentFailure.jsx";
// import ProductDetails from "./views/ProductPage/ProductDescription.jsx";
// import Profile from "./views/userAuth/Profile.jsx";
// import Subscription from "./views/Subscription/Subscription.jsx";
// import SubscriptionHistory from "./views/Subscription/SubscriptionHistory.jsx";
// import BusinessProfile from "./views/userAuth/businessProfile.jsx";

// const { Login } = await import("./views/auth/Login/Login");
// // const {UserLogin} =await  import("./views/userAuth/userLogin.jsx");
// const { SignUp } = await import("./views/auth/SignUp");
// const { NotFountPage } = await import("./views/common/NotFountPage");
// const { Components } = await import("./views/Components");
// const { Dashboard } = await import("./views/Dashboard");
// const { Home } = await import("./views/Home/Home.jsx");
// const {Benifits} = await import("./views/Benifits/index.jsx")
let routes = createBrowserRouter([
    {
        path: "/",
        element:<>
        <ScrollToTop />
        <AppWrapper />
        </> ,
        // loader: async () => {
        //   const res = await fetchUsersData();
        //   if (res.status) {
        //     return true;
        //   } else return false;
        // },
        children: [
            {
                path: "/",
                lazy: async () => {
                    return { Component: Home };
                },
                // loader: async () => {
                //     store.dispatch(setHeaderTitle("Dashboard"));
                //     return null;
                // },
            },
            {
                path: "/about-us",
                lazy: async () => {
                    return { Component: AboutUs };
                },
            },
            {
                path: "/benifits",
                lazy: async () => {
                    return { Component: Benifits };
                },
            },
            {
                path: "/products",
                lazy: async () => {
                    return { Component: ProductPage };
                },
            },
            {
                path: "/product/:id",
                lazy: async () => {
                    return { Component: ProductDetails };
                },
            },
            {
                path: "/cart",
                lazy: async () => {
                    return { Component: Cart };
                },
            },
            {
                path: "/login",
                lazy: async () => {
                    return { Component: Login };
                },
            },
            {
                path: "/sign-up",
                lazy: async () => {
                    return { Component: SignUp };
                },
            },
            {
                path: "/userLogin",
                lazy: async () => {
                    return { Component: UserLogin };
                },
            },
            {
                path: "/userRegister",
                lazy: async () => {
                    return { Component: UserRegister };
                },
            },
            {
                path: "/address",
                lazy: async () => {
                    return { Component: AddressForm };
                },
            },
            {
                path: "/forgotPasswordEmail",
                lazy: async () => {
                    return { Component: ForgotPasswordEmail };
                },
            },
            {
                path: "/forgotPasswordreset",
                lazy: async () => {
                    return { Component: ResetPassword };
                },
            },
            {
                path: "/profile",
                lazy: async () => {
                    return { Component: Profile };
                },
            },
            {
                path: "/subscription",
                lazy: async () => {
                    return { Component: Subscription };
                },
            },
            {
                path: "/subscriptionhistory",
                lazy: async () => {
                    return { Component: SubscriptionHistory };
                },
            },
            {
                path: "/businessProfile",
                lazy: async () => {
                    return { Component: BusinessProfile };
                },
            },
        ],
    },

    {
        path: "/components",
        lazy: async () => {
            return { Component: Components };
        },
    },
    {
        path: "/admin",
        lazy: async () => {
            const { default: AdminRoot } = await import("./admin/AdminRoot");
            return { Component: AdminRoot };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    const { default: AdminDashboard } = await import("./admin/pages/Dashboard");
                    return { Component: AdminDashboard };
                },
            },
            {
                path: "products",
                lazy: async () => {
                    const { default: ProductList } = await import(
                        "./admin/pages/products/ProductList"
                    );
                    return { Component: ProductList };
                },
            },
            {
                path: "products/new",
                lazy: async () => {
                    const { default: ProductForm } = await import(
                        "./admin/pages/products/ProductForm"
                    );
                    return { Component: ProductForm };
                },
            },
            {
                path: "products/:id",
                lazy: async () => {
                    const { default: ProductForm } = await import(
                        "./admin/pages/products/ProductForm"
                    );
                    return { Component: ProductForm };
                },
            },
            {
                path: "orders",
                lazy: async () => {
                    const { default: OrderList } = await import("./admin/pages/orders/OrderList");
                    return { Component: OrderList };
                },
            },
            {
                path: "orders/:id",
                lazy: async () => {
                    const { default: OrderDetail } = await import(
                        "./admin/pages/orders/OrderDetail"
                    );
                    return { Component: OrderDetail };
                },
            },
        ],
    },
    {
        path: "/herosection",
        lazy: async () => {
            return { Component: HeroSection };
        },
    },

    ,
    {
        path: "/forgotPasswordOTP",
        lazy: async () => {
            return { Component: ForgotPasswordOTP };
        },
    },

    {
        path: "/cart",
        lazy: async () => {
            return { Component: Cart };
        },
    },
    {
        path: "*",
        lazy: async () => {
            return { Component: NotFountPage };
        },
    },
    {
        path: "/paymentSuccess",
        lazy: async () => {
            return { Component: PaymentSuccess };
        },
    },
    {
        path: "/paymentFailed",
        lazy: async () => {
            return { Component: PaymentFailed };
        },
    },
    {
        path: "/terms",
        lazy: async () => {
            const { default: TermsAndConditions } = await import(
                "./views/Legal/TermsAndConditions"
            );
            return { Component: TermsAndConditions };
        },
    },
    {
        path: "/privacy",
        lazy: async () => {
            const { default: PrivacyPolicy } = await import("./views/Legal/PrivacyPolicy");
            return { Component: PrivacyPolicy };
        },
    },
    {
        path: "/refund-policy",
        lazy: async () => {
            const { default: RefundPolicy } = await import("./views/Legal/RefundPolicy");
            return { Component: RefundPolicy };
        },
    },
    {
        path: "/shipping-policy",
        lazy: async () => {
            const { default: ShippingPolicy } = await import("./views/Legal/ShippingPolicy");
            return { Component: ShippingPolicy };
        },
    },
]);

export default routes;
