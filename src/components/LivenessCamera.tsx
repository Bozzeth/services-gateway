import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Camera, StopCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface LivenessCameraProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
  isOpen?: boolean;
  title?: string;
  description?: string;
}

export function LivenessCamera({ 
  onCapture, 
  onCancel, 
  isOpen = true,
  title = "Face Verification",
  description = "Position your face in the center of the frame and remain still"
}: LivenessCameraProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [captureComplete, setCaptureComplete] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && !captureComplete) {
      startCamera();
      // Simulate face detection after 2 seconds
      const faceTimer = setTimeout(() => {
        setFaceDetected(true);
      }, 2000);

      return () => {
        clearTimeout(faceTimer);
        stopCamera();
      };
    }
  }, [isOpen, captureComplete]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && isCapturing) {
      captureImage();
    }
  }, [countdown, isCapturing]);

  const startCamera = async () => {
    try {
      // Since we can't access real camera in this environment, we'll simulate it
      console.log('Camera access requested - simulating camera stream');
      setFaceDetected(false);
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera');
  };

  const handleCapture = () => {
    if (!faceDetected) {
      alert('Please ensure your face is visible and positioned in the center');
      return;
    }
    
    setIsCapturing(true);
    setCountdown(3);
  };

  const captureImage = () => {
    // Simulate image capture
    const mockImageData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVR...'; // Mock base64 image
    
    setIsCapturing(false);
    setCaptureComplete(true);
    
    // Simulate processing time
    setTimeout(() => {
      onCapture(mockImageData);
    }, 1500);
  };

  const resetCapture = () => {
    setCaptureComplete(false);
    setCountdown(0);
    setIsCapturing(false);
    setFaceDetected(false);
    startCamera();
  };

  console.log('LivenessCamera component rendering with isOpen:', isOpen);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-3 sm:p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="font-semibold text-base sm:text-lg mb-2 leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed px-2 sm:px-0">{description}</p>
          </div>

          <div className="relative">
            {/* Camera Preview Area */}
            <div className="relative bg-gray-900 rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden">
              {/* Simulated camera view */}
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                {!captureComplete && (
                  <div className="text-center text-white px-4">
                    <Camera className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm opacity-75">Camera Preview</p>
                    <p className="text-xs opacity-50 mt-2">
                      {faceDetected ? 'Face detected' : 'Detecting face...'}
                    </p>
                  </div>
                )}
                
                {captureComplete && (
                  <div className="text-center text-white px-4">
                    <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
                    <p className="text-sm">Capture Complete</p>
                    <p className="text-xs opacity-75 mt-2">Processing...</p>
                  </div>
                )}
              </div>

              {/* Face detection overlay */}
              {!captureComplete && (
                <div className="absolute inset-0">
                  <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-40 sm:w-48 sm:h-56 border-2 rounded-full ${
                    faceDetected ? 'border-green-500' : 'border-white/50'
                  }`}>
                    {faceDetected && (
                      <div className="absolute -top-6 sm:-top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-green-500 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 flex-shrink-0" />
                          <span className="whitespace-nowrap">Face detected</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Countdown overlay */}
              {countdown > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-4xl sm:text-6xl font-bold">
                    {countdown}
                  </div>
                </div>
              )}
            </div>

            {/* Status indicators */}
            <div className="mt-3 sm:mt-4 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm px-2">
                {faceDetected ? (
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Ready to capture</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-amber-600">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="text-center">Position your face in the oval</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="w-full sm:flex-1 min-h-[44px] touch-manipulation"
            >
              Cancel
            </Button>
            
            {!captureComplete && !isCapturing && (
              <Button 
                onClick={handleCapture} 
                disabled={!faceDetected}
                className="w-full sm:flex-1 min-h-[44px] touch-manipulation"
              >
                <Camera className="w-4 h-4 mr-2 flex-shrink-0" />
                Capture
              </Button>
            )}
            
            {captureComplete && (
              <Button 
                onClick={resetCapture} 
                variant="outline" 
                className="w-full sm:flex-1 min-h-[44px] touch-manipulation"
              >
                Retake
              </Button>
            )}
            
            {isCapturing && (
              <Button 
                disabled 
                className="w-full sm:flex-1 min-h-[44px] touch-manipulation"
              >
                <StopCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                Capturing...
              </Button>
            )}
          </div>

          <div className="mt-3 sm:mt-4 text-xs text-center text-muted-foreground px-2">
            <p>Ensure good lighting and look directly at the camera</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}