import React from "react";

function ModulesList({ modules = [1, 2, 3, 4, 5] }) {
	return (
		<div>
			<p className="font-bold text-base">{modules.length} Modules</p>
			{modules.map((module, index) => (
				<div className="flex items-center gap-1 mb-8">
					<div className="h-[30px] w-[30px] items-center justify-center flex rounded-md font-bold bg-[#F5F5F7]">
						{index + 1}
					</div>
					<p className="text-[#757D86] font-bold text-sm !mb-0">
						Get to known user experience
					</p>
				</div>
			))}
		</div>
	);
}

export default ModulesList;
