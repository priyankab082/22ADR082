const express = require('express');
const app = express();
//this is my localhost port number
const port = 9876;

const getNumbersFromAPI = require('./services/numberservice');
const { updateWindow, getWindow, getAverage } = require('./utils/slidingwindow');

const VALID_IDS = ['p', 'f', 'e', 'r'];//i have given valid ids for prime,fibbonoci,random,even

//this will run when the request is sent successfullly and response is recived
app.get('/', (req, res) => {    
  res.send('Average Calculator HTTP Microservice is running!');
});
//the number ids are e,p,f,r
app.get('/numbers/:numberid', async (req, res) => {
  const numberid = req.params.numberid;
//if there is no valid number id it gives 400 bad request output
  if (!VALID_IDS.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number id' });
  }

  const windowPrevState = [...getWindow()];
//input
  try {
    const { numbers } = await getNumbersFromAPI(numberid);
    const addedNumbers = updateWindow(numbers);
    const windowCurrState = [...getWindow()];
    const avg = getAverage();
//output
    return res.json({
      windowPrevState,
      windowCurrState,
      numbers: addedNumbers,
      avg: parseFloat(avg.toFixed(2))
    });
    //if error
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching data from third-party server' });
  }
});
//localhost
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
