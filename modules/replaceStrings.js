module.exports = (templateCard, curData) => {
	let output = templateCard.replace(/{%ProductName%}/g, curData.productName);
	output = output.replace(/{%Image%}/g, curData.image);
	output = output.replace(/{%From%}/g, curData.from);
	output = output.replace(/{%Nutrients%}/g, curData.nutrients);
	output = output.replace(/{%Quantity%}/g, curData.quantity);
	output = output.replace(/{%Price%}/g, curData.price);
	output = output.replace(/{%Description%}/g, curData.description);
	output = output.replace(/{%Id%}/g, curData.id);
	if (!curData.organic) {
		output = output.replace(/{%NotOrganic%}/g, 'not-organic');
	}
	return output;
};
