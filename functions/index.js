/* index.js
 * Copyright (c) 2019-2021 by David Asher, https://github.com/david-asher
 *
 * This cloud function must be deployed to the firebase account in order to 
 * pass a custom token back to the main app (node.js) after a browser-based 
 * login completes, so that the main app can sign in with the same user
 * credential.
 * 
 * The firebase tools Command Line Interface (CLI) must be installed.
 *      npm install -g firebase-tools
 *      see: https://github.com/firebase/firebase-tools
 * 
 * This file is pushed to the firebase cloud functions with the command:
 *      firebase deploy 
 */

const functions = require("firebase-functions/v1");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

initializeApp();

const customToken = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Sign in first.");
  }
  return getAuth().createCustomToken(context.auth.uid);
});

module.exports = { customToken };
