import { LockOutlined } from "@ant-design/icons";
import React from "react";
import { privacyOption } from "../../../utils/Shared/enums/enums";
import { BiWorld } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
function PublicPrivateIcon({ id, className = "" }) {
	switch (id) {
		case privacyOption.Public:
			return <BiWorld className={className} />;
		case privacyOption.Private:
			return <HiLockClosed className={className} />;
		default:
			return <BiWorld className={className} />;
	}
}

export default PublicPrivateIcon;
