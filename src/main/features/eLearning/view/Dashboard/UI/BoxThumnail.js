import React from "react";

function BoxThumnail({ image, tag, title, description, level }) {
	return (
		<>
			<div className="relative ">
				<div className="overflow-hidden h-[200px] rounded-xl">
					<img
						src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
						alt="course cover"
						className=" object-cover"
					/>
				</div>
				{tag && (
					<div className="bg-white rounded-lg absolute bottom-4 left-2 p-1 px-2 font-semibold flex items-center gap-1">
						{tag} {level && level}
					</div>
				)}
			</div>
			<h1 className="!m-0 font-semibold text-2xl">
				UI UX Design: Wireframe To Define Idea
			</h1>
			<p className="!m-0 text-[#757D86]">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Reprehenderit, aperiam iste magni autem ipsa labore quia
				officiis consectetur eveniet nobis aut, laudantium nulla
				quibusdam mollitia debitis, magnam error maiores quis!
			</p>
		</>
	);
}

export default BoxThumnail;
