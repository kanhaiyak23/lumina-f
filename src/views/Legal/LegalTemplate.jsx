import React from "react";

const LegalTemplate = ({ title, intro, sections }) => {
    return (
        <div className="bg-white min-h-screen py-10 px-4">
            <div className="main-content-container max-w-4xl mx-auto space-y-6">
                <header className="space-y-3">
                    <p className="text-sm text-emerald-600 font-semibold uppercase">Policy</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
                    {intro && <p className="text-gray-600 leading-relaxed">{intro}</p>}
                </header>

                <div className="space-y-6">
                    {sections?.map(section => (
                        <section
                            key={section.heading}
                            className="bg-gray-50 rounded-2xl border border-gray-100 p-5 space-y-3"
                        >
                            <h2 className="text-lg font-semibold text-gray-900">
                                {section.heading}
                            </h2>
                            {section.content && (
                                <p className="text-gray-600 leading-relaxed">{section.content}</p>
                            )}
                            {section.items && (
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    {section.items.map(item => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LegalTemplate;
