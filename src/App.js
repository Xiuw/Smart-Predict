import React, { Component } from 'react';
import Clarifai from 'clarifai';
import {getFaceBoundry} from './getFaceBoundry';
import FrameBox from './FrameBox';
import './App.css';

const app = new Clarifai.App({
 apiKey: '96b6b6990bce404ea56ca1c12646b30e'
});

class App extends Component {
	constructor(){
		super();
		this.state = {
			input:'',
			picture:'',
			faceFrame:[]
		}
	}

    getAllFace = (data)=>{
    	// console.log(data);
		// const clarifaiFace = data.outputs[0].data.regions[1].region_info.bounding_box;
		const allFace = data.outputs[0].data.regions.map(face => face);
		this.setState({faceFrame:getFaceBoundry(allFace)});
		console.log(this.state.faceFrame);
		
	}
	
	onInputChange =(e)=>{
		this.setState({input:e.target.value});
	}
	onHandleSubmit=(e)=>{
		this.setState({picture:this.state.input});
		app.models.predict(
      	"c0c0ac362b03416da06ab3fa36fb58e3",
      	this.state.input)
      	.then(response => 
      		this.getAllFace(response)
      	)
      	.catch(err => console.log);
	}



  render() {
  	const{faceFrame, picture} = this.state;
  	
    return (
      <div className="App">

      	<h1 className='ma4 pa4'>Demographics App</h1>
      	<p>Submit a picture to detect..</p>
      	<div className='center'>
		<div className='imageForm center pa4 br3 shadow-5'>	
			<input className='f4 pa2 w-70 center' type='text' onChange={this.onInputChange}/>
			<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' onClick={this.onHandleSubmit}>Submit</button> 
		</div>
		</div>

		<div className='body_section'>
			<div>
				<FrameBox picture={picture} faceFrame={faceFrame}/>	
			</div>
		{/*<div className = 'box' style={{top:faceFrame.topRow, right:faceFrame.rightCol, bottom:faceFrame.bottomRow, left:faceFrame.leftCol}}></div> */}
	   		<div className='info_section'>

	   		</div>
       </div>
      </div>
    );
  }
}

export default App;
