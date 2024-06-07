pipeline {
  agent {
    docker {
      image 'node'
      args '-v /web-code/vitepress-blog:/web-code/vitepress-blog:rw'
    }

  }
  stages {
    stage('Initial') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build:doc'
      }
    }

    stage('Update file to nginx') {
      steps {
        sh 'rm -rf /web-code/vitepress-blog/* && cp -r ./.vitepress/dist/* /web-code/vitepress-blog'
      }
    }

    stage('Clean workspace') {
      steps {
        cleanWs(deleteDirs: true, cleanupMatrixParent: true, cleanWhenUnstable: true, cleanWhenSuccess: true, cleanWhenNotBuilt: true, cleanWhenFailure: true, cleanWhenAborted: true)
      }
    }

  }
}