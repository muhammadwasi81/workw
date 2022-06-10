import styled from "styled-components";

const Styles = {
    ItemWrapper: styled.div`
        display: flex;
        align-items: center;
    `,
    Avatar: styled.img`
        width: 24px;
        height: 24px;
        box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 50%;
        margin-right: 8px;
    `,
    Detail: styled.div`
        display: flex;
        flex-direction: column;
    `,
    UserName: styled.div`
        font-size: 14px;
    `,
    UserDesignation: styled.div`
        font-size: 12px;
    `,
}

function MentionUserItem({avatar, name, designation}) {

    const {ItemWrapper, Avatar, Detail, UserName, UserDesignation} = Styles;

    return (
        <ItemWrapper>
            <Avatar src={avatar} alt={name}/>
            <Detail>
                <UserName>{name}</UserName>
                <UserDesignation>{designation}</UserDesignation>
            </Detail>
        </ItemWrapper>
    )

}

export default MentionUserItem