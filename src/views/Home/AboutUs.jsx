import aboutImage from "../../assets/About_img/about.svg";
import whyChooseUsImage from "../../assets/About_img/whychoose.svg";
import image1 from "../../assets/About_img/image1.svg";
import image2 from "../../assets/About_img/image2.svg";
import image3 from "../../assets/About_img/image3.svg";
import image4 from "../../assets/About_img/image4.svg";

const About = () => {
    const aboutPoints = [
        {
            id: 1,
            text: "Lumina is your destination for premium fashion that combines timeless elegance with contemporary style. We curate collections that empower you to express your unique personality through quality clothing.",
        },
        {
            id: 2,
            text: "Every piece in our collection is carefully selected for its craftsmanship, comfort, and style. We believe that great fashion should be accessible, sustainable, and made to last.",
        },
    ];

    const features = [
        {
            title: "Premium Quality",
            icon: image1,
        },
        {
            title: "Sustainable Fashion",
            icon: image2,
        },
        {
            title: "Curated Collections",
            icon: image3,
        },
        {
            title: "Fast Delivery",
            icon: image4,
        },
    ];

    return (
        <>
            {/* About Us Section */}
            <section className="py-20 px-6 md:px-24 relative bg-white">
                <div className="max-w-[1440px] mx-auto">
                    {/* About Us Heading */}
                    <div className="flex justify-center mb-16">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            About Lumina
                        </h2>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Left side - Images */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Image 1 - Full height */}
                            <div className="row-span-2">
                                <img
                                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Fashion collection"
                                    className="rounded-3xl w-full h-full object-cover"
                                />
                            </div>

                            {/* Right column with 2 images */}
                            <div className="grid grid-rows-2 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Clothing details"
                                    className="rounded-3xl w-full h-full object-cover"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1558769132-cb1aea3c8e5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Fashion style"
                                    className="rounded-3xl w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right side - Content */}
                        <div className="space-y-8">
                            <ul className="list-disc space-y-6 text-[#767676] text-[24px] leading-[36px] tracking-[0] font-[400] pl-6 font-['Plus_Jakarta_Sans']">
                                {aboutPoints.map(point => (
                                    <li key={point.id} className="leading-relaxed">
                                        {point.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="bg-gradient-to-br from-purple-50 to-indigo-50 py-20">
                <div className="max-w-[1440px] mx-auto px-6 md:px-24">
                    {/* Why Choose Us Heading */}
                    <div className="flex justify-center mb-16">
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            Why Choose Lumina
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg border border-purple-100 hover:shadow-xl transition-shadow"
                            >
                                <div className="w-32 h-32 rounded-full border-4 border-purple-500 p-4 mb-6 flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-xl font-medium bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    {feature.title}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
