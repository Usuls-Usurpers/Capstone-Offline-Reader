let sendUrl = document.getElementById("send-url");

// When the button is clicked it should console log the URL
sendUrl.addEventListener("click", async () => {
  console.log('click!')
  console.log(`current tab url is ${tab.url}`)
})
