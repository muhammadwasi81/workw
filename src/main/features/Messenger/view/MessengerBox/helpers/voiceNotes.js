import { useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

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
        // console.log(URL.createObjectURL(e))
        // let blob = await fetch(e).then(r => r.blob());
        console.log(blob, "Stop Recording");

        // const myBlob = new Blob(e);
        // console.log(myBlob, "ROW BLOB", "Start Recording")
        // console.log(blobToFile(e, "my-image.png"), "Start Recording")
    }
    const { status, startRecording, stopRecording, mediaBlobUrl, } =
        useReactMediaRecorder({ screen: true, onStart: onStartRecording, onStop: onStopRecording, });
    return (
        <div style={{ display: "flex" }} >
            <div style={{ display: "flex" }} >
                <p>{status}</p>
                <button onClick={stopRecording}>Stop Recording</button>
                {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
            </div>
            <button onClick={startRecording}>Start Recording</button>
        </div>
    )
}
export default VoiceNotes;
