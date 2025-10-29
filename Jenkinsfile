pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    options {
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                echo "📥 Checking out source code..."
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                echo "⚙️ Setting up Node.js ${env.NODE_VERSION}"
                tool name: "NodeJS ${env.NODE_VERSION}", type: 'nodejs'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing dependencies..."
                bat 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "🧪 Running Playwright tests..."
                bat 'npx playwright test --reporter=line,html,allure-playwright'
            }
        }

        stage('Publish Reports') {
            steps {
                echo "📊 Archiving reports..."
                archiveArtifacts artifacts: 'playwright-report/**/*, allure-results/**/*', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "🧹 Cleaning up workspace..."
            cleanWs()
        }
        success {
            echo "✅ Tests completed successfully!"
        }
        failure {
            echo "❌ Some tests failed. Check the report artifacts."
        }
    }
}
