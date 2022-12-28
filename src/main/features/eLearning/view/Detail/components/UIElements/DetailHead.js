import React from "react";

function DetailPageTopDetail({
	image,
	title,
	createdBy,
	lastUpdated,
	assignedTo,
	members,
	difficulty,
	description,
	imageHeight = "400px",
	headingSize = "20px",
}) {
	return (
		<div className="flex flex-col gap-3">
			{image && (
				<div
					className={`rounded-lg w-full overflow-hidden {h-[${imageHeight}]}`}
				>
					<img
						src={image}
						alt="course learning"
						className="h-full w-full object-cover"
					/>
				</div>
			)}
			<h1
				className={` text-black !m-0 font-extrabold `}
				style={{ fontSize: headingSize }}
			>
				{title}
			</h1>
			{description && (
				<p className="!mb-0 text-[#757D86]">{description}</p>
			)}
			<div className="flex gap-5">
				{createdBy && (
					<div className="flex items-center">
						<span className="font-semibold">
							Created by: &nbsp;
						</span>
						<span>{createdBy}</span>
					</div>
				)}
				{lastUpdated && (
					<div className="flex items-center">
						<span className="font-semibold">
							Last updated: &nbsp;
						</span>
						<span>{lastUpdated}</span>
					</div>
				)}
				{members && (
					<div className="flex items-center">
						<span className="font-semibold">
							Members: &nbsp;
						</span>
						<span>{members}</span>
					</div>
				)}
				{assignedTo && (
					<div className="flex items-center">
						<span className="font-semibold">
							Assigned to: &nbsp;
						</span>
						<span>{assignedTo}</span>
					</div>
				)}
				{difficulty && (
					<span className="flex font-bold items-center justify-end flex-1">
						{difficulty.name} &nbsp; {difficulty.icon}
					</span>
				)}
			</div>
		</div>
	);
}

export default DetailPageTopDetail;
