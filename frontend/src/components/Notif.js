import React, { useState, useEffect } from 'react';
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import axios from 'axios'; 


class Notif  {
   sound = new Audio('bloop.mp3'); // Add your sound file path here

   getIdFromToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token); // Use jwtDecode directly
      console.log("Token: ", decodedToken);
      const userId = decodedToken.id;
      console.log("User ID: ", userId);
      return userId;
    }
};
     fetchTimers = async () => {
        try {
          console.log(`Fetch timers with id ${this.getIdFromToken()}`)
          const response = await axios.get(`http://localhost:8090/userTimers/${this.getIdFromToken()}`); // Adjust endpoint as needed
          response.data.array.forEach(element => {
            console.log(element + "element")
          });

        } catch (error) {console.error("Error fetching timers:", error);}
      };
  getTimeLefts = () => {

 }

 

};

export default Notif;
