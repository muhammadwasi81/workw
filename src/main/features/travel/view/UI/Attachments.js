import React from "react";

function Attachments({ data }) {
	return (
		<>
			{data.length > 0 && (
				<div
					className="rounded-xl shadow-[1px_1px_3px_0px_rgba(13,12,12,0.17)] overflow-hidden "
					onClick={e => {
						e.preventDefault();
						e.stopPropagation();
					}}
				>
					<div
						className={`grid ${data.length > 1 &&
							"grid-cols-2"}  gap-2`}
					>
						<img
							className="w-[100px] h-[100px]"
							src={data[0].path}
							alt={data[0].attachmentName}
							key={data[0].id}
						/>
						{data.length > 1 && (
							<div className="relative">
								<div className="absolute bottom-0 w-full h-full text-white font-extrabold bg-[#707070] flex justify-center items-center bg-opacity-60 text-[25px]">
									+ {data.length - 1}
								</div>
								<img
									className="w-[100px] h-[100px] object-cover"
									src={data[1].path}
									alt={data[1].attachmentName}
									key={data[1].id}
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default Attachments;
