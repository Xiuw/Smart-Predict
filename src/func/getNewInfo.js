
export const getNewInfo = (getAge, getRace,getGender) =>{

	let newArray = [];	
	
		getAge.forEach((age,i) => newArray.push({'age':getAge[i].name, 'ageProb':getAge[i].value}));
			
		getRace.forEach((race,i) => {newArray[i].race = getRace[i].name; newArray[i].raceProb = getRace[i].value});
				
		getGender.forEach((gender,i) => {newArray[i].gender= getGender[i].name; newArray[i].genderProb = getGender[i].value});

	return newArray;

}

