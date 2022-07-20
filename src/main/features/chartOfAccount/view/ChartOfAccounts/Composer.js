import React, { Component } from 'react';
import { getUserDataFromStorage, setAutoHeightOfInput, STRINGS, } from "../../../utils/base";
import $ from "jquery";
import { API } from "../../../utils/services";
import CustomizedSnackbars from '../../snackbar/CustomizedSnackbars';
import { Index as SearchableUserAndDep } from "../../searchableUserAndDepartment";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import ReactQuill from "react-quill";
//import {Index as SearchableInput} from "../searchableinput";
// import { Index as DatePicker } from "../datepicker";

class COA_Composer extends Component {
    selectedMembers = [];
    accountTypes = [{ value: 1, label: "Asset" }, { value: 2, label: "Liability" }, { value: 3, label: "Capital" }, { value: 4, label: "Revenue" }, { value: 5, label: "Expense" }, { value: 6, label: "Cost of Good Sold" }]
    parentAccounts = []
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            Message: '',
            variant: 'error',
            isRequestPending: "",
            accountType: "",
            name: "",
            description: "",
            pId: ""
        };
    }

    componentDidMount() {
        this.initialize();
        $('.section').css('overflow', 'hidden');
        $('.chatSideBar').css('z-index', '0');

        $(document).ready(() => {
            $(document).on("click", (e) => {
                if ($(".content").is(e.target)) {
                    this.props.onClose()
                }
            });
        });
    }

    initialize() {
        // $(this.txtDescription.current).on('keydown', e => setAutoHeightOfInput($(e.target), 20));
    }

    componentWillUnmount() {
        $('.section').css('overflow-y', 'auto');
        $('.chatSideBar').css('z-index', '1');
    }

    handleCreateSubmit = () => {
        const { name, description, accountType, pId } = this.state;
        const { onSuccess } = this.props;
        const obj = {
            name,
            description,
            accountType,
            pId
        };
        console.log("selectedType", obj)
        const validRequest = this.validateRequest(obj);
        if (!validRequest.error) {
            this.setState({ isRequestPending: true })
            API.FINANCE.CHART_OF_ACCOUNT.addChartOfAccount(obj).then(({ status, error, data }) => {
                if (status) {
                    // this.props.onCreate(data);
                    this.setState({ isRequestPending: false });
                    onSuccess(data);
                } else {
                    this.setState({ isRequestPending: false, isOpen: true, Message: error, variant: 'error' });
                }
            }).catch((error) => {
                this.setState({ isRequestPending: false, isOpen: true, Message: error.message, variant: 'error' });
            })
        } else {
            this.setState({ isOpen: true, Message: validRequest.message });
        }
    };

    cancel = () => {
        this.setState({ isOpen: false })
    };

    validateRequest = (data) => {
        const valid = { error: false, message: "" };
        if (data.name === "") {
            valid.error = true;
            valid.message = "Name required."
        }
        if (data.accountType === "") {
            valid.error = true;
            valid.message = "Account Type required."
        }
        return valid
    };

    handleChangeCategory = ({ target }) => {
        console.log(target);
        this.setState({ selectedType: target.value });
    };

    render() {
        const { isRequestPending, isOpen, variant, Message, name, description, accountType, pId } = this.state;
        const { onClose } = this.props;
        console.log(this.props.allAccounts)
        console.log(accountType)
        return (
            <div className="md-rt">
                <div className="content">
                    <div>
                        <CustomizedSnackbars
                            isOpen={isOpen}
                            cancel={this.cancel}
                            variant={variant}
                            message={Message}
                            duration={2000}
                        />
                    </div>
                    <div className="cnt-main">
                        {isRequestPending ? (
                            <div className="spin-holder">
                                <div className="spinner" />
                            </div>
                        ) : ""}
                        <div className="cnt-header">
                            <div className="close" onClick={onClose}>
                                <i className="ic-cutBlack" />
                            </div>
                            <div className="label">Create Account</div>
                        </div>
                        <div className="cnt-body">
                            <div className="frm">
                                <div className="inputs">
                                    <div className="inp">
                                        <input type="text" placeholder="Name"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                    </div>
                                    <div className="inp">
                                        <textarea placeholder="Description"
                                            onChange={(e) => this.setState({ description: e.target.value })} />
                                    </div>
                                    <div className="row">
                                        <div className="label">Account Type</div>
                                        <div className="dt-inp">
                                            <TextField
                                                name="Choose your Category"
                                                select
                                                required
                                                fullWidth={true}
                                                label={'Select Type'}
                                                variant="outlined"
                                                value={accountType}
                                                onChange={(e) => this.setState({ accountType: e.target.value })}
                                                style={{ fontSize: 10 }}
                                                SelectProps={{
                                                    MenuProps: {
                                                        // className: classes.menu,
                                                    },
                                                }}
                                                margin="normal">
                                                {/* <MenuItem disabled={true}>Select Type</MenuItem> */}
                                                {this.accountTypes.map((option, ind) => (
                                                    <MenuItem key={ind} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="label">Parent Account</div>
                                        <div className="dt-inp">
                                            <TextField
                                                name="Choose your Category"
                                                select
                                                required
                                                fullWidth={true}
                                                label={'Select Account'}
                                                variant="outlined"
                                                value={pId}
                                                onChange={(e) => this.setState({ pId: e.target.value })}
                                                style={{ fontSize: 10 }}
                                                margin="normal">
                                                {this.props.allAccounts.filter(item => item.accountTypeId == accountType).map((option, ind) => (
                                                    <MenuItem key={ind} value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                    </div>
                                </div>

                                <div className="frm-btm">
                                    {/* <div className="row">
                                        <div className="label">Approvers</div>
                                        <div className="dt-inp">
                                            <SearchableUserAndDep label={false} multiple={true}
                                                                  defaults={[getUserDataFromStorage(STRINGS.STORAGE.manager_id)]}
                                                                  // defaultApprovalType={STRINGS.TYPES.DEFAULT_APPROVALS.REWARD}
                                                                  selectedUsers={this.selectedMembers}/>
                                        </div>
                                    </div> */}

                                    <div className="row">
                                        <div className="action">
                                            <div className="btn" onClick={this.handleCreateSubmit.bind(this)}>Create</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default COA_Composer
