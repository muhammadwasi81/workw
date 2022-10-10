import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";
const style = {
	// height: 30,
	border: "1px solid green",
	// margin: 6,
	// padding: 8,
};

export default class Scroll extends React.Component {
	state = {
		page: 1,
		height: "100%",
		// items: Array.from({ length: 20 }),
	};

	componentDidMount() {
		//set height
		console.log(
			"dsfdsf",
			document.getElementsByClassName("scroll_dropdown")[0].offsetParent
				.offsetHeight
		);
		this.setState({
			height: document.getElementsByClassName("scroll_dropdown")[0]
				.offsetParent.offsetHeight,
		});
	}

	fetchMoreData = () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		// setTimeout(() => {
		// 	this.setState({
		// 		items: this.state.items.concat(Array.from({ length: 20 })),
		// 	});
		// }, 1500);

		//increase the number of page by 1
		// console.log("fetch more data");
		this.setState({
			page: this.state.page + 1,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.page !== this.state.page) {
			// console.log("callback");
			this.props.fetchMoreData(this.state.page);
		}
		// if (
		// 	JSON.stringify(prevProps.data) !==
		// 		JSON.stringify(this.props.data) &&
		// 	this.props.data?.length > 0
		// ) {
		// 	this.fetchMoreData();
		// }
	}

	render() {
		return (
			<div className="scroll_dropdown">
				<InfiniteScroll
					dataLength={this.props.data.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<h4>Loading...</h4>}
					height={this.state.height}
					endMessage={
						<p style={{ textAlign: "center" }}>
							<b>Yay! You have seen it all</b>
						</p>
					}
				>
					{this.props.children}
				</InfiniteScroll>
			</div>
		);
	}
}
