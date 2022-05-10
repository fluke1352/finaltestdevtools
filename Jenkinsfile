pipeline {
    agent any
stages {
   stage('Pull code') {
       steps {
           checkout scm
       }
   }
   stage('Download front dependency') {
       steps {
           dir('front-end') {
               sh 'npm install'
           }
       }
   }
   stage('Download back dependency') {
       steps {
           dir('back-end') {
               sh 'npm install'
           }
       }
   }
   stage('Run unit test') {
        steps {
              echo "pass"
        }
   }
  
    stage('Run Component testing') {
        steps {
              echo "pass"
        }
   }
  
   stage('Build') {
       steps {
           
          dir('front-end') {
               sh 'npm run build'
           }
       }
   }
    
   stage('Deployment') {
        steps{
                withCredentials([string(credentialsId: 'T09_host', variable: 'T09Host'), string(credentialsId: 'T09_FRONTEND_USERNAME', variable: 'T09Username'), string(credentialsId: 'T09_FRONTEND_PASS', variable: 'T09Pass')]) {
                script {
                def remote = [:]
                remote.name = 'T09'
                remote.host = "${T09Host}"
                remote.user = "${T09Username}"
                remote.password = "${T09Pass}"
                remote.allowAnyHosts = true
                sshCommand remote: remote, command: "git clone https://github.com/fluke1352/DEVELOPMENT-TOOLS-GET-A-PLUS.git"
                sshCommand remote: remote, command: "docker-compose -f DEVELOPMENT-TOOLS-GET-A-PLUS/docker-compose-deploy-front.yml up -d"
                sshCommand remote: remote, command: "rm -r DEVELOPMENT-TOOLS-GET-A-PLUS"
                    
                }
          
               }
        }       
      }
          
   }
 }
