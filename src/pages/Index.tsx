import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [inputText, setInputText] = useState('');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold text-red-600 animate-pulse mb-4">
          EVIL TEAM HACKED YOUR PC
        </h1>
        
        <p className="text-3xl font-semibold text-green-500 mb-8">
          EVIL TEAM THIS COOL
        </p>

        <div className="max-w-md mx-auto space-y-4">
          <Input
            type="text"
            placeholder="Type here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="bg-gray-900 border-green-500 text-green-400 placeholder:text-green-700 text-lg"
          />
          
          {inputText && (
            <div className="text-green-400 font-mono text-left p-4 bg-gray-900 rounded border border-green-500">
              &gt; {inputText}
            </div>
          )}

          <Button 
            onClick={() => setInputText('')}
            className="w-full bg-red-600 hover:bg-red-700 text-white"
          >
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;