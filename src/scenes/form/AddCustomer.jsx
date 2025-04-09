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

const AddCustomer = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'ClassName', images: [], isSaveEnabled: false },
  ]);

  let userName = Cookies.get('username');
  const dsplyusername = Cookies.get('username');
  const role = Cookies.get('role');
  const isEmployee = role === "Employee";

  if (isEmployee) {
    userName = Cookies.get('clientname');
  }

  const [showTrainButton, setShowTrainButton] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingTrain, setLoadingTrain] = useState(false);

  const handleCardClick = (cardId) => {
    const newTitle = prompt('Enter a new name:', cards.find((c) => c.id === cardId).title);
    if (newTitle !== null) {
      const isDuplicate = cards.some((card) => card.title === newTitle);
      if (!isDuplicate) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === cardId ? { ...card, title: newTitle || 'default' } : card
          )
        );
      } else {
        alert('Class name must be unique!');
      }
    }
  };

  const handleImageSelect = (event, cardId) => {
    const files = event.target.files;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              images: [...files],
              isSaveEnabled: files.length > 0 && card.title !== 'default',
            }
          : card
      )
    );
  };

  const handleAddClassClick = () => {
    const newCard = {
      id: cards.length + 1,
      title: 'New Class' + (cards.length + 1),
      images: [],
      isSaveEnabled: false,
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const handleDeleteClick = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const handleTrainModel = async () => {
    try {
      setLoadingTrain(true);
      const trainResponse = await axios.post(
        "https://bem-te-vi-ponto.rj.r.appspot.com/train",
        {
          clientname: userName,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Check if the response is OK (status code 200)
      if (trainResponse && trainResponse.status === 200) {
        const trainResult = await trainResponse.data;
        window.alert('Model trained successfully:', trainResult);

      } else {
        console.error('Failed to train the model:', trainResponse.status, trainResponse.statusText);
      }
    } catch (error) {
      console.error('Error during model training:', error);
    }
    finally {
      setLoadingTrain(false);
    }
  };

  
  const handleSaveClick = async () => {
    const isSaveEnabled = cards.every((card) => card.isSaveEnabled);

    if (isSaveEnabled) {
      setLoadingSave(true);
        const formData = new FormData();

        cards.forEach((card, index) => {
            card.images.forEach((file, fileIndex) => {
                const uniqueIdentifier = Date.now() + fileIndex; // Generate a unique identifier
               formData.append(
                  `titles[${isEmployee ? dsplyusername : card.title}]`,
                  isEmployee ? dsplyusername : card.title
                );
                formData.append(
                  `images[${index}][${isEmployee ? dsplyusername : card.title}][${uniqueIdentifier}][${userName}]]`,
                  file
                );
            });
        });
        try {
            const response = await fetch('https://bem-te-vi-ponto.rj.r.appspot.com/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
               
                window.alert('Data saved successfully.');
                setShowTrainButton(true);
            } else {
                console.error('Failed to send data.');
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
        finally {
          setLoadingSave(false);
        }
    } else {
        alert('All classes must have unique names and at least one file selected.');
    }
};


  return (
    <LoadingOverlay loading={loadingSave || loadingTrain}>
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        height: '100vh'
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} variant="outlined" sx={{ width: '100%', marginBottom: '10px', position: 'relative' }}>
          {index > 0 && (
            <Button onClick={() => handleDeleteClick(card.id)} color="error" variant="contained" style={{ position: 'absolute', top: 0, right: 0, margin: '5px' }}>
              Delete
            </Button>
          )}
          <CardContent>
            <Typography variant="h2" onClick={() => handleCardClick(card.id)}>
              {isEmployee ? dsplyusername : card.title}
            </Typography>
            <br />
            <input type="file" onChange={(e) => handleImageSelect(e, card.id)} multiple style={{ display: 'none' }} id={`fileInput${card.id}`} />
            <label htmlFor={`fileInput${card.id}`}>
              <Button component="span" color="secondary" variant="contained">
                Choose File
              </Button>
            </label>
            <br /> <br />
            <Typography variant="h5" color="black">
              {card.images.length > 0
                ? `Selected ${card.images.length} ${card.images.length === 1 ? 'file' : 'files'}`
                : 'No files selected'}
            </Typography>
          </CardContent>
        </Card>
      ))}

      {!isEmployee && (
        <Button onClick={handleAddClassClick} color="primary" variant="contained">
          Add Another Class
        </Button>
      )}
      <br></br>
   
      <Button onClick={handleSaveClick} disabled={!cards.every((card) => card.isSaveEnabled)} color="secondary" variant="contained" sx={{ marginTop: '20px' }}>
        {loadingSave ? <CircularProgress  size={24} /> : 'Save'}
      </Button>

      {showTrainButton && (
        <Button onClick={handleTrainModel} color="primary" variant="contained" sx={{ marginTop: '20px', marginLeft: '10px' }}>
          {loadingTrain ? <CircularProgress size={24} /> : 'Train Your Model'}
        </Button>
      )}
      
      
    </Box>
    </LoadingOverlay>
  );
};

export default AddCustomer;
