// Reversing a hard-coded number
function reverseNumber(num1) {
  let num2 = 0;
  while(num1){
    num2*=10;
    num2+=num1%10;
    num1/=10;
    num1=Math.trunc(num1);
  }
  return num2;
}
console.log("1.", reverseNumber(12345));

// Summing even numbers from hard-coded array
const tab = [1,2,3,4,5,6,7,8,9];
function addEven(array) {
  let i=tab.length;
  let sum = 0;
  for(let i=0; i<tab.length; i++ ){
    if(!(tab[i]%2)) sum+=tab[i];
  }
  return sum;
}
console.log("2.", addEven(tab));