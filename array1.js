// array

const myArr = [0, 1, 2, 3, 4, 5]
const myHeros = ["superhero" , "badman"]

const myArr2 = new Array(1, 2, 3, 4)
//console.log(myArr[1]);

// array methods

//myArr.push(6)
//myArr.push(7)
//myArr.pop()


//myArr.unshift(9)
//myArr.shift()//

//console.log(myArr.includes(9));
//console.log(myArr.indexOf(2));

//const newArr = myArr.join()


//console.log(myArr);
//console.log( newArr);

//slice , splice
   

 console.log("A", myArr);

 const myn1 = myArr.slice(1, 3)


 console.log(myn1);
 console.log("B", myArr);

 const myn2 = myArr.splice(1, 3)
 console.log("C", myArr);
 
 console.log(myn2);

//console.log(myArr);

const myn3 = myArr.splice(1, 3 , 10 , 11 , 12)
console.log("D", myArr);
console.log(myn3);
 
//console.log(myArr);

// concat
const myNewArr = myArr.concat(myHeros)
console.log(myNewArr);

// flat
const arr = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, [11, 12]]
]

//console.log(arr.flat(2));

// fill
//console.log(myArr.fill(0, 2, 4));

// forEach , map , filter , reduce

// forEach
myArr.forEach((num) => console.log(num))

// map
const myNewArr1 = myArr.map((num) => num * 2)
//console.log(myNewArr1);

// filter
const myNewArr2 = myArr.filter((num) => num > 2)
//console.log(myNewArr2);

// reduce
const myNewArr3 = myArr.reduce((accumulator, currentValue) => accumulator + currentValue)
//console.log(myNewArr3);

// sort
const myn4 = [3, 1, 4, 2, 5]
//console.log(myn4.sort());

// reverse
//console.log(myn4.reverse());

// find
//console.log(myn4.find((num) => num > 2));

// findIndex
//console.log(myn4.findIndex((num) => num > 2));

// some
//console.log(myn4.some((num) => num > 2));

// every
//console.log(myn4.every((num) => num > 2));

// fill
//console.log(myn4.fill(0, 2, 4));

// includes
//console.log(myn4.includes(2));

// indexOf
//console.log(myn4.indexOf(2));

// join
//console.log(myn4.join());

// slice
//console.log(myn4.slice(1, 3));

// splice
//console.log(myn4.splice(1, 3));

// concat
//console.log(myn4.concat([6, 7, 8]));

// flat
const arr1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, [11, 12]]
]
//console.log(arr1.flat(2));





  

 
 
 