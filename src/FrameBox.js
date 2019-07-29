import React from 'react';



const FrameBox = ({picture,faceFrame,onHandleMouse})=>{

	 const box = faceFrame.map((box,i)=>{
	 	return(
	 		<div 
		 		className ='box grow dim' 
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
		
			<div className='center'>
				<div className='absolute mt2 absolute-center'>
					{picture.length?<p className="mid-gray">*Hover over the box to see the result</p>:""}
					<img id='inputimage' alt='' src={picture} width='600px' height='auto'/>
					{box}
				</div>
			</div>
		
	)

}
export default FrameBox;