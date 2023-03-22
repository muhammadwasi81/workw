import React, { Component } from "react";
import { API } from "../../../utils/services";
import $ from "jquery";
import { getRelativeTime, LOGGER, STRINGS } from "../../../utils/base";
import { Link, NavLink } from "react-router-dom";
// import ApprovalRemarksDialog from "./approvalRemarksDialog";
import { Badge } from "antd";
// import FormDialog from "../../SharedComponent/Snackbar/FormDialog";
import { Spin } from "antd";
import Avatar from "../../sharedComponents/Avatar/avatarOLD";
import { setApprovalStatus, setNotificationStatus } from "../../../store/appReducer/responsiveSlice";
import { useDispatch } from "react-redux";

class Approvals extends Component {
	dispatch = useDispatch();
	approvalsHolder = React.createRef();
	currentPage = 0;
	state = {
		approvals: [],
		isDialogOpen: false,
		approval: {},
		action: 0,
		Message: "",
		variant: "",
		actionName: "",
		isOpen: false,
		loading: false,
	};
	handleCloseNotificationBar = (status = false) => {
		console.log("FIRST")
		this.dispatch(setApprovalStatus(status));
		console.log("SECOND")
	  };

	componentDidMount() {
		this.getApprovals(++this.currentPage);
	}

	getApprovals = page => {
		this.handlePagination(false);
		this.setState({ loading: true });
		API.APPROVALS.getAllApprovals({ pageNo: page, status: [1, 4] }).then(
			({ status, data }) => {
				if (status) {
					this.setState({ loading: false });
					if (data.length > 0) {
						this.setState({
							approvals: this.state.approvals.concat(data),
						});
						this.handlePagination(true);
					}
				}
			}
		);
	};

	handlePagination = (doPagination = true) => {
		const _section = $(this.approvalsHolder.current);
		if (doPagination) {
			_section.on("scroll", () => {
				if (
					_section.scrollTop() + _section.innerHeight() >=
					_section[0].scrollHeight
				)
					this.getApprovals(++this.currentPage);
			});
		} else {
			_section.off("scroll");
		}
	};

	handleApprovalClick = ({ referenceType, reference_id }) => {
		console.log(referenceType);
		switch (referenceType) {
			case 113:
			case 114:
			case 115:
			case 116:
			case 136:
			case 137:
			case 138:
			case 139:
			case 188:
			case 189:
			case 190:
			case 191: //Expense
				window.location.replace(
					`${STRINGS.ROUTES.EXPENSES}/${reference_id}`
				);
				break;
			case 117:
			case 118:
			case 144: // travel default
				window.location.replace(
					`${STRINGS.ROUTES.TRAVEL.DEFAULT}/${reference_id}`
				);
				break;
			case 193: // travel
				window.location.replace(
					`${STRINGS.ROUTES.TRAVEL.APPROVALS}/${reference_id}`
				);
				break;
			case 143: //Leave
				window.location.replace(`${STRINGS.ROUTES.HR.LEAVES}?f=app`);
				break;
			case 89: //Document
				window.location.replace(
					`${STRINGS.ROUTES.DOCUMENTS.DEFAULT}?f=app`
				);
				break;
			case 145:
			case 146:
			case 147: // assets
				break;
			case 184: // project budget
				// window.location.replace(`${STRINGS.ROUTES.PROJECT.BUDGETS}/${reference_id}`);
				break;
			case 194: // schedules
				window.location.replace(
					`${STRINGS.ROUTES.SCHEDULES}/2/${reference_id}?f=td`
				);
				break;
			case 197: // schedules
				window.location.replace(
					`${STRINGS.ROUTES.SCHEDULES}/2/${reference_id}?f=td`
				);
				break;
			default:
		}
	};

	handleApprovalRemarks = obj => {
		let { remark, approval, action } = obj;
		if (remark !== null) {
			if (remark.trim() !== "") {
				this.doSendRemark(approval, {
					remarks: remark,
					status: action,
				});
			}
		}
	};

