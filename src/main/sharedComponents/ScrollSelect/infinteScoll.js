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

		// console.log(
		// 	"parent height ",
		// 	document.getElementsByClassName("scroll_dropdown")[0]?.offsetParent
		// 		?.offsetHeight
		// );
		this.setState({
			height: document.getElementsByClassName("scroll_dropdown")[0]
				?.offsetParent?.offsetHeight,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.data.length !== this.props.data.length &&
			this.state.page !== 1
		) {
			// console.log(
			// 	(this.state.page - 1) * 20 >= this.props.data.length,
			// 	"Yahoooo"
			// );
			// console.log(this.state.page, "Yahoooo page");
			// console.log(this.props.data.length, "Yahoooo length");

			//we have calculating data length to reset the page to 1
			if ((this.state.page - 1) * 20 >= this.props.data.length) {
				// console.log("true");
				this.setState({
					page: 1,
				});
			}
			// if (this.props.data.length - (this.state.page - 1) * 20 <= 20) {
			// 	this.setState({
			// 		page: 1,
			// 	});
			// }
		}

		if (prevState.page !== this.state.page) {
			this.props.fetchMoreData(this.state.page);
		}
	}

	fetchMoreData = () => {
		this.setState({
			page: this.state.page + 1,
		});
	};

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
					style={this.props.inverse ? { display: 'flex', flexDirection: 'column-reverse' } : {}}
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
						this.props.data.length > 0
							? !this.props.isLoading &&
							!this.hasMoreData() && (
								<p style={{ textAlign: "center" }}>
									<b>
										{this.props.endMessage ||
											"Yay! You have seen it all"}
									</b>
								</p>
							)
							: null
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
