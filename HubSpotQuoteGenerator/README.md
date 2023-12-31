# HubSpot Quote Generator - CPQ React-based Card

This project deplys a custom card meant to give to a Sales Rep the possibility to configure a HubSpot quote selecting the relative products and addons.
The original code produced durint the Solution Accelerator in Oct 2023 has been expanded, adding a few functionalities, in particular:
1. Choosing a custom pack, the user is also asked to select the level of the individual products added
1. Based on the products and levels selected, a minimum is applied to number of marketing contacts (also a maximum) and seats
1. For the marketing contacts, the user input will be increased to the closest minimum purchasable amount
1. The selections are kept when going Back
1. The Deal amount is updated to a currently-hard-coded amount of 1500

We recommend installing this sample in a Sandbox account.

## Quick Start

### Step 1: Update your CLI and & authenticate your account

1. Update to latest CLI version by running `npm install -g @hubspot/cli@latest`.
1. Run `hs init` if you haven’t already done so to create a config file for your parent account.
1. Run `hs auth` to authenticate your account. Alternatively, select your pre-authenticated account with `hs accounts use`.

### Step 2: Install dependencies

In the CLI, run `npm install` to install the dependencies for this project.

### Step 3: Upload project

Run `hs project upload`. Alternatively, if you’d like to build on this project, run `hs project dev` to kickoff the dev process and see changes reflected locally as you build.

### Step 4: Create a deal and view the card

HubSpot quotes are always associated with a deal record to track the progress of the quote. If you don’t have any deals in the account you’re using to view this sample, create a deal now.

1. In the main menu, select `Sales` > `Deals`.
1. Click `Create deal` in the top right hand corner and fill in all required fields. Click `create` once you’ve finished filling in your deal details.
1. Your new deal should appear in the `Deals table`. Select it and navigate to the `custom tab` in the middle pane to access the Shuttle bus quotes.