	handleApprovalActionClick = (approval, action) => {
		let mobileView = window.innerWidth < 800;
		if (mobileView) {
			this.props.mobileClick();
		}
		if (approval.referenceType === 144) {
			this.setState({
				approval: approval,
				action: action,
				actionName: action === 2 ? "Accept" : "Decline",
				isAgentDialogOpen: true,
			});
		} else {
			this.setState({
				approval: approval,
				action: action,
				isDialogOpen: true,
			});
		}
	};

	sendRemark = remark => {
		LOGGER.log(TAG => console.log(TAG, remark));
		const { handleAddRemark } = this.props;
		API.APPROVALS.addRemark(remark).then(({ status, error, data }) => {
			if (status) {
				handleAddRemark(data);
				this.commentTextArea.current.value = "";
				this.setState({
					hasAttachment: false,
					attachment: null,
					attachments: [],
					attachmentPath: [],
				});
			} else alert("Server Said " + error);
		});
	};

	doSendRemark = (approval, remark) => {
		API.APPROVALS.addRemark({
			...remark,
			approval_id: approval.approval_id,
			module: approval.referenceType,
			attachments: [],
		})
			.then(({ status, error }) => {
				if (status) {
					this.props.onSuccess({
						isOpen: true,
						Message: `Successfully ${
							remark.status === 2 ? "Approved" : "Declined"
						}`,
						variant: "success",
					});
					this.clearItem(approval);
				} else {
					alert("Error : " + error);
				}
			})
			.catch(error => {
				console.log("Error : " + error);
			});
	};

	clearItem = ({ id }) => {
		const { approvals } = this.state;
		for (let i = 0; i < approvals.length; i++) {
			const approval = approvals[i];
			if (approval.id === id) {
				approvals.splice(i, 1);
				this.setState({ approvals: [...approvals] });
				break;
			}
		}
	};

	getApprovalDetail = ({ referenceType, details }) => {
		console.log(details);
		switch (referenceType) {
			case 113 || 114 || 115 || 116 || 136 || 137 || 138 || 139: //Expense
				return (
					<React.Fragment>
						<div className="text">
							{JSON.parse(details).category}
						</div>
						<div className="text">
							{JSON.parse(details).description}
						</div>
					</React.Fragment>
				);
			case 2: //Travel
				return (
					<React.Fragment>
						{/*<div className="text">{JSON.parse(details).name}</div>*/}
						{/*<div className="text">{JSON.parse(details).description}</div>*/}
					</React.Fragment>
				);
			case 143: //Leave
				return (
					<React.Fragment>
						<div className="text">
							{JSON.parse(details).leaveType}
						</div>
						<div className="text">
							{JSON.parse(details).description}
						</div>
					</React.Fragment>
				);
			case 89: //Document
				return (
					<React.Fragment>
						<div className="text">{JSON.parse(details).name}</div>
						<div className="text">
							{JSON.parse(details).description}
						</div>
					</React.Fragment>
				);
			default:
		}
	};

	handleAddRemark(finalRemarks, amount, internalAttacment) {
		const { approval, reference_type } = this.props;
		const { remarkStatus, hasAttachment, attachment, attachments } =
			this.state;
		const remark = {
			approval_id: approval.approval_id,
			module: reference_type,
			remarks:
				finalRemarks !== undefined
					? finalRemarks
					: this.commentTextArea.current.value,
			status: remarkStatus,
			amount: amount,
			attachments:
				attachments.length > 0
					? attachments.map(x => {
							return { attachment_id: x.attachment_id };
					  })
					: attachments,
		};
		remark.attachments =
			internalAttacment.length > 0
				? [
						...remark.attachments,
						...internalAttacment.map(x => {
							return { attachment_id: x.attachment_id };
						}),
				  ]
				: [...remark.attachments];

		if (hasAttachment) {
			API.FILES.upload([attachment]).then(({ status, error, data }) => {
				if (status) {
					remark.attachments = [
						{ attachment_id: data[0].attachment_id },
					];
					this.setState({
						remarkDone: true,
					});
					this.sendRemark(remark);
				} else alert(error);
			});
			console.log(remark);
		} else {
			if (remarkStatus !== STRINGS.TYPES.STATUS.IN_PROCESS) {
				this.setState({
					remarkDone: true,
				});
			}
			console.log(remark);
			this.sendRemark(remark);
		}
	}

