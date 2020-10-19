import React, { useState } from "react"
import getStripe from "../../utils/stripejs"


const buttonStyles = {

}

const buttonDisabledStyles = {
  opacity: "0.5",
  cursor: "not-allowed",
}

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["fr-FR"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const price = new FormData(event.target).get("priceSelect")
    const quantity = new FormData(event.target).get("quantity")
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price, quantity: parseInt(quantity) }],
      successUrl: `${window.location.origin}`,
      cancelUrl: `${window.location.origin}`,
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  console.log(product)

  return (
      <form onSubmit={handleSubmit} className={'product-card'}>
        <h4>{product.name}</h4>
        <div className={'product-image'} style={{backgroundImage: `url(${product.images[0]})`}}></div>
        <p>
            {formatPrice(product.prices[0].unit_amount, product.prices[0].currency)}
        </p>
        <input style={{display: 'none'}} name='priceSelect' value={product.prices[0].id}></input>
        <p>
            /jour | TTC
        </p>
        <div className={'input-div'}>
            <label>
                Nombre de jours
            </label>
            <input type='number' name='quantity' placeholder='0'/>
        </div>
        <button
          disabled={loading}
          style={
            loading
              ? { ...buttonStyles, ...buttonDisabledStyles }
              : buttonStyles
          }
          className={'btn'}
        >
          Choisir cette formule
        </button>
      </form>
  )
}

export default ProductCard