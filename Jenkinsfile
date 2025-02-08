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
        script {
            def userInput = input message: 'Hentikan Deploy?', 
                parameters: [
                    choice(name: 'Pilih', choices: ['Ya', 'Tidak'], description: 'Pilih "Ya" untuk menghentikan deploy, atau "Tidak" untuk lanjut ke deploy.')
                ]

            if (userInput == 'Ya') {
                echo "Deploy dihentikan oleh user."
                docker.image('node:16-buster-slim').inside('-p 3000:3000') {
                    sh './jenkins/scripts/kill.sh'
                }
                error "Pipeline dihentikan sesuai permintaan."
            }
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
