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
		// const root = document.getElementById("app");
		// console.log("root", root);
		//set height
		console.log(
			"parent height ",
			document.getElementsByClassName("scroll_dropdown")[0].offsetParent
				.offsetHeight
		);
		this.setState({
			height: document.getElementsByClassName("scroll_dropdown")[0]
				.offsetParent.offsetHeight,
		});
		// this.setState({
		// 	height: document.getElementsByClassName("scroll_dropdown")[0]
		// 		.offsetHeight,
		// });
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
		console.log("fetch more data");
		this.setState({
			page: this.state.page + 1,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.page !== this.state.page) {
			// console.log("callback");
			this.props.fetchMoreData(this.state.page);
		}
	}

	hasMoreData = () => {
		if (this.props.data.length - 20 * (this.state.page - 1) > 19) {
			return true;
		}
		return false;
	};

	render() {
		return (
			<div className="scroll_dropdown " id="scrollableDiv">
				<InfiniteScroll
					dataLength={this.props.data.length}
					next={this.fetchMoreData}
					hasMore={true}
					inverse={this.props.inverse || false}
					loader={
						this.props.loader || (
							<p style={{ textAlign: "center" }}>
								<b>Loading...</b>
							</p>
						)
					}
					height={this.state.height}
					endMessage={
						!this.props.isLoading && (
							<p style={{ textAlign: "center" }}>
								<b>
									{this.props.endMessage ||
										"Yay! You have seen it all"}
								</b>
							</p>
						)
					}
					scrollThreshold={"100%"}
					scrollableTarget="scrollableDiv"
				>
					{this.props.children}
				</InfiniteScroll>
			</div>
		);
	}
}
