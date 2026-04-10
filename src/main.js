import './style.css'
import { getDomElements, renderApp } from './dom'
import { handleGlobalKeydown, handleInputKeydown, handleListClick, handleOverlayClick, openPalette, setupPalette, updateFilter } from './palette'

const app = document.querySelector("#app")

renderApp(app)

const elements = getDomElements()

setupPalette(elements)

elements.openBtn.addEventListener("click", () => {
  openPalette(elements.openBtn)
})

elements.input.addEventListener("input", updateFilter)
elements.input.addEventListener("keydown", handleInputKeydown)

elements.overlay.addEventListener("click", handleOverlayClick)
elements.list.addEventListener("click", handleListClick)

document.addEventListener("keydown", handleGlobalKeydown)