	close = () => {
		this.setState({
			isDialogOpen: false,
			isAgentDialogOpen: false,
		});
	};

	render() {
		const {
			approvals,
			isDialogOpen,
			approval,
			action,
			isAgentDialogOpen,
			actionName,
			loading,
		} = this.state;
		const { counter } = this.props;
		return (
			<div className="toggle-menu a">
				{/* <ApprovalRemarksDialog
                    isDialogOpen={isDialogOpen}
                    cancel={this.close}
                    approval={approval}
                    action={action}
                    text={"Type your remarks"}
                    handleAddComment={this.handleApprovalRemarks}
                /> */}
				{/* <FormDialog
					isDialogOpen={isAgentDialogOpen}
					cancel={this.close}
					action={action}
					text={""}
					isAgent
					actionName={actionName}
					handleAccept={this.handleAddRemark}
				/> */}
				<div className="toggle-label" style={{ margin: "0px 2px" }}>
					<i className="ic-check-badge" />
					<span style={{ margin: counter && "6px -1px 18px -6px" }}>
						{counter > 0 && (
							<Badge
								className="site-badge-count-109"
								count={counter}
								dot={true}
							></Badge>
						)}
					</span>
				</div>
				<div className="toggle-panel">
					<div className="toggle-board">
						<div className="board-header">
							<div className="board-label">Approvals</div>
							<div className="board-setting">
								<NavLink
									className="anc"
									to={STRINGS.ROUTES.APPROVALS.DEFAULT}
									onClick={_ => {
										$(".toggle-menu").removeClass("on");
										$(".nav").css({ "z-index": 0 });
										// this.handleCloseNotificationBar
									}}
								>
									See All
								</NavLink>
							</div>
						</div>
						<div
							ref={this.approvalsHolder}
							className="board-body ov-des"
						>
							{
								approvals.length > 0 &&
									approvals.map(approval => {
										const {
											approval_id,
											requester,
											createDate,
											message,
											ref_no,
										} = approval;
										return (
											<div
												key={approval_id}
												className="notification app"
												onClick={() =>
													this.handleApprovalClick(
														approval
													)
												}
											>
												<div className="icon">
													<Avatar
														src={
															requester.profile_picture
														}
														name={requester.name}
														round={true}
														height={54}
														width={54}
														active={
															requester.userStatus !==
															0
														}
													/>
												</div>
												<div className="detail">
													<div className="text">
														<span>
															<Link
																to={`${STRINGS.ROUTES.USER.TIMELINE.DEFAULT}/${requester.id}`}
																onClick={_ => {
																	$(
																		".toggle-menu"
																	).removeClass(
																		"on"
																	);
																	$(
																		".nav"
																	).css({
																		"z-index": 0,
																	});
																}}
															>
																{requester.name}
															</Link>
														</span>
														{message}
													</div>
													<div className="detail-btm">
														<div className="time">
															{getRelativeTime(
																createDate
															)}
															<span>
																{ref_no}
															</span>
														</div>
														{approval.referenceType !==
														144 ? (
															<div className="type-inputs">
																<div
																	className={`ic-txt-btn sc`}
																	//  onClick={e => {
																	//      this.handleApprovalActionClick(approval, 2);
																	//      e.stopPropagation()
																	//  }}
																>
																	Accept
																</div>
																<div
																	className={`ic-txt-btn dg`}
																	//  onClick={e => {
																	//      this.handleApprovalActionClick(approval, 3);
																	//      e.stopPropagation()
																	//  }}
																>
																	Decline
																</div>
															</div>
														) : (
															<div className="d-flex w-100 justify-content-end">
																<div className="short-msg-box aware">
																	{
																		STRINGS
																			.TYPES
																			.MESSAGES
																			.WAITING_FOR_APPROVAL
																	}
																</div>
															</div>
														)}
													</div>
												</div>
											</div>
										);
									})
								// : (<div className="note">You Have No Approvals.</div>)
							}
							{loading && (
								<div className="note">
									<Spin size="small" />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Approvals;
