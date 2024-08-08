import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [size, setSize] = useState('');
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    // Function to update the window size state
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Add event listener to update window size on resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function changeHandler() {
    console.log("button is clicked");

    // Split the input value by 'x' to separate width and height
    const dimensions = size.split('x');
    
    if (dimensions.length === 2) {
      const width = parseInt(dimensions[0].trim(), 10);
      const height = parseInt(dimensions[1].trim(), 10);

      // Check if both width and height are valid numbers
      if (!isNaN(width) && !isNaN(height)) {
        // Set the window size using window.resizeTo
        window.resizeTo(width, height);
        // Update the window size state
        setWindowSize({ width, height });
      } else {
        console.error("Invalid dimensions entered.");
      }
    } else {
      console.error("Invalid format. Please enter size as widthxheight.");
    }
  }

  return (
    <div className="App">
      <h1>Window Resizer</h1>
      <h3>Put the value below</h3>

      <input
        type='text'
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="e.g., 800x600"
      />
      <button onClick={changeHandler}>Click Here to Change the Window Size</button>

      <div>
        <h3>Current Window Size:</h3>
        <p>Width: {windowSize.width}px</p>
        <p>Height: {windowSize.height}px</p>
      </div>
    </div>
  );
}

export default App;
