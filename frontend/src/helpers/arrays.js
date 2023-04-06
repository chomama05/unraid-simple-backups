export const getObjectWithMostPropertiesFromArray = (myArray) => {
	return myArray.reduce((accumulator, currentObject) => {
		const currentObjectPropertyCount = Object.keys(currentObject).length;
		const accumulatorPropertyCount = Object.keys(accumulator).length;

		if (currentObjectPropertyCount > accumulatorPropertyCount) {
			return currentObject;
		} else {
			return accumulator;
		}
	});
}