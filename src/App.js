import React, { Component } from 'react';
import Clarifai from 'clarifai';
import {getFaceBoundry} from './getFaceBoundry';
// import {getFaceInfo} from './getFaceInfo';
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
			faceFrame:[],
			index:0,
			ageInfo:{}
		}
	}

	

    getAllFace = (data)=>{
    	console.log(data);
    	const imageInfo = data.outputs[0].data.regions;
		// const clarifaiFace = data.outputs[0].data.regions[1].region_info.bounding_box;
		const allFace = imageInfo.map(face => face);
		this.setState({faceFrame:getFaceBoundry(allFace)});
		console.log(this.state.faceFrame); 

		// let faceInfo = imageInfo[this.state.index].data.face.age_appearance;
		// // console.log(faceInfo.concepts);
		
		// this.setState({ageInfo:faceInfo.concepts});
		
	}

	getFaceInfo = (data) =>{
		const imageInfo = data.outputs[0].data.regions[this.state.index].data.face.age_appearance;
  		this.setState({ageInfo:imageInfo.concepts});
	}

	

	onInputChange =(e)=>{
		this.setState({input:e.target.value});
	}
	onHandleSubmit=(e)=>{
		this.setState({picture:this.state.input});
		app.models.predict(
      	"c0c0ac362b03416da06ab3fa36fb58e3",
      	this.state.input)
      	.then(response =>{

      		this.getAllFace(response);
      		this.getFaceInfo(response);
      	}
      
      		
      	)
      	.catch(err => console.log);
	}

	onHandleMouse=(i)=>{
		this.setState({index:i})
	}



  render() {
  	const{faceFrame, picture} = this.state;
  	console.log(this.state.index);
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
				<FrameBox 
					picture={picture} 
					faceFrame={faceFrame} 
					onHandleMouse ={this.onHandleMouse}
				/>	
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
