export function renderApp(container) {
  container.innerHTML = `
    <div class="page">
    <button id="openBtn" class="open-btn" type="button">
      Open Command Palette
    </button>
    <div id="paletteOverlay" class="overlay" hidden>
      <div 
        id="paletteModal" 
        class="modal" 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="paletteTitle"
      >
        <h2 id="paletteTitle" class="title">Command Palette</h2>
        <input
          id="commandInput"
          class="command-input"
          type="text"
          placeholder="Type a command..."
          autocomplete="off"
          spellcheck="false"
        />
        <ul id="commandList" class="command-list" role="listbox"></ul>
      </div>
    </div>
  </div>
  `
}

export function getDomElements() {
  return {
    app: document.querySelector("#app"),
    openBtn: document.querySelector("#openBtn"),
    overlay: document.querySelector("#paletteOverlay"),
    modal: document.querySelector("#paletteModal"),
    input: document.querySelector("#commandInput"),
    list: document.querySelector("#commandList"),
  } 
}