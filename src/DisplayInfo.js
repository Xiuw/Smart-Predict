import React from 'react';
import InfoSection from './InfoSection';

const DisplayInfo = ({info,isVisible})=> {

	let arr=[];
	for(let props in info){
		arr.push(info[props]);
	}


		
	return(
		<InfoSection
		    isVisible={isVisible}
			age= {arr[0]}
			agePercent={arr[1]}
			race={arr[2]}
			racePercent={arr[3]}
			gender={arr[4]}
			genderPercent={arr[5]}
		/>

	)
	

}
export default DisplayInfo;
