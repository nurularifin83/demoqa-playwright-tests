pipeline {
    agent any

    parameters {
        booleanParam(name: 'RUN_REGRESSION', defaultValue: false, description: 'Run regression tests?')
    }

    environment {
        CI = "true"
        HEADLESS = "true"
    }

    stages {
        stage('📥 Checkout Repository') {
            steps {
                echo "Checking out repository..."
                checkout scm
            }
        }

        stage('⚙️ Setup Node.js') {
            steps {
                echo "Setting up Node.js..."
                // If you use Jenkins NodeJS plugin, use 'tools' block instead.
                sh 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -'
                sh 'sudo apt-get install -y nodejs'
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo "Installing dependencies..."
                sh 'npm ci'
            }
        }

        stage('🌐 Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                sh 'npx playwright install --with-deps'
            }
        }

        stage('🔥 Run Smoke Tests') {
            steps {
                echo "Running Smoke Suite..."
                sh '''
                    npx playwright test --grep @smoke --reporter=line,allure-playwright,html || exit 1
                '''
            }
        }

        stage('🧩 Run Sanity Tests') {
            steps {
                echo "Running Sanity Suite..."
                sh '''
                    npx playwright test --grep @sanity --reporter=line,allure-playwright,html || exit 1
                '''
            }
        }

        stage('🧬 Run Regression Tests') {
            when {
                expression { return params.RUN_REGRESSION == true }
            }
            steps {
                echo "Running Regression Suite..."
                sh '''
                    npx playwright test --grep @regression --reporter=line,allure-playwright,html
                '''
            }
        }

        stage('📊 Archive Reports') {
            steps {
                echo "Archiving HTML and Allure reports..."
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
                archiveArtifacts artifacts: 'allure-results/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline finished. Cleaning up..."
            cleanWs()
        }
    }
}
