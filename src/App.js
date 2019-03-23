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
	isVisible:false,
	inputState:'text',
	stateText:'Submit local file'
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
		     faceFrame:getFaceBoundry(allFace), //set faceFrame 
			 getInfo:getNewInfo(getAge,getRace,getGender)//set getInfo to whatever it is return back from getNewInfo function
			});
		
	}


	onInputChange =(e)=>{

		if(this.state.inputState ==='file'){
			if(e.target.files[0]){

				let file = e.target.files[0];
		 		let reader  = new FileReader();
		 		reader.readAsDataURL(file)
		 		reader.onload = (e)=>{
		 		this.setState({input:e.target.result})
		 		}	
			}
		}else{
			this.setState({input:e.target.value});
		}
	}

	onHandleInputState= () =>{
		if(this.state.inputState === 'text'){
			this.setState({inputState:'file', stateText:'Submit URL'})
		}else{
			this.setState({inputState:'text', stateText:'Submit local image'})
		}
	}

	onHandleSubmit=(e)=>{
		this.setState({picture:this.state.input, isVisible:false});
		let sendInput = this.state.input.split('').slice(23).join('');
		app.models.predict(
      	"c0c0ac362b03416da06ab3fa36fb58e3",
      	this.state.inputState === 'text'? this.state.input : sendInput)
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
  	const{faceFrame, picture,index,getInfo,isVisible,stateText, inputState} = this.state;
  	let displayPerson = getInfo[index];
  

    return (
      <div className="">

      	<h1 className='f1-ns f3 mt5 mb3 pa3 center' style={{color:'#9943e0'}}>Demographics App</h1>
      	<p className="pa3 center f4">Submit an image by URL or local file</p>
      	<p className="link center dim pointer pa2" onClick={this.onHandleInputState}>
      		<span className="ba pa2 white">{stateText}</span>
      	</p>

		<div className='center mb3 mt3'>
			<div className='imageForm center pa1 br3 shadow-2'>
				{
				inputState === "file" ?
				<input 
					className='f4 w-70 center bg-white' 
					type="file" 
					onChange={this.onInputChange} />
				:
		
				<input 
					className='f4 pa2 w-70 center' 
					type='text' 
					placeholder='URL:'
					onChange={this.onInputChange}
				/>

			    }	
				<button 
					className='w-30 f4 link grow ph3 pv2 dib white submitBtn' 
					onClick={this.onHandleSubmit}>
					Submit
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
