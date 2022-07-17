const { effectWatch } = require("./reactivity")

const createApp = (rootComponent) => {
  return {
    mount(rootContainer) {
      const context = rootComponent.setUp()
      effectWatch(() => {
        const element = rootComponent.render(context)
        rootContainer.append(element)
      })
    }
  }
}

module.exports = createApp