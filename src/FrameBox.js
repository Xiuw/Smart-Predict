import React from 'react';


const FrameBox = ({picture,faceFrame,onHandleMouse})=>{

	 const box = faceFrame.map((box,i)=>{
	 	return(
	 		<div 
		 		className ='box link dim black center ma' 
		 		key={i} 
		 		onMouseEnter ={()=>onHandleMouse(i)}
		 		style={
		 			{top:faceFrame[i].topRow, 
		 			right:faceFrame[i].rightCol, 
		 			bottom:faceFrame[i].bottomRow, 
		 			left:faceFrame[i].leftCol}
		 			}>

	 		</div>
	 	)
	 })

	return(

			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={picture} width='500px' height='auto'/>
				
				{box}
			
			</div>
		
	)

}
export default FrameBox;