import { Table } from "antd";
import styled from "styled-components";

export const AdminTable = styled(Table)`
	.your-table table {
		width: auto;
		min-width: unset !important;
	}
	border-radius: 4px;
	tbody {
		overflow-y: auto !important;
	}
	border: 1px solid rgba(0, 0, 0, 0.1);
	margin-top: 5px;
	.ant-skeleton.ant-skeleton-element.ant-skeleton-active {
		width: 100%;
	}
	& tr:nth-child(2n) td {
		background-color: #f2f2f2;
	}
	table {
		width: 100px !important;
		overflow: scroll;
	}
	&& thead tr th {
		background-color: #1b5669;
		color: white;
		${props => props.direction === "rtl" && "text-align: right;"}
	}

	& tr {
		background-color: white;
	}

	& tr td:nth-child(1) {
		${props => props.direction === "rtl" && "text-align: right;"}
	}

	&& tbody tr td {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	&& tbody {
		height: 100%;
	}
	& .drag-td-name {
		max-width: 30px;
	}
	@media (max-width: 800px) {
		& {
			height: 420px;
		}
	}
`;
