import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, X } from "lucide-react";
import { useState, useCallback } from "react";

interface UploadSectionProps {
  onFilesUploaded: (files: File[]) => void;
}

export const UploadSection = ({ onFilesUploaded }: UploadSectionProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      const newFiles = [...uploadedFiles, ...files].slice(0, 10); // Max 10 files
      setUploadedFiles(newFiles);
      onFilesUploaded(newFiles);
    }
  }, [uploadedFiles, onFilesUploaded]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(
      file => file.type === 'application/pdf'
    );
    
    if (files.length > 0) {
      const newFiles = [...uploadedFiles, ...files].slice(0, 10);
      setUploadedFiles(newFiles);
      onFilesUploaded(newFiles);
    }
  }, [uploadedFiles, onFilesUploaded]);

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    onFilesUploaded(newFiles);
  }, [uploadedFiles, onFilesUploaded]);

  const addDemoFiles = () => {
    const demoFiles = [
      new File(['demo'], 'research_paper.pdf', { type: 'application/pdf' }),
      new File(['demo'], 'financial_report.pdf', { type: 'application/pdf' }),
      new File(['demo'], 'technical_manual.pdf', { type: 'application/pdf' })
    ];
    setUploadedFiles(demoFiles);
    onFilesUploaded(demoFiles);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Upload Your Documents</h2>
        <p className="text-muted-foreground">
          Upload 3-10 PDF documents for intelligent analysis (Max 10 files)
        </p>
      </div>

      <Card
        className={`relative border-2 border-dashed transition-all duration-300 ${
          dragOver 
            ? 'border-primary bg-primary/5 shadow-glow' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <Upload className={`w-16 h-16 mx-auto mb-4 transition-colors ${
            dragOver ? 'text-primary' : 'text-muted-foreground'
          }`} />
          
          <h3 className="text-xl font-semibold mb-2">Drop your PDFs here</h3>
          <p className="text-muted-foreground mb-6">
            Or click to browse and select files
          </p>
          
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Browse Files
              </label>
            </Button>
            
            <Button variant="outline" onClick={addDemoFiles}>
              Use Demo Files
            </Button>
          </div>
        </div>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Uploaded Files ({uploadedFiles.length}/10)
          </h3>
          
          <div className="space-y-3">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
                <span className="flex-1 font-medium">{file.name}</span>
                <span className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};