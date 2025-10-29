# 🎭 Playwright Automation Framework (DemoQA)

![Build Status](https://github.com/nurularifin83/demoqa-playwright-tests/actions/workflows/playwright-ci.yml/badge.svg?branch=main)
![Playwright](https://img.shields.io/badge/Playwright-%23121011.svg?style=for-the-badge&logo=playwright&logoColor=green)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-%23D24939.svg?style=for-the-badge&logo=jenkins&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📖 Overview

This project is a **Playwright-based end-to-end automation testing framework** built using **JavaScript (Node.js)**.  
It automates test cases for the public website [DemoQA](https://demoqa.com/).

The repository is created for **learning** QA automation purposes, designed to handle:

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
│   ├── BasePage.js
│   ├── HomePage.js
│   └── elements/
│   │  └── ....spec.js
│   └── AWS/
│      └── ....spec.js
│   └── forms/
│      └── ....spec.js
│
├── utils/
│   └── helpers.js
│   └── config.js
│
├── playwright.config.js
├── package.json
├── README.md
├── Jenkinsfile
└── .github/
    └── workflows/
        └── playwright-ci.yml
```

---

## ⚙️ Dependencies

Installed via npm:

```bash
npm init playwright@latest
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
cd <your-folder-name>
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
npx playwright test --workers=3
```

---

## 📊 View Reports

Generate and open Playwright HTML report:

```bash
npx playwright show-report
```

(Optional) If using Allure:

```bash
npm run allure:generate
npm run allure:open
```

---

## 🔄 🤖 CI/CD Integration (GitHub Actions & Jenkins)

This project includes two CI/CD pipelines — one with GitHub Actions and another with Jenkins — to ensure continuous testing and delivery.

---

### 🚀 GitHub Actions

---

Runs automatically whenever you push new code to the main branch.

**Workflow file:**
`.github/workflows/playwright-ci.yml`

The workflow performs:

1. Checkout code
2. Setup Node.js environment
3. Install dependencies
4. Run Playwright tests in headless mode
5. Upload test reports and artifacts

You can view the results in your GitHub Actions tab.

#### Manual trigger option:

- `run_regression` → set to `true` if you want to include regression tests (via the `Run workflow` button in the Actions tab).

### 🧩 Jenkins Pipeline

---

A Jenkinsfile is included to integrate this project with Jenkins CI/CD for more flexible control.

**File:**
`Jenkinsfile`

The pipeline performs:

1. Checkout the project from GitHub
2. Setup Node.js environment
3. Run Smoke, Sanity, and optionally Regression tests
4. Generate and publish Playwright HTML or Allure Reports
5. Archive reports and test results

You can trigger builds manually with the parameter:

- `RUN_REGRESSION` → set to `true` if you want to include regression tests.

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
