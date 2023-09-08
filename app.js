const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; 


app.use(bodyParser.json());


app.post('/bfhl', (req, res) => {
    try {
      const { data, full_name, dob } = req.body;
  
      if (!Array.isArray(data)) {
        throw new Error('Data should be an array.');
      }
  
      if (typeof full_name !== 'string' || typeof dob !== 'string') {
        throw new Error('Full name and date of birth should be provided as strings.');
      }
  

      const numbers = data.filter(item => !isNaN(item));
      const alphabets = data.filter(item => isNaN(item));
  

      const sortedAlphabets = alphabets.slice().sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
  
      const highestAlphabet = sortedAlphabets[sortedAlphabets.length - 1];
  
    
      const email = 'jr3631@srmist.edu.in';
      const roll_number = 'RA2011032010026';
  
     
      const user_id = `${full_name}_${dob.replace(/-/g, '')}`;
  
      
      const response = {
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet: [highestAlphabet],
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });
  
  

app.get('/bfhl', (req, res) => {
  try {
    
    res.status(200).json({ operation_code: 1 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
