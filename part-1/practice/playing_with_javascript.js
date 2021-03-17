const t = [3, 4, 6]

const m1 = t.map(value => value * 2)
console.log(m1)

const m2 = t.map(value => '<li>' + value + '</li>') 
console.log(m2)

const t2 = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t2

console.log(first, second)
console.log(rest)

const sum = (p1, p2) => {
	console.log(p1)
	console.log(p2)
	return p1 + p2
}

const result = sum(2, 4)
console.log(result)

const tSquared = t.map(p => p * p)
console.log(tSquared)