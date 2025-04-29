import mammoth from "mammoth";
import fs from 'fs';
const convertText = async (req, res, next) => {
    try {
      
      const filePath = `./public/images/${req.file.filename}`;
  
      const buffer = fs.readFileSync(filePath);
  
      const result = await mammoth.extractRawText({ buffer });
  
      const text = result.value;
  
      req.text = text;
      next();
    } catch (error) {
      console.error('Error processing DOCX:', error);
      res.status(500).json({ error: 'Failed to process DOCX file' });
    }
  };

  export {convertText};