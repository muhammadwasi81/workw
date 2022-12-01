import React, { useState } from "react";
import { RiShareForwardLine } from "react-icons/ri";
import { BsChatSquareText } from "react-icons/bs";
import PostShareModal from "./PostShareModal";
import { Popover } from "antd";

function PostShareContent(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [shareType, setShareType] = useState("");
	const [openPopover, setOpenPopover] = useState(false);

	const handleShareOnChat = () => {
		setIsOpen(true);
		setOpenPopover(false);
		setShareType("Chat");
	}
	const handleShareOnFeed = () => {
		setIsOpen(true);
		setOpenPopover(false);
		setShareType("Feed");
	}
	const handleCancel = () => {
		setIsOpen(false);
		setShareType("");
	}
	return (
		<>
			<Popover
				placement="bottom"
				trigger="click"
				overlayClassName="share-feed__content w-[250px]"
				open={openPopover}
				onOpenChange={(e) => setOpenPopover(e)}
				content={
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
					</div>}
			>
				<div className="btn">
					<div>
						<RiShareForwardLine className="text-3xl" />
						{/* <img src={ShareIcon} alt="" /> */}
					</div>
					<div> {"Share"}</div>
				</div>
			</Popover>
			<PostShareModal
				isOpen={isOpen}
				shareType={shareType}
				handleCancel={handleCancel}
			/>
		</>
	);
}

export default PostShareContent;
