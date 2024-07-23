# Pastorebot: PSG Google Sheet Ticket Raffle

This repository contains scripts for managing ticket raffles for PSG football matches. It automates the process of setting up pages with the correct pricing and date details for each match.

## Overview

When a PSG football match is scheduled, these scripts help in initializing pages with the necessary information. Following this setup, a raffle is conducted to distribute the tickets.

## Setup Instructions

### Clone the project
```bash
git clone https://github.com/sunix/pastorebot
cd pastorebot
```

### Initialize the google app project
Edit .clasp.json
Replace the root folder and the Google App Script ID from your Googleapp project

### Making Modifications

After setting up the repository, you can make necessary modifications to the scripts.

### Synchronizing Changes

Once your modifications are complete, synchronize them with the main Google App Script repository:

```bash
clasp push
```

## Additional Configuration

- **Google App Script ID:** The example uses a placeholder script ID. Set up your own script and create or update the `.clasp.json` file accordingly.

## Initial Repository Setup

Here's how I setted up this repository for the first time, from an existing Google appscript:

0. **Login**
   ```bash
   clasp login
   ```

1. **Create and navigate to the project directory:**

   ```bash
   mkdir pastorebot
   cd pastorebot/
   ```

2. **Clone the project using `clasp`:**

   ```bash
   clasp clone 1Ab2Cd3EfGh_IjKlMnO--pQrStUvWxYz456-7890wJXsQNiKvJidRAUra
   ```
   **Note:** The above Google App Script ID is a placeholder. You'll need to replace it with your actual script ID.

3. **Review the cloned files:**

   The clone operation should retrieve files like `appsscript.json` and `Code.js`. Pay attention to any files that are not ignored by `.clasp`.

4. **Open the project in your code editor:**

   ```bash
   code .
   ```

