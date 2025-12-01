const CartHero = () => {
    return (
        <section className="w-full py-20 bg-gradient-to-br from-amber-100 to-orange-100">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight 
                    bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                    Your Shopping Cart
                </h1>

                {/* Background Title */}
                <div className="relative">
                    <span className="block text-[8rem] md:text-[12rem] font-extrabold 
                        bg-gradient-to-r from-orange-400 to-amber-400 
                        bg-clip-text text-transparent opacity-10 leading-none select-none whitespace-nowrap">
                        CART
                    </span>
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                    Review your selections before checkout. Your next purchase is just a click away.
                </p>
            </div>
        </section>
    );
};

export default CartHero;
