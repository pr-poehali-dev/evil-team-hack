import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (inputText === '883') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('ACCESS DENIED! Wrong code.');
      setTimeout(() => setError(''), 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  if (isUnlocked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-900">
        <div className="text-center space-y-8 p-8">
          <h1 className="text-6xl font-bold text-green-400 animate-pulse">
            ACCESS GRANTED
          </h1>
          <p className="text-2xl text-green-300">
            PC UNLOCKED SUCCESSFULLY!
          </p>
          <div className="text-8xl">✓</div>
        </div>
      </div>
    );
  }

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
          <div className="text-yellow-400 text-sm mb-2">
            Enter unlock code:
          </div>
          
          <Input
            type="text"
            placeholder="Enter code to unlock..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-gray-900 border-green-500 text-green-400 placeholder:text-green-700 text-lg"
          />
          
          {error && (
            <div className="text-red-500 font-mono text-sm animate-pulse">
              {error}
            </div>
          )}

          {inputText && !error && (
            <div className="text-green-400 font-mono text-left p-4 bg-gray-900 rounded border border-green-500">
              &gt; {inputText}
            </div>
          )}

          <Button 
            onClick={handleUnlock}
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