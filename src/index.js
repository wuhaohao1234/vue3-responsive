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

const App = {
  render(context) {
    effectWatch(() => {
      document.body.innerHTML = ''
      const div = document.createElement('div')
      div.innerHTML = context.state.count
      document.body.append(div)
    })

  },
  setUp() {
    const state = reactivity({
      count: 0
    })
    window.state = state
    return {state}
  }
}
App.render(App.setUp())