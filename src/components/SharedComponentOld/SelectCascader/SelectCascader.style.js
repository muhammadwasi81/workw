import { Cascader } from "antd";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";

export const Container=styled.div`
width:100%;
position:relative`

export const CustomSearch=styled.p`
position:absolute;
right:0px;
top:5px;
z-index:2;
&:focus{
    border: none;
    border-color: white;
    outline: none;
}
`