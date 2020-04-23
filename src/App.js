import React, {useState, useEffect} from 'react';
import P5Wrapper from 'react-p5-wrapper';



export default function App() {

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
 function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
  }

  var dimensions = useWindowDimensions();
  function sketch(p)  {

    var width = dimensions.width;
    var height = dimensions.height;
    var zoom = 1.00;
    var zMin = 0.05;
    var zMax = 9.00;
    var sensitivity = 0.005;
    p.setup = () => {
      p.createCanvas(width,height);
    }

    p.draw = () => {
      p.background(51);

      //p.scale(zoom);
      //iterates through canvas
      for (var x = 0; x < width; x++) {
        for(var y = 0; y < height; y++){
          //real part
          var a = p.map(x, 0, width, -2, 2);
          //imaginary part
          var b = p.map(y,0, height, -2, 2);

          
          var z = 0;

          var originalA = a;
          var originalB = b;

          for(var n = 0;n < 100;n++){
          
            //what z squared is
            var newA = a * a - b * b;
            var newB = 2 * a * b;

            a = newA + originalA;
            b = newB + originalB;

            if(p.abs(a + b) > 13) {
              break;
            }

          }

          var color = p.map(n, 0, 100, 0, 255);
          p.stroke(color);
          p.strokeWeight(5);
          p.point(x,y);
          p.point(a,b);
          
        }
      }
    }

    /*
    p.mouseWheel = (event) => {
      zoom += sensitivity * event.delta;
      zoom = p.constrain(zoom, zMin, zMax);
      //uncomment to block page scrolling
      //return false;
    }
    */
  }
  return (
    <P5Wrapper sketch={sketch}></P5Wrapper>
  );
}

