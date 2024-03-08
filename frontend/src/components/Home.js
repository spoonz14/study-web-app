import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "../axios-config";
import studyImage from "../components/StudyGroup.jpg";

const Home = () => {
  return (
    <div className="Home-container">
      <img src={studyImage} alt="studyImage" className="studyImage" />
      <div className="Home-header">
        <h1>Welcome to Studii</h1>
        <p>The ultimate study tool</p>
      </div>
      <div className="About-section">
        <h2>What Is Studii?</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est
          lorem ipsum dolor. In vitae turpis massa sed elementum tempus egestas
          sed sed. Enim blandit volutpat maecenas volutpat blandit aliquam etiam
          erat. Venenatis tellus in metus vulputate eu scelerisque felis. Nullam
          eget felis eget nunc. Semper quis lectus nulla at volutpat diam ut
          venenatis tellus. Pulvinar elementum integer enim neque volutpat ac
          <br></br>
          tincidunt. Hac habitasse platea dictumst vestibulum rhoncus est. Quam
          nulla porttitor massa id neque aliquam vestibulum morbi. Eu ultrices
          vitae auctor eu augue ut lectus arcu bibendum. Duis ut diam quam
          nulla. Mollis nunc sed id semper risus in. Tincidunt lobortis feugiat
          vivamus at augue eget. Enim diam vulputate ut pharetra. Phasellus
          vestibulum lorem sed risus ultricies tristique nulla aliquet enim.
          Lectus magna fringilla urna porttitor. Lectus vestibulum mattis
          ullamcorper velit. Faucibus pulvinar elementum integer enim neque.
          <br></br>
          Interdum consectetur libero id faucibus nisl. Vehicula ipsum a arcu
          cursus vitae congue mauris rhoncus. Bibendum at varius vel pharetra
          vel turpis nunc eget lorem. Nisl nisi scelerisque eu ultrices vitae
          auctor eu augue ut. Rhoncus mattis rhoncus urna neque. Netus et
          malesuada fames ac turpis egestas integer eget aliquet. Gravida in
          fermentum et sollicitudin ac orci. Amet consectetur adipiscing elit ut
          aliquam purus. Est ultricies integer quis auctor elit sed vulputate mi
          sit. Suspendisse interdum consectetur libero id. Faucibus nisl
          <br></br>
          tincidunt eget nullam non. Nunc aliquet bibendum enim facilisis
          gravida neque convallis a. Erat nam at lectus urna duis convallis
          convallis tellus id. Iaculis eu non diam phasellus vestibulum lorem
          sed. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar
          sapien et. Volutpat lacus laoreet non curabitur gravida. Enim blandit
          volutpat maecenas volutpat blandit aliquam etiam. Ullamcorper eget
          nulla facilisi etiam dignissim diam quis.
        </p>
      </div>
    </div>
  );
};

export default Home;
