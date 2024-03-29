  
//import scraper from './scraping/index.js';

const savePageButton = document.getElementById('save-page-btn')
const pageSavedMessage = document.getElementById('page-saved-message')

//checkLoginStatus();
var url
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  url = tabs[0].url;
//   const urlTail = url.split("www.")[1];
//   if (urlTail) site = urlTail.split(".com")[0];
})

savePageButton.addEventListener('click', function (event) {
  event.preventDefault()
  console.log(url)
      fetch('https://cache-22-app.herokuapp.com/api/article/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          url
        )
      }).then(response => {
        if (response.status >= 400 && response.status < 500)
          throw new Error('Sorry, the page cannot be scraped')
        else
          pageSavedMessage.innerText = 'Page saved successfully!';

      }).catch(error => {
        pageSavedMessage.innerText = 'Page saving failed: ' + error.message
      })
})

const loginForm = document.getElementById('auth-form')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const loginErrorMessage = document.getElementById('login-error-message')

loginForm.addEventListener('submit', function (event) {
  event.preventDefault()
//   fetch('https://simmer.brook.li/auth/login', {
//     method: 'POST',
//     mode: 'cors',
//     credentials: 'include',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       email: usernameInput.value,
//       password: passwordInput.value
//     })
//   }).then(response => {
//     if (response.status === 401) {
//       loginErrorMessage.innerText = 'wrong username and/or password';
//     }
//     else {
//       checkLoginStatus();
//     }
//   }).catch(error => {
//     loginErrorMessage.innerText = 'Login request failed: ' + error
//   })
//   loginForm.reset()
})

const loginInfo = document.getElementById('login-info')

function checkLoginStatus() {
//   fetch('https://simmer.brook.li/auth/me', {
//     method: 'GET',
//     mode: 'cors',
//     credentials: 'include'
//   }).then(response => {
//     if (response.status === 200) {
//       response.json().then(data => {
//         const logoutButton = document.createElement('button');
//         logoutButton.innerText = 'logout';
//         if (url && scraper[site])
//           savePageButton.disabled = false;
//         logoutButton.onclick = function () {
//           savePageButton.disabled = true;
//           fetch('https://simmer.brook.li/auth/logout', {
//             method: 'POST',
//             mode: 'cors',
//             credentials: 'include'
//           }).then(() => {
//             location.reload();
//           }).catch(error => {
//             console.error(error);
//           })
//         }
//         loginInfo.innerHTML = '<p>Hello, ' + data.email + '<p>';
//         loginInfo.appendChild(logoutButton);
//       })
//     }
//     savePageButton.disabled = true;
//   }).catch(error => {
//     console.error(error);
//   })
}