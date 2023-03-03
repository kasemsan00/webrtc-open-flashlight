import "./App.css";
import { useRef } from "react";

function App() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const openFlashLight = () => {
        if (videoRef.current !== null) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: { exact: "environment" },
                    },
                })
                .then((stream) => {
                    // @ts-ignore
                    videoRef.current.srcObject = stream;
                    const track = stream.getVideoTracks()[0];
                    videoRef.current?.addEventListener("loadedmetadata", (e) => {
                        window.setTimeout(() => onCapabilitiesReady(track.getCapabilities()), 500);
                    });

                    function onCapabilitiesReady(capabilities: any) {
                        if (capabilities.torch) {
                            // @ts-ignore
                            track.applyConstraints({ advanced: [{ torch: true }] }).catch((e) => console.log(e));
                        }
                    }
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
