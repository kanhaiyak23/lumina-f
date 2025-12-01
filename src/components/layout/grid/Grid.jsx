import React from "react";
import GridItem from "./CGridItem";
import GridContainer from "./CGContainer";
const Grid = ({ children, gap = 16, className, xs, md, lg, item = false, style }) => {
    return item ? (
        <GridItem children={children} className={className} xs={xs} md={md} lg={lg} style={style} />
    ) : (
        <GridContainer children={children} className={className} gap={gap} style={style} />
    );
};

export default Grid;
