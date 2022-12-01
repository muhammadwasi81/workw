import styled from "styled-components";

export const FormLabel = styled.div.attrs(props => ({
	style: {
		flexDirection: props.direction === "ltr" ? "flex-start" : "flex-end",
	},
}))``;
