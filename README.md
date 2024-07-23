# Pastorebot: PSG Google Sheet Ticket Raffle

This repository contains scripts for managing ticket raffles for PSG football matches. It automates the process of setting up pages with the correct pricing and date details for each match.

## Overview

These scripts help initialize pages with the necessary information whenever a PSG football match is scheduled. Following this setup, a raffle is conducted to distribute the tickets.

## Setup Instructions

### Clone the Project

```bash
git clone https://github.com/sunix/pastorebot
cd pastorebot
```

### Initialize the Google App Project

Edit the `.clasp.json` file:
1. Replace the root folder.
2. Replace the Google App Script ID with your project’s Script ID. You can find it in Extensions > Apps Script > Project Settings > Script ID.

### Login to Google App Script

```bash
clasp login
```

### Make Modifications

After setting up the repository, you can make necessary modifications to the scripts as needed.

### Synchronize Changes

Once your modifications are complete, synchronize them with the main Google App Script repository:

```bash
clasp push
```

## Additional Configuration

- **Google App Script ID:** The example uses a placeholder script ID. Set up your own script and update the `.clasp.json` file accordingly.

## Initial Repository Setup

Here’s how the repository was initially set up from an existing Google App Script:

### Login to Google App Script

```bash
clasp login
```

### Create and Navigate to the Project Directory

```bash
mkdir pastorebot
cd pastorebot/
```

### Clone the Project Using `clasp`

```bash
clasp clone 1Ab2Cd3EfGh_IjKlMnO--pQrStUvWxYz456-7890wJXsQNiKvJidRAUra
```
**Note:** The above Google App Script ID is a placeholder. Replace it with your actual script ID.

### Review the Cloned Files

The clone operation should retrieve files like `appsscript.json` and `Code.js`. Pay attention to any files not ignored by `.clasp`.

### Open the Project in Your Code Editor

```bash
code .
```
