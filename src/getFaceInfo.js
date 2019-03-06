

export const getFaceInfo = (age) =>{
  let temp = 0;
  let maxIndex = 0;
	age.concepts.forEach((age,i)=>{
    if(age.value > temp){
      maxIndex = i;
      temp = age.value;
    }

  })

  return maxIndex;
}
