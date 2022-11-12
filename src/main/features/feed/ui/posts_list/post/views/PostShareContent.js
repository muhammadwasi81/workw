import React from "react";
import { RiShareForwardLine } from "react-icons/ri";

import { BsChatSquareText } from "react-icons/bs";

function PostShareContent(props) {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]">
				<RiShareForwardLine className="text-2xl text-[#5B626A]" />
				<span>Share on Feed</span>
			</div>
			<div className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]">
				<BsChatSquareText className="text-xl text-[#5B626A]" />
				<span>Share in Chat</span>
			</div>
		</div>
	);
}

export default PostShareContent;
