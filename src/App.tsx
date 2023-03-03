import "./App.css";
import { useRef } from "react";

function App() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const openFlashLight = async () => {
        if (videoRef.current !== null) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: { exact: "environment" },
                    },
                })
                .then(async (stream) => {
                    // @ts-ignore
                    videoRef.current.srcObject = stream;
                    const track = stream.getVideoTracks()[0];
                    await track.applyConstraints({ torch: true });
                    console.log(track.getSettings().torch); // true
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <div className="App">
            <button onClick={openFlashLight}>On/off</button>
            <video ref={videoRef} autoPlay playsInline></video>
        </div>
    );
}

export default App;
