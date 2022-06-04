import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import attachmentIcon from "../../../../../../content/NewContent/Messenger/voiceNote.svg";
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
        console.log(blob, "Stop Recording");
    }
    const { status, startRecording, stopRecording, mediaBlobUrl, pauseRecording} =
        useReactMediaRecorder({ audio: true, onStart: onStartRecording, onStop: onStopRecording });
    return (
        <div style={{ display: "flex" }} >
            {status === "recording" && <div style={{ display: "flex" }} >
                {/* <p>{status}</p> */}
                <img style={{ height: "20px" }} src={recordIcon} />
                <div>00.02</div>
                <button onClick={pauseRecording}>pause</button>
                <button onClick={stopRecording}>Stop</button>
                {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
            </div>}
            <img className='actionBtn' onClick={startRecording} src={attachmentIcon} style={{ height: "25px", margin: "0 10px" }} />
        </div>
    )
}
export default VoiceNotes;
