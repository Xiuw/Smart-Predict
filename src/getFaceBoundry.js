

export const getFaceBoundry = (face) =>{
		return face.map(n =>{
			const detectedFace = n.region_info.bounding_box;
			const image = document.getElementById('inputimage');
    		const width = Number(image.width);
    		const height = Number(image.height);
    		return {
    		   leftCol : detectedFace.left_col * width,
      		   topRow : detectedFace.top_row * height,
      		   rightCol : width - (detectedFace.right_col * width),
               bottomRow : height - (detectedFace.bottom_row * height)
    		}
		});
}


