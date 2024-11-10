// Smoothie class definition
class Smoothie {
  constructor(size, base, ingredients, addOns, special) {
    this.size = size
    this.base = base
    this.ingredients = ingredients
    this.addOns = addOns
    this.special = special
    this.orderTime = new Date()
  }

  calculatePrice() {
    const sizePrices = { small: 4.99, medium: 5.99, large: 6.99 }
    const ingredientPrice = 0.75
    const addOnPrice = 1.0

    let total = sizePrices[this.size]
    total += this.ingredients.length * ingredientPrice
    total += this.addOns.length * addOnPrice

    return total.toFixed(2)
  }

  getDescription() {
    return `${this.size.charAt(0).toUpperCase() + this.size.slice(1)} ${
      this.base
    } smoothie with ${this.ingredients.join(', ')}${
      this.addOns.length ? ' and ' + this.addOns.join(', ') : ''
    }`
  }
}

// Color mapping for ingredients
const ingredientColors = {
  strawberry: '#ff9999',
  banana: '#ffee99',
  mango: '#ffcc66',
  blueberry: '#9999ff',
  pineapple: '#ffff99',
  kiwi: '#99ff99',
}

// State management
const state = {
  size: 'medium',
  base: 'yogurt',
  ingredients: [],
  addOns: [],
  special: '',
  isBlending: false,
}

// Helper functions
function updatePreview() {
  const preview = document.getElementById('smoothie-preview')
  if (state.ingredients.length === 0) {
    preview.style.background = '#f0f0f0'
  } else {
    const colors = state.ingredients.map((ing) => ingredientColors[ing])
    preview.style.background = `linear-gradient(45deg, ${colors.join(', ')})`
  }
}

function updateButtons() {
  // Update size buttons
  document.querySelectorAll('#size-buttons .btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.size === state.size)
  })

  // Update base buttons
  document.querySelectorAll('#base-buttons .btn').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.base === state.base)
  })

  // Update ingredient buttons
  document.querySelectorAll('#ingredient-buttons .btn').forEach((btn) => {
    btn.classList.toggle(
      'selected',
      state.ingredients.includes(btn.dataset.ingredient)
    )
    btn.classList.toggle(
      'disabled',
      !state.ingredients.includes(btn.dataset.ingredient) &&
        state.ingredients.length >= 3
    )
  })

  // Update addon buttons
  document.querySelectorAll('#addon-buttons .btn').forEach((btn) => {
    btn.classList.toggle('selected', state.addOns.includes(btn.dataset.addon))
  })
}

// Event listeners
document.getElementById('size-buttons').addEventListener('click', (e) => {
  if (e.target.dataset.size) {
    state.size = e.target.dataset.size
    updateButtons()
  }
})

document.getElementById('base-buttons').addEventListener('click', (e) => {
  if (e.target.dataset.base) {
    state.base = e.target.dataset.base
    updateButtons()
  }
})

document.getElementById('ingredient-buttons').addEventListener('click', (e) => {
  const ingredient = e.target.dataset.ingredient
  if (!ingredient) return

  const index = state.ingredients.indexOf(ingredient)
  if (index === -1 && state.ingredients.length < 3) {
    state.ingredients.push(ingredient)
  } else if (index !== -1) {
    state.ingredients.splice(index, 1)
  }

  updateButtons()
  updatePreview()
})

document.getElementById('addon-buttons').addEventListener('click', (e) => {
  const addon = e.target.dataset.addon
  if (!addon) return

  const index = state.addOns.indexOf(addon)
  if (index === -1) {
    state.addOns.push(addon)
  } else {
    state.addOns.splice(index, 1)
  }

  updateButtons()
})

document
  .getElementById('special-instructions')
  .addEventListener('input', (e) => {
    state.special = e.target.value
  })

document.getElementById('order-button').addEventListener('click', () => {
  if (state.ingredients.length === 0 || state.isBlending) return

  state.isBlending = true
  const blenderIcon = document.getElementById('blender-icon')
  const orderButton = document.getElementById('order-button')

  blenderIcon.classList.add('blending')
  orderButton.textContent = '🌪️ Blending...'
  orderButton.disabled = true

  setTimeout(() => {
    const smoothie = new Smoothie(
      state.size,
      state.base,
      state.ingredients,
      state.addOns,
      state.special
    )

    document.getElementById('order-description').textContent =
      smoothie.getDescription()
    document.getElementById(
      'order-price'
    ).textContent = `Total: $${smoothie.calculatePrice()}`
    document.getElementById('order-summary').classList.add('visible')

    state.isBlending = false
    blenderIcon.classList.remove('blending')
    orderButton.textContent = '✨ Create Smoothie'
    orderButton.disabled = false
  }, 2000)
})

// Initialize the UI
updateButtons()
updatePreview()
