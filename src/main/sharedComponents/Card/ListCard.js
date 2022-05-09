import React from 'react';
import { NavLink } from 'react-router-dom';
import MyImg from '../../../content/images/demos/elements/image.jpg';
import { getNameForImage, STRINGS } from '../../../utils/base';

const Card = () => {
    let data = [
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
        {
            profile_picture: "https://konnect.im/upload/2021/3/5325454b-1c5d-40f1-b95d-df0fad2d4da9.jpeg",
            name: "Abu Bakar"
        },
    ]
    return (
        <NavLink className="CardListItem" to={`${STRINGS.ROUTES.PROJECT.NEWS}/12323`}>
            <div className="cardImageHolder" >
                <img src={MyImg} alt="testing"/>
            </div>
            <div className="cardDescHolder">
                <div className="cardTitle">
                    Miletap Pvt Ltd.
                </div>
                <div className="cardDesc">
                    This is Group description This is Group description This is Group description This is Group description
                </div>
                <div>
                    <div>


                        <div className="SummaryMembers" style={{ margin: "auto" }}>
                            <div className="mem">
                                {data.map((val, i) => {
                                    if (i > 2) return "";
                                    return val.profile_picture ? (
                                        <div key={`grpmem${i}`} className="us-img" style={{
                                            backgroundImage: `url(${val.profile_picture})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '100% 100%'
                                        }} />
                                    ) : (
                                        <div key={`grpmem${i}`} className="us-img">{getNameForImage(val.name)}</div>
                                    );
                                })}
                                {data ? data.length > 2 ?
                                    <div className="us-img">{data && data.length - 2}+</div> : "" : null}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default Card;