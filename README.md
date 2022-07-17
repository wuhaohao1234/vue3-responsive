# mini-vue

## reactivity

### 核心

Dep对象

get Value时候往effects添加依赖depend
set Value时候触发effects里所有依赖notice

reactivity方法

全局有一个targetMap字典


Proxy

get,往targetMap添加所有dep对象
set,触发targetMap里dep对象的notice方法


```js
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

// const dep = new Dep(10)

// let b

// effectWatch(() => {
//   b = dep.value + 10
//   console.log(b);
// })

// dep.value = 20

const targetMap = new Map()

function getMap(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }
  return dep
}

const reactivity = (raw) => {
  return new Proxy(raw, {
    get(target, key) {
      const dep = getMap(target, key);
      dep.depend();
      // return target[key]
      return Reflect.get(target, key)
    },
    set(target, key, value) {
        const dep = getMap(target, key);
        const result = Reflect.set(target, key, value)
        dep.notice()
        return result
    }
  })
}
module.exports = {
  effectWatch,
  reactivity
}
```

