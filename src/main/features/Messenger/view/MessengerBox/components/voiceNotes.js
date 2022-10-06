import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import voiceGreyIcon from "../../../../../../content/NewContent/Messenger/voiceGrey.svg";
import voiceRedIcon from "../../../../../../content/NewContent/Messenger/voiceRed.svg";
import pauseRedIcon from "../../../../../../content/NewContent/Messenger/pauseRed.svg";
import recordIcon from "../../../../../../content/NewContent/Messenger/record.png";

function VoiceNotes(props) {
    useEffect(() => {
    }, []);
    function blobToFile(theBlob, fileName) {
        //A Blob() is almost a File() - it's just missing the two properties below which we will add
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }
    const onStartRecording = (e) => {
        // console.log(e, "Start Recording")
    }
    const onStopRecording = (blobURL, blob) => {
        console.log(blobToFile(blob, "Voice"), "Stop Recording");
    }
    const { status, startRecording, stopRecording, mediaBlobUrl, pauseRecording } =
        useReactMediaRecorder({ audio: true, onStart: onStartRecording, onStop: onStopRecording });

    return (
        <div style={{
            display: "flex", backgroundColor: "rgb(244, 244, 244)", borderRadius: "7px",
            height: "40px", alignItems: "center"
        }} >
            <p>{status}</p>
            {status === "recording" && <div style={{ display: "flex", alignItems: "center" }} >
                <img style={{ height: "15px", margin: "0 0px 0 10px" }} src={recordIcon} />
                <div style={{ margin: "0 20px 0 10px" }}>00.02</div>
                {/* <button onClick={pauseRecording}>
                    <img src={pauseRedIcon} style={{ height: "22px", margin: "0 10px" }} />
                </button> */}
                <button onClick={stopRecording}>
                    <img src={voiceRedIcon} style={{ height: "22px", margin: "0 10px" }} />
                </button>
            </div>}

            {/* {(status === "paused" || status === "stopped") &&
                <audio style={{ height: "14px" }} src={mediaBlobUrl} controls autoPlay loop />
            } */}

            {status !== "recording" &&
                <img className='actionBtn' onClick={startRecording} src={voiceGreyIcon} style={{ height: "22px", margin: "0 10px" }} />
            }
        </div>
    )
}
export default VoiceNotes;
