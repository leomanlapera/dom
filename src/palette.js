import { commands } from "./command"
import { state } from "./state"

let elements = null

export function setupPalette(domElements) {
  elements = domElements
  renderList()
}

export function openPalette(triggerEl = document.activeElement) {
  if (!elements) return

  state.isOpen = true
  state.triggerEl = triggerEl
  elements.overlay.hidden = false
  elements.openBtn.setAttribute("aria-expanded", "true")
  elements.input.focus()
  renderList()
}

export function closePalette() {
  if (!elements) return

  state.isOpen = false
  elements.overlay.hidden = true
  elements.openBtn.setAttribute("aria-expanded", "false")

  elements.input.value = ""
  state.query = ""
  state.activeIndex = 0
  state.filteredCommands = [...commands]

  if (state.triggerEl instanceof HTMLElement) {
    state.triggerEl.focus()
  }
}

export function updateFilter() {
  if (!elements) return

  state.query = elements.input.value.trim().toLowerCase()

  state.filteredCommands = commands.filter((command) =>
    command.toLowerCase().includes(state.query)
  )

  state.activeIndex = 0
  renderList()
}

export function handleInputKeydown(event) {
  if (!state.isOpen) return

  if (event.key === "ArrowDown") {
    event.preventDefault()

    if (state.filteredCommands.length === 0) return

    state.activeIndex = Math.min(
      state.activeIndex + 1,
      state.filteredCommands.length - 1,
    )

    renderList()
    return
  }

  if (event.key === "ArrowUp") {
    event.preventDefault()

    if (state.filteredCommands.length === 0) return

    state.activeIndex = Math.max(state.activeIndex - 1, 0)

    renderList()
    return
  }

  if (event.key === "Enter") {
    event.preventDefault()

    if (state.filteredCommands.length === 0) return

    selectCommand(state.activeIndex)
  }
}

export function handleOverlayClick(event) {
  if (!elements) return
  if (event.target === elements.overlay) {
    closePalette()
  }
}

export function handleListClick(event) {
  const item = event.target.closest("[data-index]")
  if (!item) return

  const index = Number(item.dataset.index)
  state.activeIndex = index
  selectCommand(index)
}

export function selectCommand(index) {
  const selected = state.filteredCommands[index]
  if (!selected) return

  console.log("Selected command:", selected)
  closePalette()
}

export function handleGlobalKeydown(event) {
  const isK = event.key.toLowerCase() === "k"
  const hasShortcut = (event.ctrlKey || event.metaKey) && isK

  if (hasShortcut) {
    event.preventDefault()

    if (state.isOpen) {
      closePalette()
    } else {
      openPalette(document.activeElement)
    }
    return
  }

  if (event.key === "Escape" && state.isOpen) {
    event.preventDefault()
    closePalette()
  }
}

function renderList() {
  if (!elements) return

  const { list } = elements
  list.innerHTML = ""

  if (state.filteredCommands.length === 0) {
    const emptyItem = document.createElement("li")
    emptyItem.className = "empty-state"
    emptyItem.textContent = "No matching commands"
    list.appendChild(emptyItem)
    return
  }

  state.filteredCommands.forEach((command, index) => {
    const li = document.createElement("li")
    li.className = "command-item"
    li.dataset.index = String(index)
    li.id = `command-option-${index}`
    li.setAttribute("aria-selected", String(index === state.activeIndex))
    li.textContent = command

    if (index === state.activeIndex) {
      li.classList.add("active")
    }

    list.appendChild(li)
  })

  const activeEl = list.querySelector(".active")
  activeEl?.scrollIntoView({ block: "nearest" })
}