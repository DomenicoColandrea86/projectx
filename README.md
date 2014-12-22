# PROJECT X #
<hr>

### A PROJECT BUILT WITH THE MEAN STACK
[MongoDB](http://www.mongodb.org/), [Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/), and [AngularJS](http://angularjs.org/)
##### This project is a work in progress and may or may not work. I havent figured out what to build or what to call it so for now it is only known as .... projectx


## Prerequisites

####  Install Vagrant ####

* Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
* Download and install [Vagrant](https://www.vagrantup.com/downloads.html)

#### Install VirtualBox Guest Additions Plugin

    vagrant plugin install vagrant-vbguest

#### Install Librarian-puppet

    gem install librarian-puppet

#### Running in a secure environment
To run your application in a secure manner you'll need to use OpenSSL and generate a set of self-signed certificates

 `````sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /$PATH/server.key -out /$PATH/server.crt`````
 
Make sure to update your ````nginx.conf```` file accordingly.


## Kickoff development workflow ##

##### cd into ````/projectx```` and run ####

Pull in dependencies using npm and bower

    npm install

Start the virtual machine:

    grunt init
    
##### cd into ````/projectx_core```` and run ####

Connect to the virtual machine via ssh:

    vagrant ssh


#### Finally, Launch the app ###

##### After you SSH into your box, goto ````/vagrant/code/projectx```` ####


    npm start
    
## Environment Details

`````
* Application URL = dev.projectx.com
* Application port = 3000
* Application Server IP = 192.168.22.10
`````

Launch the homepage [https://dev.projectx.com]
[https://dev.projectx.com]: https://dev.projectx.com

##Don't forget to... 

#### update your host file

````127.0.0.1 dev.projectx.com````

#### update your ````.npmrc```` file
````vagrantPath = /$PATH_TO_VAGRANTFILE/projectx/projectx_core````
