
// for HubSpot API calls
const hubspot = require('@hubspot/api-client');

// Initialize HubSpot API client
const hubspotClient = new hubspot.Client({
  accessToken: process.env['PRIVATE_APP_ACCESS_TOKEN'],
});

// Entry function of this module, it creates a quote together with line items
function calculateAmount(dealId, amount) {
  console.log("here")
  //const dealId = '15546494580';
  const request = {
    properties: {
      amount: amount
    }}
  return hubspotClient.crm.deals.basicApi.update(dealId, request);
}

// Entry function of this module
exports.main = (context = {}, callback) => {
  //console.log("Beginning of async");

  const { hs_object_id } = context.propertiesToSend;
  const amount = context.parameters.amount;

  /*const request = {
    properties: {
      amount: amount
    }}
  return hubspotClient.crm.deals.basicApi.update(hs_object_id, request); */
  const message = calculateAmount(hs_object_id, amount)
  callback({
    statusCode: 200,
    body: {message: message}
});
};