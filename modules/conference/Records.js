import React, { Component } from 'react'
import { Text, View } from 'react-native'
// import { AudioRecorder, AudioUtils } from 'react-native-audio'
// import Sound from 'react-native-sound'
import Camera from 'react-native-camera'

// const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac'

// // const whoosh = new Sound(audioPath)
// // whoosh.play()

// AudioRecorder.prepareRecordingAtPath(audioPath, {
//   SampleRate: 22050,
//   Channels: 1,
//   AudioQuality: "Low",
//   AudioEncoding: "aac"
// })

// setTimeout(() => {
//   AudioRecorder.stopRecording()
// }, 2000)

// AudioRecorder.startRecording()

// AudioRecorder.onProgress = data => {
//   debugger
// }



class Home extends Component {

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        aspect={Camera.constants.Aspect.fill}>
        <Text onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
      </Camera>
    )
  }
}

export default Home