
import React, { useState } from 'react';
import VideoCall from './VideoCall';
import FileSharing from './FileSharing';
import Whiteboard from './Whiteboard';
import Chat from './Chat';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MeetingRoom = () => {
  const [activeTab, setActiveTab] = useState('video');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex flex-col lg:flex-row">
        {/* Main Content */}
        <div className="flex-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="p-4">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-white/10 backdrop-blur-sm">
                <TabsTrigger value="video" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Video Call
                </TabsTrigger>
                <TabsTrigger value="whiteboard" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger value="files" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Files
                </TabsTrigger>
                <TabsTrigger value="chat" className="text-white data-[state=active]:bg-white data-[state=active]:text-slate-900">
                  Chat
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="video" className="mt-0">
              <VideoCall />
            </TabsContent>
            
            <TabsContent value="whiteboard" className="p-4">
              <div className="max-w-4xl mx-auto">
                <Whiteboard />
              </div>
            </TabsContent>
            
            <TabsContent value="files" className="p-4">
              <div className="max-w-md mx-auto">
                <FileSharing />
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="p-4">
              <div className="max-w-md mx-auto">
                <Chat />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar for desktop - always show chat */}
        <div className="hidden lg:block w-80 p-4 border-l border-white/10">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
