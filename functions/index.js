const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://Cache-22.firebaseio.com'
});
// admin.initializeApp();
const db = admin.firestore();

async function seed() {
    const usersRef = db.collection('users')
    await usersRef.doc('vickie@mail.com').set({
        firstName: 'vickie', lastName: 'jeon', email: 'vickie@mail.com'
    })
    // await usersContent = db.collection('users').doc('vickie@mail.com')
    // .collection('articles').doc('1').add({
    //     content: `<div id="siteSub" class="noprint">From Wikipedia, the free encyclopedia</div> <div id="contentSub"><div id="mw-fr-revisiontag" class="flaggedrevs_short flaggedrevs_stable_synced plainlinks noprint"><div class="flaggedrevs_short_basic"><span aria-disabled="false" title="Changes must be reviewed before being displayed on this page." class="flaggedrevs-icon oo-ui-widget oo-ui-widget-enabled oo-ui-iconElement-icon oo-ui-icon-articleSearch oo-ui-iconElement oo-ui-labelElement-invisible oo-ui-iconWidget"></span><span id="mw-fr-revisiontoggle" aria-disabled="false" title="show/hide details" class="fr-toggle-arrow oo-ui-widget oo-ui-widget-enabled oo-ui-indicatorElement-indicator oo-ui-indicator-down oo-ui-indicatorElement oo-ui-labelElement-invisible oo-ui-indicatorWidget"></span></div> <div id="mw-fr-revisiondetails-wrapper" style="position:relative;"><div id="mw-fr-revisiondetails" class="flaggedrevs_short_details" style="display:none">This is the <a href="/wiki/Wikipedia:Pending_changes" title="Wikipedia:Pending changes">latest accepted revision</a>, <a class="external text" href="https://en.wikipedia.org/w/index.php?title=Special:Log&amp;type=review&amp;page=Mango">reviewed</a> on <i>30 June 2021</i>.</div> </div> </div> </div> <div id="contentSub2"></div> <div id="jump-to-nav"></div> <a class="mw-jump-link" href="#mw-head">Jump to navigation</a> <a class="mw-jump-link" href="#searchInput">Jump to search</a> <div id="mw-content-text" class="mw-body-content mw-content-ltr" lang="en" dir="ltr"><div class="mw-parser-output"><div role="note" class="hatnote navigation-not-searchable">This article is about the fruit. For other uses, see <a href="/wiki/Mango_(disambiguation)" class="mw-disambig" title="Mango (disambiguation)">Mango (disambiguation)</a>.</div> <p class="mw-empty-elt"> </p> <div class="shortdescription nomobile noexcerpt noprint searchaux" style="display:none">Species of fruit</div> <p class="mw-empty-elt"> </p> <div class="thumb tright"><div class="thumbinner" style="width:222px;"><a href="/wiki/File:Hapus_Mango.jpg" class="image"><img alt=`
    // })
    // console.log(`seeded ${usersContent}`)
    console.log(`seeded successfully`)
    return {
        users: {
            vickie: usersRef[0],
        }
    }
}
seed()

// Automatically allow cross-origin requests
app.use(cors);

app.get('/', async (req, res) => {
  try {
  const user = db.collection('users').doc('vickie@mail.com');
  const doc = await user.get();
//   if (!doc.exists) {
//     console.log('No such document!');
//   } else {
//     console.log('Document data:', doc.data());
//   }
  const result = doc.data()
  res.send(`
    <!doctype html>
    <head>
      <title>title</title>
      <link rel="stylesheet" href="/style.css">
      <script src="/script.js"></script>
    </head>
    <body>
      <p>user:</p>
        <span id="bongs">${result.firstName}</span></p>
        <span id="bongs">${result.lastName}</span></p>
        <span id="bongs">${result.email}</span></p>
      <button onClick="refresh(this)">Refresh</button>
    </body>
  </html>`);
  } catch (error) {
    console.error(error)
  }
});

// app.get('/', (req, res) => {
//   const date = new Date();
//   const hours = (date.getHours() % 12) + 1;
//   res.send(`
//     <!doctype html>
//     <head>
//       <title>Time</title>
//       <link rel="stylesheet" href="/style.css">
//       <script src="/script.js"></script>
//     </head>
//     <body>
//       <p>In London, the clock strikes:
//         <span id="bongs">${'BONG '.repeat(hours)}</span></p>
//       <button onClick="refresh(this)">Refresh</button>
//     </body>
//   </html>`);
// });

// app.get('/api', (req, res) => {
//   const date = new Date();
//   const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
//   res.json({bongs: 'BONG '.repeat(hours)});
// });

exports.app = functions.https.onRequest(app);

