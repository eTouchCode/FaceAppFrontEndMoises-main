import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import axios from "axios";

const LoadingOverlay = ({ loading, children }) => (
  <div style={{ position: 'relative', minHeight: '100vh' }}>
    {loading && (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <CircularProgress size={60} />
      </div>
    )}
    {children}
  </div>
);

const PredictName = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'ClassName', images: [], isSaveEnabled: false },
  ]);

  const userName = Cookies.get('username');
  const [loadingSave, setLoadingSave] = useState(false);

  const handleImageSelect = (event) => {
    const files = event.target.files;
    const selectedFile = files.length > 0 ? files[0] : null;

    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        images: selectedFile ? [selectedFile] : [],
        isSaveEnabled: selectedFile && card.title !== 'default',
      }))
    );
  };

const handleSaveClick = async () => {
    const isSaveEnabled = cards[0].isSaveEnabled;

    if (isSaveEnabled) {
        setLoadingSave(true);

        const formData = new FormData();
        const file = cards[0].images[0]; // Assuming only one image is selected

        // Add the client_name and image parameters
        formData.append('client_name', userName);
        formData.append('image', file);

        try {
            const response = await axios.post('https://bem-te-vi-ponto.rj.r.appspot.com/predictname', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the correct content type for form data
                },
            });
            if (response.status === 200) {
                const detectedNames = response.data.detected_names;
                const alertMessage = 'The Predicted Name from the model is: ' + detectedNames[0];
           
                window.alert(alertMessage);

            } else {
              window.alert("Something went wrong.");
            }
        } catch (error) {
          window.alert("Erorr! Something went wrong.");
        } finally {
            setLoadingSave(false);
        }
    } 
};


  return (
    <LoadingOverlay loading={loadingSave}>
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        height: '100vh'
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} variant="outlined" sx={{ width: '100%', marginBottom: '10px', position: 'relative' }}>
      
          <CardContent>
            <Typography variant="h2">
              Select an Image
            </Typography>
            <br />
            <input type="file" onChange={(e) => handleImageSelect(e, card.id)} style={{ display: 'none' }} id={`fileInput${card.id}`} />
            <label htmlFor={`fileInput${card.id}`}>
              <Button component="span" color="secondary" variant="contained">
                Choose File
              </Button>
            </label>
            <br /> <br />
            <Typography variant="h5" color="black">
              {card.images.length > 0
                ? `Selected ${card.images.length} ${card.images.length === 1 ? 'file' : 'files'}`
                : 'No files selected, select an image for testing.'}
            </Typography>
          </CardContent>
        </Card>
      ))}  
      <br></br>
      <Button
        onClick={handleSaveClick}
        disabled={!cards.every((card) => card.isSaveEnabled)}
        color="secondary"
        variant="contained"
        sx={{ marginTop: '20px', width: '130px', fontSize: '18px' }} // Adjust the width value as needed
      >
        {loadingSave ? <CircularProgress size={24} /> : 'Test'}
      </Button>
    </Box>
    </LoadingOverlay>
  );
};

export default PredictName;