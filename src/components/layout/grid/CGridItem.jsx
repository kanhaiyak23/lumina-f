import React from "react";
import { useMediaQuery } from "react-responsive";

const CGridItem = ({
    children,
    xs: _xs = null,
    md: _md = null,
    lg: _lg = null,
    className,
    style,
}) => {
    const isBigScreen = useMediaQuery({ query: "(min-width: 1900px)" });
    const isDesktopOrLaptop = useMediaQuery({
        query: "(min-width: 900px)",
    });
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 900px)" });

    let span = isTabletOrMobile
        ? _xs || 12
        : isBigScreen
          ? _lg || _md || _xs || 12
          : isDesktopOrLaptop
            ? _md || _xs || 12
            : 12;

    return (
        <div
            className={className}
            style={{
                gridColumn: `span ${span} / span ${span}`,
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default CGridItem;
