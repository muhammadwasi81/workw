import { message, Spin, Typography } from "antd";
import React, { Component, Fragment } from "react";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { STRINGS } from "../../../utils/base";
import Avatar from "../Avatar/avatar";
// import Title from "antd/lib/skeleton/Title";
import { LoadingOutlined } from "@ant-design/icons";

class SuggestionBox extends Component {
	constructor(props) {
		super(props);
		const defaults = this.props.defaults
			? this.props.defaults.map(x => {
					return { ...x, isFixed: true };
			  })
			: [];
		this.state = {
			children: this.props.data ? [...this.props.data] : [],
			value: [...defaults],
			selected: [],
			loading: false,
			data: this.props.data,
			default: this.props.default,
			defaultDeletable: this.props.defaultDeletable,
			customTags: this.props.customTags,
			avatar: this.props.avatar,
			placeholder: this.props.placeholder,
			isLoading: false,
			custom: this.props.custom,
			name: this.props.name,
		};
	}

	validateEmail = mail => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		}
		// alert("You have entered an invalid email address!")
		return false;
	};
	onChange = (value, actionMeta, a, b, c) => {
		switch (actionMeta.action) {
			case "remove-value":
			case "pop-value":
				if (actionMeta.removedValue.isFixed) {
					return;
				}
				break;
			case "clear":
				value = this.state.children.filter(v => v.isFixed);
				break;
		}

		const newItems = value.filter(x => x.label === x.value);
		const existingData = value.filter(x => x.label !== x.value);

		for (let i = 0; i < newItems.length; i++) {
			if (this.validateEmail(newItems[i].label)) {
				newItems[i].id = STRINGS.DEFAULTS.guid;
			} else {
				message.error("not a valid email");
				newItems.splice(i, 1);
			}
		}
		this.setState({ value: [...existingData, ...newItems] }, () => {
			// console.log(this.state.value, "heloo world");
			this.props.onChange({
				value: this.state.value,
				name: actionMeta.name,
			});
		});
	};

	colourStyles = {
		control: (styles, state) => ({
			...styles,
			boxShadow: "none",
			border: state.isFocused && "1px solid #d9d9d9!important",
			minHeight: "38px",
		}),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: "white",
				"&:hover": {
					backgroundColor: "rgb(26, 86, 105)",
					color: "white",
				},
				color: "black",
				cursor: isDisabled ? "not-allowed" : "default",
			};
		},
		multiValueRemove: (base, state) => {
			return state.data.isFixed
				? { ...base, display: "none" }
				: {
						...base,
						backgroundColor: "rgb(26, 86, 105)",
						color: "white",
				  };
		},
		multiValueLabel: (base, state) => {
			return state.data.isFixed
				? {
						...base,
						backgroundColor: "rgb(26, 86, 105)",
						fontWeight: "bold",
						color: "white",
						paddingRight: 6,
				  }
				: {
						...base,
						backgroundColor: "rgb(26, 86, 105)",
						color: "white",
				  };
		},
		multiValue: (base, state) => {
			return { ...base, backgroundColor: "rgb(26, 86, 105)" };
		},
		valueContainer: (provided, state) => ({
			...provided,
			// height: '38px',
			padding: "0 6px",
			// alignItems:"center"
		}),

		input: (provided, state) => ({
			...provided,
			margin: "0px",
			padding: "0px",
		}),
		// indicatorSeparator: state => ({
		//   display: 'none',
		// }),
		// indicatorsContainer: (provided, state) => ({
		//   ...provided,
		//   height: '30px',
		// }),
	};
	componentDidMount() {}
	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({ children: this.props.data }, () => {
				this.setState({ isLoading: false });
				// console.log(this.state.value, "VALUE");
			});
			const list = [...this.state.value];
			const findVal = list.find(x => x.label === this.props.value);

			!findVal &&
				this.setState(
					{
						value: [
							...this.state.value,
							{ label: this.props.value },
						],
					}
					// console.log(this.state.value, "VALUE");
				);
		}
		// console.log(prevProps.defaults, "asdadas", this.props.defaults);
	}
	options = ({ children, ...props }) => {
		//    console.log(children,props)
		const { label } = props.data;
		if (this.state.avatar) {
			return (
				<components.Option {...props}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Avatar round name={label} width={33} height={33} />
						<span style={{ marginLeft: "10px" }}>{label}</span>
					</div>
				</components.Option>
			);
		} else {
			return <components.Option {...props}>{children}</components.Option>;
		}
	};
	loadmoreAction = () => {
		this.setState({ isLoading: true }, () => {
			this.props.action();
		});
	};

	menu = ({ children, ...props }) => {
		const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		return (
			<Fragment>
				<components.Menu {...props}>
					<div>{children}</div>

					{this.state.isLoading && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "50px",
							}}
						>
							Loading{" "}
							<Spin
								indicator={antIcon}
								style={{ marginLeft: "5px" }}
							/>
						</div>
					)}
				</components.Menu>
			</Fragment>
		);
	};
	render() {
		console.log("suggestion box", this.state.value);

		return this.state.custom ? (
			<CreatableSelect
				value={this.state.value}
				isMulti
				closeMenuOnSelect={false}
				onMenuScrollToBottom={this.loadmoreAction}
				name={this.state.name}
				className="basic-multi-select"
				classNamePrefix="select"
				onChange={this.onChange}
				placeholder={this.state.placeholder}
				options={this.state.children}
				components={{
					Option: this.options,
					Menu: this.menu,
					DropdownIndicator: () => null,
					IndicatorSeparator: () => null,
				}}
				styles={this.colourStyles}
				isClearable={false}
			/>
		) : (
			<Select
				value={this.state.value}
				isMulti
				closeMenuOnSelect={false}
				onMenuScrollToBottom={this.loadmoreAction}
				name={this.state.name}
				className="basic-multi-select"
				classNamePrefix="select"
				onChange={this.onChange}
				placeholder={this.state.placeholder}
				options={this.state.children}
				components={{ Option: this.options, Menu: this.menu }}
				styles={this.colourStyles}
				isClearable={false}
			/>
		);
	}
}

export default SuggestionBox;
