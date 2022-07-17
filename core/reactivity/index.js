// get时候通过depend将依赖添加到effects，set时候通过notice触发依赖更新
let currentEffect;
class Dep {
  constructor(val) {
    this._val = val
    this.effects = new Set()
  }
  get value() {
    this.depend()
    return this._val
  }
  set value(newValue) {
    this._val = newValue
    this.notice()
  }
  // 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }
  // 触发依赖
  notice() {
    this.effects.forEach(effect => {
      effect()
    })
  }
}

const effectWatch = (effect) => {
  currentEffect = effect
  effect()
  currentEffect = null
}

const dep = new Dep(10)

let b

effectWatch(() => {
  b = dep.value + 10
  console.log(b);
})

dep.value = 20