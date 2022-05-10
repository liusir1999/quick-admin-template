import Modal from './index.vue'
import { h, render, createApp, createVNode } from 'vue'

const createQuickModalInstance = (component, props) => {
  // const container = document.createElement('div')

  // props.handleAfterLeave = () => {
  //   render(null, container)
  // }
  // const vNode = h(component, props)
  // render(vNode, container)

  // return vNode.component.proxy

  const container = document.createElement('div')
  props.handleAfterLeave = () => {
    app.unmount(container)
  }
  const app = createApp(component, props)
  const instace = app.mount(container)
  return instace
}

let QuickModalInstance

export const QuickModal = (props) => {
  // console.log(QuickModalInstance, 'QuickModalInstance')
  if (QuickModalInstance) {
    QuickModalInstance.handleOpen()
  } else {
    QuickModalInstance = createQuickModalInstance(Modal, props)
    QuickModal(props)
  }
}
