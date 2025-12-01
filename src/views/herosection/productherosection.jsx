const ProductHero = () => {
    return (
        <section className="w-full py-20 bg-gradient-to-br from-purple-100 to-indigo-100">
            <div className="max-w-6xl mx-auto px-6 text-center">

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold leading-tight 
                    bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Explore Our Products
                </h1>

                {/* Soft Background Word */}
                <div className="relative">
                    <span className="block text-[8rem] md:text-[12rem] font-extrabold 
                        bg-gradient-to-r from-purple-400 to-indigo-400 
                        bg-clip-text text-transparent opacity-10 leading-none select-none">
                        PRODUCTS
                    </span>
                </div>

                {/* Subtitle */}
                <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
                    Discover top-quality items crafted with care and curated to match your taste.
                </p>
            </div>
        </section>
    );
};

export default ProductHero;
