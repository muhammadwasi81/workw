import styled from "styled-components";

export const Heading = styled.h1`
    font-size: 32px;
    text-align: center;
    font-weight: 600;
`

export const MainContainer = styled.div`
    width: 100%;
    max-width: 650px;
    margin: auto;
    overflow-y: scroll; 
    flex-direction: column;
    margin-top: 18px;
    margin-top: 10px;
`;


export const FormContainer = styled.div`
    width: 100%;
    max-width: 650px;
    margin: auto;
    padding: 10px 15px;
    border-radius: 10px;
    border-top: 10px solid var(--currentThemeColor);
    background: #ffffff;
    min-height: fit-content;
    overflow-y: scroll;
    margin-bottom: 10px;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: 18px;
    margin-top: 10px;
`;


export const AddCourseBox = styled.div`
    display: flex;
    justify-content: space-between
`;