# 🎭 Playwright Automation Framework (DemoQA)

![Playwright](https://img.shields.io/badge/Playwright-%23121011.svg?style=for-the-badge&logo=playwright&logoColor=green)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-%23D24939.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📖 Overview

This project is a **Playwright-based end-to-end automation testing framework** built using **JavaScript (Node.js)**.  
It automates test cases for the public website [DemoQA](https://demoqa.com/).

The repository is created for both **learning** and **professional** QA automation purposes, designed to handle:

- Smoke Testing ✅
- Sanity Testing ✅
- Regression Testing ✅
- Parallel Test Execution ✅
- CI/CD Integration with GitHub Actions or Jenkins ⚙️

---

## 🧰 Tech Stack

| Tool / Library                | Description                             |
| ----------------------------- | --------------------------------------- |
| **Playwright**                | Modern E2E automation testing framework |
| **Node.js**                   | JavaScript runtime environment          |
| **GitHub Actions / Jenkins**  | Continuous Integration & Delivery       |
| **Allure Reports (optional)** | Advanced reporting integration          |

---

## 🗂️ Project Structure

```
playwright-automation/
├── tests/
│   ├── smoke/
│   ├── sanity/
│   ├── regression/
│
├── pages/
│   ├── base/
│   │   └── BasePage.js
│   └── elements/
│       └── ButtonsPage.js
│
├── utils/
│   └── helpers.js
│
├── playwright.config.js
├── package.json
├── README.md
└── .github/
    └── workflows/
        └── playwright-ci.yml
```

---

## ⚙️ Dependencies

Installed via npm:

```bash
npm install --save-dev @playwright/test @types/node
```

### Optional (for reports)

```bash
npm install --save-dev allure-playwright
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nurularifin83/demoqa-playwright-tests.git
cd <your-repo-name>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Tests

Run all tests:

```bash
npx playwright test
```

Run specific tagged tests (e.g., regression):

```bash
npx playwright test --grep "@regression"
```

Run in headed mode (visible browser):

```bash
npx playwright test --headed
```

Run in parallel (default):

```bash
npx playwright test --workers=4
```

---

## 📊 View Reports

Generate and open Playwright HTML report:

```bash
npx playwright show-report
```

(Optional) If using Allure:

```bash
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

## 🔄 CI/CD Integration (GitHub Actions)

This project includes a GitHub Actions workflow for CI/CD automation.

**Workflow file:**  
`.github/workflows/playwright-ci.yml`

### Example Workflow:

```yaml
name: Playwright Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm ci

      - name: Run Playwright Tests
        run: npx playwright test --reporter=html
```

---

## 🎯 Learning Goals

This project helps you understand how to:

- Build scalable **Playwright automation frameworks**
- Apply **Page Object Model (POM)** in JavaScript
- Execute **parallel test suites**
- Integrate Playwright tests with **CI/CD pipelines**
- Improve test stability using **retry logic** and **error handling**

---

## 🤝 How to Contribute

You can contribute by:

1. Forking the repository 🍴
2. Creating a new branch ✨
3. Making improvements or fixing bugs 🛠️
4. Submitting a Pull Request 🚀

---

## 👨‍💻 Author

**Nurul Arifin**  
Automation Engineer | Passionate about Test Automation & CI/CD  
💼 Selenium • Playwright • Jenkins • GitHub Actions • Java • JavaScript

---

## 🧾 License

This project is open-source and available under the **MIT License**.

---

## 🌟 Support

If this project helps you, please give it a ⭐ on GitHub — it means a lot!
