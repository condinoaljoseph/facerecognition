import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '9595e11872614a4fb064f4d5f287b26c'
});

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: []
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions.map(region => {
      return region.region_info.bounding_box;
    });
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceLocations = clarifaiFace.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height
      };
    });

    return faceLocations;
  };

  displayFaceBox = boxes => {
    this.setState({ boxes: boxes });
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className='App'>
        <Particles params={particleOptions} className='particles' />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        <FaceRecognition
          imageURL={this.state.imageURL}
          boxes={this.state.boxes}
        />
      </div>
    );
  }
}

export default App;
