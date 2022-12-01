import React, { useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import PostShareModal from "./PostShareModal";

function PostShareContent(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [shareType, setShareType] = useState("");

	const handleShareOnChat = () => {
		setIsOpen(true);
		setShareType("Chat");
	}
	const handleShareOnFeed = () => {
		setIsOpen(true);
		setShareType("Feed");
	}
	const handleCancel = () => {
		setIsOpen(false);
		setShareType("");
	}
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
				onClick={handleShareOnFeed}>
				<RiShareForwardLine className="text-2xl text-[#5B626A]" />
				<span>Share on Feed</span>
			</div>
			<div className="flex gap-3 items-center btn cursor-pointer hover:bg-[#f6f6f6] transition-all p-2 py-1 rounded-[6px]"
				onClick={handleShareOnChat}>
				<BsChatSquareText className="text-xl text-[#5B626A]" />
				<span>Share in Chat</span>
			</div>

			<PostShareModal
				isOpen={isOpen}
				shareType={shareType}
				handleCancel={handleCancel}
			/>
		</div>
	);
}

export default PostShareContent;
