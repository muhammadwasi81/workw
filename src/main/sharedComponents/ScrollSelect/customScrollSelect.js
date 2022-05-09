import React from "react";
import { Select } from "antd";
import * as S from "../../features/employee/Styles/employee.style";
import PropTypes from "prop-types";
const Option = Select.Option;

class CustomScrollSelect extends React.Component {
	state = {
		children: [],
		loading: false,
	};
	componentDidMount() {}
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.value !== this.props.value && this.props.value) {
			this.setState({
				loading: false,
				children: [],
			});
		}
		if (
			JSON.stringify(prevProps.data) !==
				JSON.stringify(this.props.data) &&
			this.props.data.length > 0
		) {
			let tempArray = [];
			this.props.data.forEach(element => {
				tempArray.push(
					<Option value={element.id} key={element.id}>
						{element.name + " - " + element.country}
					</Option>
				);
			});

			this.setState({
				...this.state,
				loading: false,
				children: [...this.state.children, ...tempArray],
			});
		}
	}

	handleChange = value => {
		//console.log(`selected ${value}`);
	};

	onScroll = event => {
		var target = event.target;
		if (
			!this.state.loading &&
			target.scrollTop + target.offsetHeight === target.scrollHeight
		) {
			this.setState({ loading: true }, () => {
				target.scrollTo(0, target.scrollHeight);
				// this.props.fetchCities();
				// console.log("increase counter");
				this.props.onIncreaseCounter();
				setTimeout(() => {
					// console.log("timeout counter");
					// let children = [...this.state.children];
					//var length = children.length;
					// console.log("children", children);
					this.setState({ loading: false });
					// this.setState({ children: children }, () => {
					// 	// console.log("after add children");
					// });
				}, 1000);
			});
		}
	};

	render() {
		// console.log("this.", this.state.children);
		return (
			<S.FormItem
				name={this.props.name}
				label={this.props.label}
				direction={this.props.direction}
				rules={this.props.rules}
			>
				<Select
					getPopupContainer={trigger => trigger.parentNode}
					loading={this.props.loading}
					showSearch
					size={this.props.size}
					optionFilterProp="children"
					placeholder="Search to Select"
					onPopupScroll={this.onScroll}
					onSearch={e => {
						this.props.onSearch(e);
					}}
					value={this.props.value}
					// onChange={this.props.onCityChangeHandler}
					// inputValue={this.props.value}
					// defaultValue={this.props.value}
					// searchValue={this.props.value}
				>
					{!this.state.loading
						? this.state.children
						: [
								...this.state.children,
								<Option key="loading">Loading...</Option>,
						  ]}
				</Select>
			</S.FormItem>
		);
	}
}
export default React.memo(CustomScrollSelect);
CustomScrollSelect.propTypes = {
	onSearch: PropTypes.func.isRequired,
	size: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	direction: PropTypes.any.isRequired,
	rules: PropTypes.arrayOf(PropTypes.object).isRequired,
};
CustomScrollSelect.defaultProps = {
	size: "large",
	rules: [{ required: true }],
};
