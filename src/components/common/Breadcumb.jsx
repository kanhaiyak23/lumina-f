import React from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = ({ breadcrumbs }) => {
    const location = useLocation(); // Get the current URL

    // Filter breadcrumbs to show only up to the current page
    const filteredBreadcrumbs = breadcrumbs.filter(crumb =>
        location.pathname.startsWith(crumb.url),
    );

    return (
        <nav className="flex items-center space-x-2 text-gray-600 text-sm">
            {filteredBreadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                    {index !== filteredBreadcrumbs.length - 1 ? (
                        <Link
                            to={crumb.url}
                            className="flex items-center hover:text-blue-600 transition-colors"
                        >
                            <span className="text-xl">{crumb.label}</span>
                        </Link>
                    ) : (
                        <span className="text-[#04A42A] text-xl font-normal ">{crumb.label}</span>
                    )}

                    {index < filteredBreadcrumbs.length - 1 && (
                        <ChevronRight className="w-5 h-5 mx-4 text-[#04A42A]" />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumb;
