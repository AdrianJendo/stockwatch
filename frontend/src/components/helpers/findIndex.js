const findIndex = (arr, item, key = "label") => {
	for (let i = 0; i < arr.length; ++i) {
		if (arr[i][key] === item) {
			return i;
		}
	}
	return -1;
};

export default findIndex;
