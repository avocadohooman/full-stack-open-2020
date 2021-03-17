var animals = [
	{name: 'Ted', species: 'rabbit'},
	{name: 'Det', species: 'dog'},
	{name: 'Det2', species: 'dog'},
	{name: 'Ady', species: 'cat'}
]

var dogs = animals.filter(function(animals) {
	return animals.species === 'dog'});
console.log(dogs);

var dogNames = animals.map(x => x.name.toUpperCase());
console.log(dogNames);


var orders = [
	{ amount: 250 },
	{ amount: 400 },
	{ amount: 100 },
	{ amount: 325 },
]

var totalAmount = orders.reduce((sum, order) => sum + order.amount, 0)

console.log(totalAmount);