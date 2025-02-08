node {
    properties([
        pipelineTriggers([pollSCM('H/2 * * * *')])
    ])

    stage('Build') {
        docker.image('node:16-buster-slim').inside('-p 3000:3000') {
            sh 'npm install'
        }
    }

    stage('Test') {
        docker.image('node:16-buster-slim').inside('-p 3000:3000') {
            sh './jenkins/scripts/test.sh'
        }
    }

    stage('Manual Approve') {
        docker.image('node:16-buster-slim').inside('-p 3000:3000') {
            input message: 'hentikan Deploy? (Klik "Proceed" untuk mengakhiri)'
            
            sh './jenkins/scripts/kill.sh'
        }
    }

    stage('Deploy') {
        docker.image('node:16-buster-slim').inside('-p 3000:3000') {
            sh './jenkins/scripts/deliver.sh'

            echo 'Aplikasi berjalan selama 1 menit...'
            sleep(time: 60, unit: 'SECONDS')
            
            sh './jenkins/scripts/kill.sh'
        }
    }
}
