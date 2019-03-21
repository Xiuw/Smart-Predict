import React, { Component } from 'react';
import Clarifai from 'clarifai';
import {getFaceBoundry} from './func/getFaceBoundry';
import {getNewInfo} from './func/getNewInfo';
import DisplayInfo from './DisplayInfo';
import FrameBox from './FrameBox';
import './App.css';


const initialState={
	input:'',
	picture:'',
	faceFrame:[],
	index:0,
	getInfo:[],
	isVisible:false
}

const app = new Clarifai.App({
 apiKey: '96b6b6990bce404ea56ca1c12646b30e'
});

class App extends Component {
	constructor(){
		super();
		this.state = initialState;
	}

    getFaceArea = (data)=>{
    	const imageInfo = data.outputs[0].data.regions;

		const allFace = imageInfo.map(face => face);//For Calculate face location in a image

		const getAge = imageInfo.map(age =>
			age.data.face.age_appearance.concepts[0]);//For age
		const getGender = imageInfo.map(gender =>
			gender.data.face.gender_appearance.concepts[0]);//For gender
		const getRace = imageInfo.map(race =>
			race.data.face.multicultural_appearance.concepts[0]);//For race
		
		this.setState({ 
		     faceFrame:getFaceBoundry(allFace),
			 getInfo:getNewInfo(getAge,getRace,getGender)

			});
		
	}


	onInputChange =(e)=>{
		this.setState({input:e.target.value});
	}



	onHandleSubmit=(e)=>{
		this.setState({picture:this.state.input, isVisible:false});

		app.models.predict(
      	"c0c0ac362b03416da06ab3fa36fb58e3",
      	this.state.input)
      	.then(response =>{
      		this.getFaceArea(response);

      	})
      	.catch(err => console.log);

	}
	onHandleMouse=(index)=>{
		this.setState({
			index:index,
			isVisible:true
		});
	}

  render() {
  	const{faceFrame, picture,index,getInfo,isVisible} = this.state;
 
  	let displayPerson = getInfo[index];

    return (
      <div className="">

      	<h1 className='mt5 mb3 pa3 white-80 center'>Demographics App</h1>
      	<p className="pa4 center">Submit a image URL below</p>
      	

		<div className='center mb3'>
			<div className='imageForm center pa1 br3 shadow-2'>
	
				<input 
					className='f4 pa2 w-70 center' 
					type='text' 
					onChange={this.onInputChange}
				/>
		
				<button 
					className='w-30 f4 link grow ph3 pv2 dib white-80 bg-dark-blue' 
					onClick={this.onHandleSubmit}>Submit
				</button>
			
			</div>
		</div>

	
			<DisplayInfo 
				info={displayPerson} 
				isVisible={isVisible}
			/>

			<FrameBox 
				picture={picture} 
				faceFrame={faceFrame} 
				onHandleMouse ={this.onHandleMouse}
				
			/>

      </div>
    );
  }
}

export default App;
