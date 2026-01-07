// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('state-input')
  const button = document.getElementById('fetch-alerts')
  const alertsDisplay = document.getElementById('alerts-display')
  const errorMessage = document.getElementById('error-message')

  const clearError = () => {
    errorMessage.textContent = ''
    errorMessage.classList.add('hidden')
  }

  const showError = (message) => {
    errorMessage.textContent = message
    errorMessage.classList.remove('hidden')
  }

  const displayAlerts = (data) => {
    alertsDisplay.innerHTML = ''

    const title = document.createElement('h2')
    title.textContent = `${data.title}: ${data.features.length}`
    alertsDisplay.appendChild(title)

    data.features.forEach(alert => {
      const p = document.createElement('p')
      p.textContent = alert.properties.headline
      alertsDisplay.appendChild(p)
    })
  }

  const fetchAlerts = async (state) => {
    try {
      const response = await fetch(
        `https://api.weather.gov/alerts/active?area=${state}`
      )

      if (!response.ok) {
        throw new Error('Fetch failed')
      }

      const data = await response.json()
      clearError()
      displayAlerts(data)
    } catch (error) {
      showError(error.message)
    }
  }

  button.addEventListener('click', () => {
    const state = input.value.trim()
    input.value = '' //clears input (required by test)
    fetchAlerts(state)
  })
})
