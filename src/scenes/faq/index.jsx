import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from '../../components/Header';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [expanded, setExpanded] = useState(Array(5).fill(false)); // Assuming you have 5 Accordions

  const handleAccordionChange = (index) => {
    setExpanded((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  const faqData = [
    {
      question: 'What parameters will the API return in the output?',
      answer:
        'The API will return the name of the detected person, confidence score of detection, entry/exit status, and the date and time of detection.',
    },
    {
      question: 'What can Employees do?',
      answer: 'Employees can log in and are allowed to add their images. They have the capability to train the data.',
    },
    {
      question: 'What can Clients do?',
      answer:
        'Clients can add images of their employees with the employee name in the classname field. They have the ability to add multiple employees with their images and names, save, and train the data.',
    },
    {
      question: 'Can Clients create accounts for their employees so that they can register themselves?',
      answer:
        'Yes, Clients can create employee accounts. They can add employee images along with their names, save the data, and perform training.',
    },
    {
      question: 'Can Clients modify or update the information of their employees after adding them?',
      answer:
        'Yes, Clients have the flexibility to modify and update the information of their employees. They can delete the employee, and if they want to edit, they can reenter the employee\'s data with the same name. This allows Clients to manage and keep employee information up-to-date in the system.',
    },
  ];

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      {faqData.map((faq, index) => (
        <Accordion key={index} expanded={expanded[index]} onChange={() => handleAccordionChange(index)} sx={{ marginTop: '16px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.redAccent[400]} variant="h4">
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontSize: '1rem' }}>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQ;
