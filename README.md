# README #

This is the repository for Andre's practice application with a MEAN application (First attempt)

I would like to heavily emphasize the word _practice_.

### Example ###
Demo application running at www.academiclifehelper.com
### Required Installations ###
* NodeJS
* MongoDB

**Must** have [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) set up with an admin account & run `mongod.exe` (Windows) or `sudo service mongod start` (Linux)
before continuing
### How do I get set up? ###

* git clone https://github.com/avasconcelos114/academiclifehelper.git
* cd academiclifehelper/Academic_Life_Helper/
* Edit server.js to add in :
  * your mongo DB server info on `var MongoDB = 'mongodb://yourusername@127.0.0.1:27017/admin'`
  * desired port to run ALH on `app.listen(1337);` (standard value set as 1337)
* npm install
* node server.js
* visit localhost:1337 (or your updated port) to view page
