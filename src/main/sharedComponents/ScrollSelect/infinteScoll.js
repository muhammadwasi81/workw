import { Button } from "antd";
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
			"parent height ",
			document.getElementsByClassName("scroll_dropdown")[0].offsetParent
				.offsetHeight
		);
		this.setState({
			height: document.getElementsByClassName("scroll_dropdown")[0]
				.offsetParent.offsetHeight,
		});
	}

	fetchMoreData = () => {
		this.setState({
			page: this.state.page + 1,
		});
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevState.page !== this.state.page) {
			this.props.fetchMoreData(this.state.page);
		}
	}

	hasMoreData = () => {
		if (this.props.data.length - 20 * (this.state.page - 1) > 19) {
			return true;
		}
		return false;
	};

	//jab loading na ho or hasmore true ho

	render() {
		return (
			<div className="scroll_dropdown " id="scrollableDiv">
				<InfiniteScroll
					dataLength={this.props.data.length}
					next={this.fetchMoreData}
					hasMore={this.hasMoreData()}
					inverse={this.props.inverse || false}
					loader={
						(
							<>
								{this.props.loader}
								{!this.props.isLoading && this.hasMoreData() && (
									<div className="flex justify-center">
										<Button
											className="ThemeBtn"
											loading={this.props.isLoading}
											onClick={this.fetchMoreData}
										>
											Load More
										</Button>
									</div>
								)}
							</>
						) || (
							<p
								style={{
									textAlign: "center",
								}}
							>
								<b>Loading...</b>
							</p>
						)
					}
					height={this.state.height}
					endMessage={
						!this.props.isLoading &&
						!this.hasMoreData() && (
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
