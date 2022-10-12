import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import NewCustomSelect from '../../../../sharedComponents/CustomSelect/newCustomSelect';
import SingleUpload from "../../../../sharedComponents/Upload/singleUpload";

const UploadByDrop = ({ isOpen, handleClose, fileList }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(isOpen)
    }, [isOpen])
    return (
        <>
            <Modal
                title="Upload Documents"
                centered
                visible={visible}
                // onOk={() => setVisible(false)}
                onCancel={handleClose}
                width={1000}
                okText={"upload"}
            >
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                    {/* {isProcess && <Spinner/>} */}
                    {fileList.length !== 0 && fileList.map((item, ind) => (
                        <div key={ind}
                            style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "6px 17px",
                                marginBottom: "5px",
                                border: "1px solid #e7e7e7",
                                borderRadius: "6px"
                            }} >
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                padding: "14px 13px 0px 10px"
                            }}>

                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "6px",
                                    marginLeft: "2px",
                                    position: "relative"
                                }}>
                                    <div style={{ display: "flex", width: "155px", color: "#444444" }}>File Name
                                    </div>
                                    <div style={{
                                        width: "340px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>{item.name}</div>
                                    <div style={{ display: "flex", marginLeft: 18 }}>
                                        <div style={{
                                            padding: "2px 8px",
                                            borderRadius: "6px",
                                            marginRight: "10px",
                                            fontSize: '14px',
                                            fontWeight: "900",
                                            color: "#3a3a3a",
                                            cursor: "pointer",
                                            backgroundColor: item.isPublic === 1 ? "#abecf373" : "white"
                                        }}
                                        //  onClick={() => onChangePrivacy(1, ind)}
                                        >
                                            Public
                                            {/* <PublicSharpIcon fontSize="small"/> */}
                                        </div>
                                        <div style={{
                                            backgroundColor: item.isPublic === 2 ? "#ffa5a573" : "white",
                                            padding: "2px 8px",
                                            borderRadius: "6px",
                                            fontSize: '14px',
                                            fontWeight: "900",
                                            color: "#3a3a3a",
                                            cursor: "pointer"
                                        }}
                                        //  onClick={() => onChangePrivacy(2, ind)}
                                        >
                                            Private
                                            {/* <HttpsOutlinedIcon fontSize="small"/> */}
                                        </div>
                                    </div>
                                    <div style={{ position: "absolute", right: "-129px", top: "-20px" }}
                                    //  onClick={() => onDeleteItem(ind)}
                                    >
                                        X
                                        {/* <HighlightOffRoundedIcon/> */}
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
                                    <div
                                        style={{ display: "flex", width: "155px", color: "#444444" }}>Description:
                                    </div>
                                    <input
                                        style={{
                                            border: "1px solid #e7e7e7",
                                            width: "80%",
                                            height: "30px",
                                            padding: "0 4px"
                                        }}
                                        placeholder={"Short Description (max 100 charaters)"}
                                    // onChange={(e) => onChangeHandler(e, ind)}
                                    />
                                </div>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                                    <div style={{ display: "flex", width: "155px", color: "#444444" }}>Select
                                        Approvals:
                                    </div>
                                    <div style={{ display: "flex", width: "80%" }}>
                                        {/* <SearchableUserAndDep
                                        label={false}
                                        multiple={true}
                                        placeholder="Select Approvers"
                                        selectedUsers={[]}
                                        searchEnable={true}
                                        index={ind}
                                        onChangeApprovalHandler={onChangeApprovalHandler}
                                    /> */}
                                        <NewCustomSelect
                                            name="approvers"
                                            label={"Approvers"}
                                            showSearch={true}
                                            // direction={Direction}
                                            mode="multiple"
                                            endPoint="api/Reference/GetAllUserReference"
                                            requestType="get"
                                            placeholder={"Approvers"}
                                        />
                                    </div>
                                </div>
                                {item.isPublic === 2 &&
                                    <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
                                        <div style={{ display: "flex", width: "155px", color: "#444444" }}>Select
                                            Readers:
                                        </div>
                                        <div style={{ display: "flex", width: "80%" }}>
                                            {/* <SearchableInput
                                        label={false}
                                        multiple={true}
                                        placeholder="Select Reader"
                                        index={ind}
                                        onChangeReaderHandler={onChangeReaderHandler}
                                        selectedUsers={[]}
                                    /> */}
                                        </div>
                                    </div>}
                                {/* <div style={{display: "flex", alignItems: "center", marginBottom: "6px"}}>
                                <div style={{display: "flex", width: "155px", color: "#444444"}}>Select
                                    Privacy:
                                </div>
                                <div style={{display: "flex", width: "80%"}}>
                                    <div style={{
                                        padding: "2px 8px",
                                        borderRadius: "6px",
                                        marginRight: "10px",
                                        fontSize: '14px',
                                        fontWeight: "900",
                                        color: "#3a3a3a",
                                        cursor: "pointer",
                                        backgroundColor: item.isPublic === 1 ? "#abecf373" : "white"
                                    }}
                                         onClick={() => onChangePrivacy(1, ind)}>
                                        Public <PublicSharpIcon fontSize="small"/>
                                    </div>
                                    <div style={{
                                        backgroundColor: item.isPublic === 2 ? "#ffa5a573" : "white",
                                        padding: "2px 8px",
                                        borderRadius: "6px",
                                        fontSize: '14px',
                                        fontWeight: "900",
                                        color: "#3a3a3a",
                                        cursor: "pointer"
                                    }}
                                         onClick={() => onChangePrivacy(2, ind)}>
                                        Private <HttpsOutlinedIcon fontSize="small"/>
                                    </div>
                                </div>
                            </div>*/}
                            </div>

                            {item.src && <img src={item.src} width={100} height={100} alt={""} />}

                            {/* {item.type === STRINGS.TYPES.ATTACHMENTS.PDF ?  <img src={ic_pdf} width={100} height={100}  alt={""}/>:
                            item.type === STRINGS.TYPES.ATTACHMENTS.WORD ?   <img src={ic_word} width={100} height={100}  alt={""}/>:
                                item.type === STRINGS.TYPES.ATTACHMENTS.EXCEL ?  <img src={ic_excel} width={100} height={100}  alt={""}/> :
                                    item.type === STRINGS.TYPES.ATTACHMENTS.PPT ? <img src={ic_ppt} width={100} height={100}  alt={""}/> :
                                            item.type === STRINGS.TYPES.ATTACHMENTS.VIDEO ? <img src={videoImg} width={100} height={100}  alt={""}/>: ""} */}
                           
                        </div>
                    )
                    )}</div>
 <SingleUpload
                                handleImageUpload={() => { }}
                                img="Add Image"
                                position="flex-start"
                                uploadText={"Upload"}
                                defaultFile={fileList}
                                url={fileList[0]?.src}
                                // url={"blob:http://localhost:3000/22c8f19c-99ba-40eb-a14c-f42f8c829eff"}
                            />
            </Modal>
        </>
    );
};

export default UploadByDrop;