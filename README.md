## For developers
### Installation


All microservice basic dependencies are listed in the package.json file, hence there is no need to install any global packages. Simply run npm install.

```
npm install
```

**NOTE:** if you required additional packages, ensure you install using --save-exact so that your project is compatible when other developers contribute.

Example:

```
npm install axios --save --save-exact
```

### Start development server
```
npm start
```



#### Installation
1. clone solution
    To install the solution, first clone the repo to the host server
    ```
    https://github.com/etizaz98/prixsy-backend.git
    ```
    In some cases, you may need to activate your ssh-agent to link your local private key to the command in the following manner:
    ```
    eval $(ssh-agent -s) && $(ssh-add /path/to/your/.ssh/id_rsa; git pull https://github.com/etizaz98/prixsy-backend.git)
    ```

2. build docker container
   simply run
   ```
   docker build . to create image
   ```

### Technical users

The microservice has the following  urls
For Testing
* http://localhost:port/api/v1/prixsy                      - To fetch images based on topic or search
For Ping
* http://localhost:port/api/v1/prixsy/categories                    - To fetch images based on categories


In case of any issue kindly write me an email to : etizaz7ahsan@gmail.com Thank you
