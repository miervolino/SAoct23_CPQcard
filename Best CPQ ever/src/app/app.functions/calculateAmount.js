// Import the axios library for making HTTP requests
const axios = require('axios');

// Function to update the deal record
async function updateDeal(dealId, amount) {
  try {
    // HubSpot API endpoint for updating a deal
    const endpoint = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

    // Your HubSpot API key
    const apiKey = '<YOUR_PRIVATE_APP_KEY>';

    // Construct the request body
    const requestBody = {
      properties: [
        {
          name: 'amount', // Assuming 'amount' is the property to update
          value: amount
        }
      ]
    };

    // Send the PATCH request to update the deal
    const response = await axios.patch(endpoint, requestBody, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Deal updated successfully!', response.data);
  } catch (error) {
    console.error('Error updating deal:', error.response.data);
  }
}

// Usage example
const dealId = '15609565755';
const amount = 15000;

updateDeal(dealId, amount);
/*
// for HubSpot API calls
const hubspot = require('@hubspot/api-client');

// Initialize HubSpot API client
const hubspotClient = new hubspot.Client({
  accessToken: "<YOUR_PRIVATE_APP_KEY>",
});


// Entry function of this module, it creates a quote together with line items
exports.main = async (context = {}, sendResponse) => {
  const { hs_object_id } = context.propertiesToSend;
  const { calculatedAmount } = context.event.amount;
  const request = {
    properties: {
      amount: calculatedAmount
    }
  };
  return await hubspotClient.crm.deals.basicApi.update(15609565755, request);
  // return await hubspotClient.crm.quotes.basicApi.create(request);
  
};
*/