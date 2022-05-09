import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./style.css";
const style = {
	height: 30,
	border: "1px solid green",
	margin: 6,
	padding: 8,
};

export default class Scroll extends React.Component {
	state = {
		items: Array.from({ length: 20 }),
	};

	fetchMoreData = () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		setTimeout(() => {
			this.setState({
				items: this.state.items.concat(Array.from({ length: 20 })),
			});
		}, 1500);
	};

	render() {
		return (
			<div className="scroll_dropdown">
				<InfiniteScroll
					dataLength={this.state.items.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<h4>Loading...</h4>}
					height={250}
				>
					{this.state.items.map((i, index) => (
						<div style={style} key={index}>
							div - #{index}
						</div>
					))}
				</InfiniteScroll>
			</div>
		);
	}
}
