import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const PhotoGenerator = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [background, setBackground] = useState('#ffffff');
  const previewRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generatePhoto = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      useCORS: true,
      backgroundColor: background
    });
    
    const link = document.createElement('a');
    link.download = '证件照.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="generator-container">
      <input type="file" onChange={handleUpload} accept="image/*" />
      
      <div className="preview-box" ref={previewRef}>
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt="证件照预览"
            style={{ 
              width: '300px',
              height: '400px',
              objectFit: 'cover',
              backgroundColor: background
            }}
          />
        )}
      </div>

      <div className="controls">
        <label>背景颜色：</label>
        <input 
          type="color" 
          value={background}
          onChange={(e) => setBackground(e.target.value)}
        />
        <button onClick={generatePhoto}>生成证件照</button>
      </div>
    </div>
  );
};

export default PhotoGenerator;