# Demo App

The app used in this comparason is written in nodejs using the expressjs framework. Initially I created it using mongoDb as a backend locally so i could deploy it to AWS and converting the data layer to leverage documentDb when deploying to Azure. The tools used were sublime text for text editing and bower for retrieveing front end assets. 

The app is a simple single page app that has three endpoints to get todo tasks, create todo tasks and to complete todo tasks. The frontend code uses angular to utilize the full MEAN (MongoDb, ExpressJs, AngularJs, NodeJs) stack.

# Cloud Deployment Shootout

Both AWS and Azure provide simular products for deploying web apps but the experience and steps required are very different. AWS provides a set of custom command line tools that hook into you git repository to deploy your current branch. 
Whereas Azure provides a much wider and range of ways to deploy your web app to the cloud. you can setup a traditional git repo in azure to push you content to (no extra tools required) or have azure point to your current source control to pull changes or even your onedrive account.

# AWS

## Get tools
* Install Python2.7 and the AWS Elastic Beanstalk Cli tools (http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)

## Get credentials
* Sign into AWS and navigate to the EC2 service
* Click on the link to key pairs
* Create a new key pair

> The key pair will allow us to connect to the EC2 instance that is created as part of the deployment

* Click on your username in the top right of the website and select "Security Credentials"
* Create a new access key (Access Key ID and Secret Access Key)
* Save the generated credentials somewhere sercure.

## Deploy app 
* Open a command prompt in your project directory
* If you do not have a git repo create one, add the files and commit. 

> The ElasticBeanstalk tools will hook into your git branch and deploy the latest commit

* Enter the following command : ```eb init```
* You will then be prompted for a environment name and the Elastic Beanstalk instance that the deployment will generate, the key pair to use and the type of deployment (NodeJS)
* You will also be prompted for the Access Key ID and Secret Access Key generated earlier
* Enter the following command: ```eb create```

## Install mongoDB on the EC2 instance
* Install Putty tools (http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
* Open PuttyGen.
* Click on load and select the downloaded private key from the key pair you generated
* Save the private key in the .ppk format so putty can read it
* Open the AWS portal and navigate to the EC2 service 

> Elastic Beanstalk automates the process of deploying web applications to EC2 Instances, You could alternativly spin up a EC2 instance and deploy yourself but it would require installing all dependencies manually

* Select your newly deployed instance and get the Public DNS
* Enter the host name ec2-user@`<Your Public DNS>`
* Open the SSH tab and select auth
* Under authentication parameters click "Browse" and select the .ppk file created earlier
* Click open
* Once the console is logged in run the following commands :
    * Add the mongoDb repo source
    ```
    echo "[10gen]
    name=10gen Repository
    baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
    gpgcheck=0" | sudo tee -a /etc/yum.repos.d/10gen.repo
    ```  
    * Install MongoDB and the sysstat diagnostic tools
    ```
    sudo yum -y install mongo-10gen-server mongodb-org-shell
    sudo yum -y install sysstat
    ```
    * Create the data directories
    ```
    sudo mkdir /var/lib/mongo/data
    sudo mkdir /var/lib/mongo/log
    sudo mkdir /var/lib/mongo/journal
    ```
    * Set the storage items (data, log, journal) to be owned by the user (mongod) and group (mongod) that MongoDB will be starting under
    ```
    sudo chown mongod:mongod /var/lib/mongo/data
    sudo chown mongod:mongod /var/lib/mongo/log
    sudo chown mongod:mongod /var/lib/mongo/journal
    ```
    * Start MongoDb
    ```
    sudo chkconfig mongod on
    sudo /etc/init.d/mongod start
    ```
    
* Browse to your deployed web app.
    
    
# Azure

## Create Azure Website and database
* Login to the Azure
* Create a resource group
* Create a web app in the resource group
* create a documentDb instance in the resource group
* Navigate to the webapp and select the continous deployment option 
* Choose source of local Git Repository
* Navigate to the properties and select the Git Url
* Open a command prompt in you project directory
* If you do not have a git repo create one
* Change the database script to point to the document db version in the route/index.js file and credentials to point at your documentDb, add the files and commit.
* Run the following commands

> git remote add azure `<Your Git Url>`   
> git push azure

* Browse to your deployed web app. 

# References
* Angular Fullstack Generator (https://github.com/angular-fullstack/generator-angular-fullstack)
* Deploy a OSS website in Azure (https://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)
* DocDB and NodeJs (https://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/)
* Installing MongoDb on Amazon EC2(https://github.com/SIB-Colombia/dataportal-explorer/wiki/How-to-install-node-and-mongodb-on-Amazon-EC2)


 



