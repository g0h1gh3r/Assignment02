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
