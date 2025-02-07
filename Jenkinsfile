pipeline {
    agent {
        docker {
            image 'node:16-buster-slim'
            args '-p 3000:3000'
        }
    }
    triggers {
        pollSCM('H/2 * * * *') // Cek commit baru setiap 2 menit
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'reat-app', url: '/home/Documents/develop/learn-devops/a428-cicd-labs'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Deploy') { 
            steps {
                sh './jenkins/scripts/deliver.sh'

                echo 'Aplikasi berjalan selama 1 menit...'
                sleep(time: 60, unit: 'SECONDS')  // Menunggu 1 menit
                
                sh './jenkins/scripts/kill.sh'
            }
        }
    }
}
