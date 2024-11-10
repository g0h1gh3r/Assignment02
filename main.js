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
