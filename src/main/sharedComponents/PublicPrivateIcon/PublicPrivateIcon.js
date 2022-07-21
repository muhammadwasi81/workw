import { LockOutlined } from "@ant-design/icons";
import React from "react";
import { privacyOption } from "../../../utils/Shared/enums/enums";
import { BiWorld } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
function PublicPrivateIcon({ id }) {
	switch (id) {
		case privacyOption.Public:
			return <BiWorld />;
		case privacyOption.Private:
			return <HiLockClosed />;
		default:
			return <BiWorld />;
	}
}

export default PublicPrivateIcon;
