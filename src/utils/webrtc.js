export function getLocalMediaStream({audio, video}, callback) {
    const mediaDevicesUserMedia = navigator.mediaDevices.getUserMedia
    if (mediaDevicesUserMedia) {
        mediaDevicesUserMedia({audio, video}).then(stream => {
            callback({status: true, stream})
        }).catch(error => {
            callback({status: false, stream: null, error})
        })
    } else {
        callback({status: false, stream: null, error: "No Media Device Found"})
    }
}