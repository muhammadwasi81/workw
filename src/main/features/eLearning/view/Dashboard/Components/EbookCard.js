import React from "react";
import WhiteCard from "../../../UI/WhiteCard";
import BoxThumnail from "../UI/BoxThumnail";
function EbookCard({ data }) {

	let { 
		name,
		description,
		image,
	} = data;
	let Default = "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
	console.log(name, "NAME FROM ITEM")

	return (
		<WhiteCard
			onClick={() => {}}
			className="cursor-pointer hover:shadow-lg transition-all"
		>
			<div className="flex flex-col gap-1">
				<BoxThumnail
					// tag={"IT"}
					image={image ? image : Default}
					title={name}
					description={description}
				/>
			</div>
		</WhiteCard>
	);
}

export default EbookCard;
