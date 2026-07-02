## Overview

## This project is a Playwright-based UI automation framework developed using the Page Object Model (POM).

# Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

---

# Project Structure

```
testOnsetto
│

├── fixtures/
│   └── test-fixture.ts
├── pages/
│   ├── AccountSettingPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── account.spec.ts
├── test-results/
├── playwright-report/
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Features

- Page Object Model (POM)
- Reusable fixtures
- Happy path testing
- Negative validation testing
- HTML reports
- Environment variable support

---

# Prerequisites

Install the following before running the project:

- Node.js (v18 or later recommended)
- npm

Verify installation:

```bash
node -v
npm -v
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```text
BASE_URL=

USER_EMAIL=
USER_PASSWORD=
USER_OTP=
```

---

# Running Tests

Run all tests:

```bash
npx playwright test
```

Run only the account tests:

```bash
npx playwright test tests/account.spec.ts
```

Run a single test by name:

```bash
npx playwright test --grep "Update bank and payment details"
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run with the Playwright UI:

```bash
npx playwright test --ui
```

Debug a test:

```bash
npx playwright test --debug
```

---

# Reports

Open the HTML report after execution:

```bash
npx playwright show-report
```

---

# Current Test Coverage

## Login

- Login with valid credentials
- OTP verification
- Successful authentication

---

## Account Settings

### Happy Path

- Update bank routing number
- Update bank account number
- Save bank details

---

### Negative Tests

- Invalid routing number
- Invalid account number

Additional negative scenarios can be added for:

- Invalid card number
- Expired card
- Invalid expiry month
- Invalid expiry year
- Invalid CVC
- Empty mandatory fields

---

# Framework Design

The framework follows the Page Object Model.

## LoginPage

Responsible for:

- Opening the login page
- Entering email
- Entering password
- Clicking Sign In
- Entering OTP
- Completing authentication

---

## AccountSettingPage

Responsible for:

- Navigating to the Account page
- Entering bank details
- Saving bank details
- Entering payment card details
- Saving payment details
- Validating success and error messages



# Best Practices Followed

- Page Object Model
- Reusable locators
- Reusable methods
- Separation of test logic and page logic
- Relative navigation using `baseURL`
- Environment variables for secrets
- Assertions kept out of test setup where appropriate
- Descriptive test names

---

# Security

Sensitive information such as URLs and credentials is managed using environment variables.

Example `.env`

---

# Troubleshooting

## Login redirects back to the login page

Possible causes:

- Incorrect credentials
- Invalid OTP
- Expired session
- Missing environment variables

---

## HTML report

Run:

```bash
npx playwright show-report
````

after a test execution.

---
