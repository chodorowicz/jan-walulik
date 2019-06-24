require("dotenv").config()

const _ = require("lodash")
var mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API,
  domain: process.env.MAILGUN_DOMAIN,
  host: "api.eu.mailgun.net",
})

const common = require("./src/common")
const { getAutoRespondMessageContent, statusCode, headers } = common

const from = `jan@${process.env.MAILGUN_DOMAIN}`

const sendThankYouEmail = async ({ email, message, name, pot }) => {
  return new Promise((resolve, reject) => {
    const personEmail = `${name} <${email}>`
    const sgEmail = {
      to: process.env.EMAIL_TO,
      from,
      replyTo: personEmail,
      subject: "Contact form: walulik.aero",
      text: message,
    }

    const autoRespondEmail = {
      to: personEmail,
      from,
      subject: "Contact form: walulik.aero",
      html: getAutoRespondMessageContent(),
    }

    console.log("Sending the email")
    console.log(sgEmail, "pot", pot)
    console.log(autoRespondEmail, "pot", pot)
    if (!_.isNil(pot) && pot !== "") {
      console.log("bot, cancelling")
      reject()
      return
    }

    mailgun.messages().send(sgEmail, function(error, body) {
      console.log(body)
    })

    mailgun.messages().send(autoRespondEmail, function(error, body) {
      console.log(body)
    })

    resolve()
  })
}

exports.handler = function sendEmail(event, _context, callback) {
  if (event.httpMethod !== "POST") {
    callback(null, {
      statusCode,
      headers,
      body: "",
    })
    return
  }

  const body = JSON.parse(event.body)

  sendThankYouEmail(body)
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: "thank you",
        headers,
      })
    })
    .catch(error => {
      callback(null, {
        statusCode: 404,
        body: "problem",
        headers,
      })
    })
}