import React from "react";
import EbookCard from "../../Components/EbookCard";

function Ebooks() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-2">
			<EbookCard />
			<EbookCard />
			<EbookCard />
			<EbookCard />
			<EbookCard />
			<EbookCard />
		</div>
	);
}

export default Ebooks;
