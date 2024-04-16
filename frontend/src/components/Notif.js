import React, { useState, useEffect } from 'react';
import { jwtDecode, InvalidTokenError } from "jwt-decode";
import axios from 'axios'; 


class Notif  {
   sound = new Audio('bloop.mp3'); 
   constructor() {
    this.sound = new Audio('bloop.mp3');  // Load sound
}
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
 formatDueDate = (dueDateArray) => {
  return new Date(dueDateArray[0], dueDateArray[1] - 1, dueDateArray[2], dueDateArray[3], dueDateArray[4]);
};
     fetchTimers = async () => {
        try {
          console.log(`Fetch timers with id ${this.getIdFromToken()}`)
          const response = await axios.get(`http://localhost:8090/userTimers/${this.getIdFromToken()}`); // Adjust endpoint as needed
          console.log("Response: ", response);
          console.log("fetching timers for notifaction system")
          const currentDate = new Date();

          console.log(`cur time: ${currentDate}`)
          console.log(response.data);
          response.data.forEach(timer => {
            
            var dateInst = new Date(timer.dueDate)
            
            console.log("date inst " + dateInst)
            var timeDue = dateInst.getTime() - currentDate.getTime();
            console.log("now " + currentDate)

            if (timeDue >= 0) {  
            console.log("Time due: ", timeDue);
            setTimeout(
              () => {
                console.log("BLEEP")
                alert(`${timer.description} is due`);
                //this.sound.play(); //doesnt work rn
              },
              timeDue
            );
            }
          });

        } catch (error) {console.error("Error fetching timers:", error);}
      };
  getTimeLefts = () => {

 }

 

};

export default Notif;
