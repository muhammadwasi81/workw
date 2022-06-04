import styled, {css} from 'styled-components'

const MainContainer = styled.div`
    background: #202124;
    width: 100%;
    height: 100%;
    padding: 15px;
`
const MainSection = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 16px;
    position: relative;
    box-sizing: border-box;
`
const MainFooter = styled.div`
    width: 100%;
    height: auto;
    padding: 12px 0 12px 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: inherit;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`
const MainOptionView = styled.div`
    min-width: 25%;
    width: 25%;
    height: 100%;
    right: 0;
    border-radius: inherit;
    /*background: rgba(0, 0, 0, 0.5);*/
    margin: 15px;
`
const BottomView = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    align-items: end;
    color: white;
`
const CallLabelView = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    box-sizing: border-box;
    font-size: 22px;
    p {
        margin: 0;
        padding: 6px;
    }
`
const CallVideoView = styled.div`
    width:100%;
    border-radius: inherit;
    height: 100%;
    position: relative;
`

const MainCallView = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: inherit;
    display: grid;
    grid-gap: 10px;
    ${props => props.col && css`
        grid-template-columns: repeat(${props.col}, 1fr);
    `}
`
const CallView = styled.div``

const InComingCallModel = styled.div`
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
`;
const InComingCallView = styled.div`
    background: white;
    width: auto;
    position: absolute;
    left: calc(50% - 200px);
    top: 100px;
    z-index: 9999;
    border-radius: 16px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    display: flex;
    padding: 15px;
    align-items: center;
`;
const Text = styled.div`
    font-family: inherit;
    font-size: medium;
    font-weight: normal;
`;
const Heading1 = styled(Text)`
    font-size: 24px;
`;
const Heading3 = styled(Text)`
    font-size: 16px;
`;
const Button = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const ButtonIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    ${props => props.positive ? css`background: #42b72a;` : props.negative ? css`background: #f03f27;` : css`background: #6c6e74;`}
    transition: background-color 0.2s ease-in-out;
`;
const ButtonLabel = styled.p`
    margin: 0;
    padding: 0;
    margin-top: 5px;
`;

export {
    MainContainer,
    MainSection,
    MainFooter,
    MainCallView,
    MainOptionView,
    BottomView,
    CallView,
    CallVideoView,
    CallLabelView,
    InComingCallModel,
    InComingCallView,
    Heading1,
    Heading3,
    Button,
    ButtonIcon,
    ButtonLabel
}