# Magnified - Cryptid Tracker

![Magnified - Cryptid Tracker](./client/public/assets/readme/readme1.jpg)

Magnified is a front-end capstone project developed by [Hewson Schulz](https://github.com/HewsonSchulz) during his time at [Nashville Software School](https://nashvillesoftwareschool.com/). It is a web application designed to log and compare cryptid sightings and encounters.

## Usage

To run this project locally, follow these steps:

1. **Start the JSON Server**:

   - Navigate to the `api` directory of the project in your terminal.
   - Run the following command to start the JSON Server, which will simulate a backend server:
     ```
     npx json-server database.json -p 8088
     ```
     _NOTE: The default port is set to `8088`. Should you decide to change this number, you will also need to change the `apiUrl` variable within the `helper.js` file to match your new port number._

2. **Start the Application**:

   - In a seperate terminal window, navigate to the `client` directory of the project.
   - Run the following command to start the application:
     ```
     npm start
     ```

3. **View the Site**:
   - If it does not open automatically, you can access the site by opening your web browser and navigating to `http://localhost:3000`.
