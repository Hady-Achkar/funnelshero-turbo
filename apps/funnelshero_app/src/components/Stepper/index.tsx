import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Step1 } from './step1';

const steps = [
  { title: "Register", description: "This is a description." },
  { title: "Confirm", description: "This is a description." },
  { title: "Waiting", description: "This is a description." },
];

export default function RegisterStepper({activeStep, setActiveStep}:{activeStep:number, setActiveStep:(state:number)=>void}) {
  
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const currentStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 setStep={setActiveStep} />
      default:
        return <Step1 setStep={setActiveStep} />
    }
  }

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(activeStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(activeStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          labelProps.optional = (
            <Typography variant="caption">Optional</Typography>
          );
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label.title} {...stepProps}>
              <StepLabel {...labelProps}>{label.title}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : currentStep()}
    </Box>
  );
}
