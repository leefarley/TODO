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
* Click on your username in the top right of the website and select "Security Credentials"
* Create a new access key (Access Key ID and Secret Access Key)
* Save the generated credentials somewhere sercure.

## Deploy app 
* Open a command prompt in your project directory
* if you do not have a git repo create one, add the files and commit. 

> The ElasticBeanstalk tools will hook into your git branch and deploy the latest commit

* Enter the following command : ```eb init```
* You will then be prompted for a environment name and  and the Elastic Beanstalk instance that the deployment will generate, the key pair to use and the type of deployment (NodeJS)
* You will also be prompted for the Access Key ID and Secret Access Key generated earlier
* Enter the following command: ```eb create```


## Install mongoDB on the EC2 instance
* Install Putty tools (http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
* Open PuttyGen.
* Click on load and select the downloaded private key from the key pair you generated
* Save the private key in the .ppk format so putty can read it
* Open the AWS portal and navigate to the EC2 service 

> Elastic Beanstalk automates the process of deploying web applications to EC2 Instances, You could alternativly spin up a EC2 instance and deploy yourself but it would require installing all dependancies manually

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


# Scaffold app 

## Node Setup
* Download Node (https://nodejs.org/)
* Install Node
* Restart any consloe windows to add Node to your PATH.

## Mongo DB Setup
* Download and install Mongo DB (https://www.mongodb.org/downloads)
* Open command line and run the following commands

> mkdir C:\mongodb\data\db  
> "c:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath c:\mongodb\data

* leave the command line open while developing.

## Command line setup
Open another command prompt and run the following commands
* npm install -g bower express 
* mkdir todo
* cd todo
* express todo
* node bin/www


# References
* Angular Fullstack Generator (https://github.com/angular-fullstack/generator-angular-fullstack)
* Deploy a OSS website in Azure (https://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)
* DocDB and NodeJs (https://azure.microsoft.com/en-us/documentation/articles/documentdb-nodejs-application/)
# Notes

* Is Azure well set-up for dev/test scenarios on new apps (especially those being built on open source technology)
* OSS experience on Azure compared to AWS
* Visual studio experience on Azure compared to AWS
* What we are missing in visual studio to use as a true cross platform application (compared to our competitive set)? 
* Is open source more easily connected to AWS?
* Seems to be a tendency for dev/test to focus on sustaining existing applications vs. focusing on new apps 
* What kind of OSS applications are being built today (Apache Casandra, Data Stacks, Open Stack, NoSQL) – what are the 1-3 Open Source scenarios happening on the Enterprise side.


https://github.com/SIB-Colombia/dataportal-explorer/wiki/How-to-install-node-and-mongodb-on-Amazon-EC2
https://docs.mongodb.org/ecosystem/platforms/amazon-ec2/

 



