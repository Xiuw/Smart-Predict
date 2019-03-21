import React from 'react'; 


const InfoSection = ({isVisible, age,agePercent,race,racePercent,gender,genderPercent})=> {
	const ag= Math.round(age);
	const ageP=Math.round(agePercent * 100)+'%';
	const raceP= Math.round(agePercent *100)+'%';
	const genderP=Math.round(genderPercent*100)+'%';  

	return(
		<div className="w-70 center" style={isVisible?{display:'block'}:{display: 'none'}}>
			<div className=" center">	
				<div className="mb3 mt3 mr3">
					<div>
						<span>Age: </span>
						<span className='white-80 pr1'> {ag}</span>  
					</div>
					<div>
						<span>Probability:</span>
						<span className='white-80 pr1'> {ageP}</span>
					</div>
				</div>	

				<div className="mb3 mt3 mr3">
					<div>
						<span>Gender:</span> 
						<span className='white-80 pr1'> {gender}</span>
					</div>
					<div>  
						<span>Probability:</span>
						<span className='white-80 pr1'> {genderP}</span> 
					</div>

				</div>

				<div className="mb3 mt3">
					<div>
						<span>Ethnic: </span>
						<span className='white-80 pr1'> {race}</span> 
					</div>
					<div> 
						<span>Probability:</span>
						<span className='white-80 pr1'> {raceP}</span> 
					</div>
				</div>
			
			</div>	
				
			
		</div>
	)
}
export default InfoSection;
