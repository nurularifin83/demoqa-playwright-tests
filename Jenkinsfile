pipeline {

    parameters {
        booleanParam(
            name: 'RUN_REGRESSION',
            defaultValue: false,
            description: 'Run regression tests?'
        )
    }

    agent any

    tools {
        nodejs 'NodeJS 18' // 👈 configure in Jenkins > Global Tool Configuration
    }

    environment {
        HEADLESS = "true"
        CI = "true"
        PATH = "C:\\Program Files\\nodejs;${PATH}"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/nurularifin83/demoqa-playwright-tests'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                bat 'call npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "🌐 Installing Playwright browsers..."
                bat 'call npx playwright install --with-deps'
            }
        }

        stage('Smoke Tests') {
            steps {
                script {
                    echo "🔥 Running Smoke Tests..."
                    def rc = bat(returnStatus: true, script: 'npx playwright test --grep @smoke --reporter=line,allure-playwright,html')
                    if (rc != 0) {
                        error "❌ Smoke tests failed — aborting pipeline!"
                    }
                }
            }
        }

        stage('Sanity Tests') {
            steps {
                script {
                    echo "🧠 Running Sanity Tests..."
                    def rc = bat(returnStatus: true, script: 'npx playwright test --grep @sanity --reporter=line,allure-playwright,html')
                    if (rc != 0) {
                        error "❌ Sanity tests failed — aborting pipeline!"
                    }
                }
            }
        }

        stage('Regression Tests') {
            when {
                expression { return params.RUN_REGRESSION == true }
            }
            steps {
                echo "🧪 Running Regression Tests..."
                bat 'call npx playwright test --grep @regression --reporter=line,allure-playwright,html'
            }
        }

        stage('Publish Reports') {
            steps {
                echo "📊 Publishing Playwright & Allure Reports..."

                // HTML Report
                publishHTML(target: [
                    reportName: 'Playwright HTML Report',
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])

                // Archive reports
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up workspace..."
            cleanWs()

            // Show Allure results in Jenkins tab
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-results']]
            ])

            echo "✅ Pipeline Finished Successfully!"
        }
    }
}
