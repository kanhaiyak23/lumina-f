import React from "react";
import Avatar from "../Avatar";

const AvatarGroup = ({ data = new Array(6).fill(0), size = "md" }) => {
    return (
        <div class="flex -space-x-4 rtl:space-x-reverse">
            {data?.slice(0, 3)?.map(img => (
                <Avatar size={size} src={img.src} name="JD" />
            ))}
            {data?.length > 3 && <Avatar size={size} name={`+${data.length - 3}`} />}
        </div>
    );
};

export default AvatarGroup;
