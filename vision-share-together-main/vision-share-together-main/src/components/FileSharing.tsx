
import React, { useState, useCallback } from 'react';
import { File, FileVideo } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SharedFile {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

const FileSharing = () => {
  const [files, setFiles] = useState<SharedFile[]>([
    {
      id: '1',
      name: 'presentation.pdf',
      size: '2.4 MB',
      type: 'application/pdf',
      uploadedBy: 'Alice Johnson',
      uploadedAt: '2 minutes ago'
    },
    {
      id: '2',
      name: 'demo-video.mp4',
      size: '15.2 MB',
      type: 'video/mp4',
      uploadedBy: 'Bob Smith',
      uploadedAt: '5 minutes ago'
    },
    {
      id: '3',
      name: 'requirements.docx',
      size: '1.1 MB',
      type: 'application/msword',
      uploadedBy: 'Carol Davis',
      uploadedAt: '8 minutes ago'
    }
  ]);
  
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const newFile: SharedFile = {
        id: Date.now().toString(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type,
        uploadedBy: 'You',
        uploadedAt: 'Just now'
      };
      setFiles(prev => [newFile, ...prev]);
    }
  }, []);

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) {
      return <FileVideo className="w-6 h-6 text-purple-500" />;
    }
    return <File className="w-6 h-6 text-blue-500" />;
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Shared Files
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-slate-300 bg-slate-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <File className="w-8 h-8 mx-auto mb-2 text-slate-400" />
          <p className="text-sm text-slate-600">
            Drag and drop files here or{' '}
            <Button variant="link" className="p-0 h-auto">
              browse
            </Button>
          </p>
        </div>

        {/* File List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-slate-500">
                  {file.size} • {file.uploadedBy} • {file.uploadedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileSharing;
