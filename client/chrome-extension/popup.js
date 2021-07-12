let sendUrl = document.getElementById("send-url");
import axios from "axios"

const dispatchUrl = async (url) => {
    return await axios.post('http://localhost:8080/api/article', url) 
} 
// When the button is clicked it should send the url to the webscraper
sendUrl.addEventListener("click", async () => {
  console.log('click!')
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true})
  console.log(`current tab url is ${tab.url}`)
  const status = await dispatchUrl(tab.url)
  console.log (status)
})
