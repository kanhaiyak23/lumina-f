import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import CustomButton from "../../components/common/CustomButton/CustomButton";
import { selectCartItems, selectCartTotal, selectAddress } from "../../Redux Store/Slices/cart";
import { createNewOrder, updatePaymentStatus } from "../../Redux Store/Slices/order";
import CartHero from "../../views/herosection/herosection";
import EmptyCart from "./EmptyCart";
import Breadcrumb from "../../components/common/Breadcumb";


import { setAddresses } from "../../Redux Store/Slices/cart";
import { toast } from "react-hot-toast";
import { processOrder } from "../../Redux Store/Slices/order";
import { deleteAddress } from "../../Redux Store/Slices/cart";
import DeleteConfirmationModal from "./DeleteConformationModal";
import axios from "axios";
import LoaderWebp from "../../assets/loading.webp";
import { addressService } from "../../Services/address.services";

const Cart = () => {
    const { paymentLink, status } = useSelector(state => state.order);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartTotal);
    const selectedAddressId = useSelector(state => state.cart.selectedAddressId);
    const addresses = useSelector(state => state.cart.addresses);
    const user = useSelector(state => state.auth.user);
    const [isProcessing, setIsProcessing] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);

    useEffect(() => {
        const fetchAddresses = async () => {
            if (user && user.id) {
                try {
                    const data = await addressService.fetchAddresses(user.id);
                    dispatch(setAddresses(data));
                } catch (error) {
                    console.error("Error fetching addresses:", error);
                }
            }
        };
        fetchAddresses();
    }, [dispatch, user]);
    if (cartItems.length === 0) {
        return <EmptyCart />;
    }
    const handleCheckout = async () => {
        setIsProcessing(true);
        // if (selectedAddress) {
        //     dispatch(processOrder({ user, cartItems }));
        // } else {
        //     navigate("/address");
        // }
        try {
            console.log(cartItems);
            const { data: keyData } = await axios.get("http://localhost:8080/api/v1/getKey");
            const { key } = keyData;
            //Sending request to backend to create both order in databse and razorpay order
            const { data: orderData } = await axios.post(
                "http://localhost:8080/api/v1/payment/process",
                {
                    amount: subtotal, // Ensure this is a number
                    address_id: selectedAddressId,
                    user_id: user.id,
                    total_price: subtotal,
                    payment_status_id: "b0da5557-8afc-436d-a6a6-5d1e54d3e362", //pending
                    order_status_id: "c655bd8a-1269-4f51-b988-8d2c0940124e", //pending
                    cartItems,
                },
            );
            const backendAmount = orderData.amount; //getting the amount stored in backend for opening payment page
            console.log(backendAmount, "backend amount in frontend");
            const { order } = orderData;

            console.log(order);
            const options = {
                key: key, // Razorpay Key ID
                amount: backendAmount,
                currency: "INR",
                name: "Microgreen",
                description: "Purchase Description",
                order_id: order.id,
                callback_url: "http://localhost:8080/api/v1/paymentVerification", //payment verification page redirect after payment done
                prefill: {
                    name: "kk",
                    email: "kk@gmail.com",
                    contact: "888888888",
                },
                theme: { color: "#3399cc" },

                // handler: function (response) {
                //     console.log("Payment Success:", response);
                //     window.location.href = `http://localhost:3000/paymentSuccess?reference=${response.razorpay_payment_id}`;
                // },

                // ✅ 2. Handle Payment Failure using `payment.failed` event
                modal: {
                    ondismiss: function () {
                        alert("Payment cancelled by user!");
                        setIsProcessing(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function (response) {
                console.error("Payment Failed:", response);
                alert(`Payment failed: ${response.error.description}`);
            });

            //     rzp.on("payment.failed", function (response) {
            //         console.error("Payment Failed:", response);
            //         if (response.error.code === "BAD_REQUEST_ERROR") {
            //             alert("Payment Failed: Insufficient balance. Try a different payment method.");
            //         } else {
            //             alert(`Payment is processing, please wait a moment.\nReason: ${response.error.description}\nCode: ${response.error.code}`);
            // }});
            rzp.open();
            setIsProcessing(false);
        } catch (error) {
            console.error(error);
            alert("Payment failed!");
            setIsProcessing(false);
        }
    };

    const onEdit = address => {
        console.log(address);
        navigate("/address", { state: { existingAddress: address } });
    };

    const handleDeleteClick = id => {
        setAddressToDelete(id);
        setDeleteModalOpen(true);
    };
    const confirmDelete = async () => {
        if (!addressToDelete) return;
        try {
            await addressService.deleteAddress(addressToDelete, user.id);
            dispatch(deleteAddress(addressToDelete));
            toast.success("Address deleted successfully");
        } catch (error) {
            toast.error("Failed to delete address");
        }
        setDeleteModalOpen(false);
    };

    return (
        <div className="min-h-screen">
            <div className="w-full">
                <CartHero />
            </div>
            <div className="main-content-container py-4 mx-auto px-4 sm:px-6 lg:px-8">
                <Breadcrumb
                    breadcrumbs={[
                        { label: "Home", url: "/" },
                        { label: "Shop", url: "/shop" },
                        { label: "Cart", url: "/cart" },
                    ]}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 py-10">
                    {/* Cart Items Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 shadow-sm border border-[#E4E4E4]">
                            <div className="p-4 sm:p-6 border-b border-[80%] border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl sm:text-2xl font-semibold">
                                        Shopping Cart
                                    </h2>
                                    <span className="text-[#04A42A] font-bold">
                                        {cartItems.length} Items
                                    </span>
                                </div>
                            </div>

                            {/* Cart Headers */}
                            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 pr-14 py-4 md:justify-start border-gray-200 text-sm font-medium text-[#262626]">
                                <div className="col-span-6">Product Details</div>
                                <div className="col-span-2 text-left">Quantity</div>
                                <div className="col-span-2 text-right">Price</div>
                                <div className="col-span-2 text-right">Total</div>
                            </div>

                            <div className="divide-gray-200">
                                {cartItems.map(item => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </div>
                            <CustomButton
                                variant="lightgreen"
                                startIcon={<ArrowLeft className="w-5 h-5" />}
                                label="Continue Shopping"
                                className="!font-bold"
                                onClick={() => navigate("/shop")}
                            />
                        </div>
                    </div>

                    {/* Order Summary and Address Section */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#EFEFEF] divide-y">
                            {/* Address Section */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Delivery Address</h3>
                                    <CustomButton
                                        variant="outline"
                                        label={selectedAddress ? "Add new" : "Add Address"}
                                        onClick={() => navigate("/address")}
                                        className="px-4"
                                    />
                                </div>
                                <div className="space-y-4">
                                    {addresses.length > 0 ? (
                                        addresses.map(address => (
                                            <div
                                                key={address.id}
                                                className={`p-4 border ${selectedAddressId === address.id
                                                    ? "border-green-500"
                                                    : "border-gray-300"
                                                    } rounded-lg cursor-pointer`}
                                                onClick={() => dispatch(selectAddress(address.id))}
                                            >
                                                <p className="font-medium">{user.name}</p>
                                                <p>
                                                    {address.address}, {address.city},{" "}
                                                    {address.state} - {address.pincode}
                                                </p>
                                                <p className="text-gray-600">
                                                    Mobile: {address.mobile_number}
                                                </p>

                                                {/* Edit and Delete Buttons */}
                                                <div className="flex gap-4 mt-2">
                                                    <button
                                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                                        onClick={() => onEdit(address)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                        onClick={() =>
                                                            handleDeleteClick(address.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600">
                                            No addresses found. Please add one.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Order Summary Section */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">
                                            Subtotal ({cartItems.length} Items)
                                        </span>
                                        <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="text-green-600 font-medium">FREE!</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold">Order Total</span>
                                            <span className="font-semibold text-lg">
                                                ₹{subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <CustomButton
                                        variant="lightgreen"
                                        label={
                                            isProcessing
                                                ? "Processing..."
                                                : selectedAddress
                                                    ? "Proceed to Checkout"
                                                    : "Select Delivery Address"
                                        }
                                        className="w-full mt-2"
                                        startIcon={<ShoppingBag className="w-5 h-5" />}
                                        disabled={!selectedAddress || isProcessing}
                                        onClick={
                                            selectedAddress
                                                ? handleCheckout
                                                : () => navigate("/address")
                                        }
                                    />
                                    {!selectedAddress && (
                                        <p className="text-red-500 text-sm mt-2 text-center">
                                            Please select an address to continue
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isProcessing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <p className="text-lg font-semibold">Processing Payment...</p>
                        {/* <div className="mt-4 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
                        <img
                            src={LoaderWebp}
                            className="w-16 h-16 animate-spin drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                            alt="Loading..."
                        />
                    </div>
                </div>
            )}

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
};

export default Cart;
