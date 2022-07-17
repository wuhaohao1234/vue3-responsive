const { reactivity, effectWatch } = require("../core/reactivity/index");

//  v1
// let a = 10;
// let b = a + 10;

// console.log(b);

// a = 20

// b = a + 10

// console.log(b);

// v2

// let a = 10;
// let b

// function update() {
//   b = a + 10
//   console.log(b);
// }

// update()

// a = 20

// update()

// v3

let a = reactivity({
  value: 10
})
let b

effectWatch(() => {
  b = a.value + 10
  console.log(b);
})

a.value = 30