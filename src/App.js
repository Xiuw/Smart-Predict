import React, { Component } from 'react';
import Clarifai from 'clarifai';
import {getFaceInfo} from './getFaceInfo';
import {getFaceBoundry} from './getFaceBoundry';
import InfoArea from './InfoArea';
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
			ageInfo:[]
		}
	}

    getFaceArea = (data)=>{
    	const imageInfo = data.outputs[0].data.regions;
		const allFace = imageInfo.map(face => face);
		this.setState({faceFrame:getFaceBoundry(allFace)});
	}

	getAgeInfo = (data) =>{
		const imageInfo = data.outputs[0].data.regions;
		const allFace = imageInfo.map(face =>
			face.data.face.age_appearance.concepts[0].name);
		this.setState({ageInfo:allFace})	
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
      		this.getFaceArea(response);
      		this.getAgeInfo(response);
      	}
      	)
      	.catch(err => console.log);
	}
	onHandleMouse=(index)=>{
		this.setState({index});
	}



	render() {
	  	const{faceFrame, picture,index,ageInfo} = this.state;
	  	const age = ageInfo[index];
	  
	    return (
	      <div className='App'>

	    	<h1 className='ma4 pa4'>Age Detection</h1>
	      	<p>Submit a picture and hover to see the age...</p>
	      	
			<div className='imageForm center pa4 br3 shadow-5'>	
				<input className='f4 pa2 w-70' type='text' onChange={this.onInputChange}/>
				<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-red' onClick={this.onHandleSubmit}>Submit</button> 
			</div>
			<InfoArea age = {age} />
   			<div className='mw5 mw7-ns center pa3 ph5-ns'>
				<FrameBox picture={picture} faceFrame={faceFrame} onHandleMouse ={this.onHandleMouse}/>
			</div>
		   
	      </div>
	    );
	}
}

export default App;
