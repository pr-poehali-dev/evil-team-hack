import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showDesktop, setShowDesktop] = useState(false);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [messages, setMessages] = useState([
    { id: 1, user: 'EvilMaster', avatar: 'E', color: 'red', text: 'Добро пожаловать в EVIL DISCORD! Мы успешно взломали твой ПК! 😈' },
    { id: 2, user: 'HackerPro', avatar: 'H', color: 'purple', text: 'EVIL TEAM ЭТО КРУТО! 🔥' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    if (inputText === '883') {
      setIsUnlocked(true);
      setError('');
      setTimeout(() => setShowDesktop(true), 2000);
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

  if (isUnlocked && showDesktop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
        {/* Windows 10 Desktop */}
        <div className="absolute inset-0 p-8">
          {/* Desktop Icons */}
          <div className="grid gap-6">
            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group">
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="Monitor" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">Этот компьютер</span>
            </div>
            
            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group">
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="Trash2" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">Корзина</span>
            </div>
          </div>

          {/* EVIL DISCORD Window */}
          <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] shadow-2xl overflow-hidden">
            {/* Window Title Bar */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-1 rounded">
                  <Icon name="MessageSquare" className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-semibold">EVIL DISCORD</span>
              </div>
              <div className="flex gap-2">
                <button className="hover:bg-gray-700 px-3 py-1 text-white">_</button>
                <button className="hover:bg-gray-700 px-3 py-1 text-white">□</button>
                <button className="hover:bg-red-600 px-3 py-1 text-white">×</button>
              </div>
            </div>

            {/* Discord Interface */}
            <div className="flex h-[calc(100%-40px)]">
              {/* Server Sidebar */}
              <div className="w-16 bg-gray-900 flex flex-col items-center gap-2 py-3">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold cursor-pointer hover:rounded-xl transition-all">
                  EV
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold cursor-pointer hover:rounded-xl transition-all">
                  +
                </div>
              </div>

              {/* Channels Sidebar */}
              <div className="w-60 bg-gray-800 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h3 className="text-white font-bold">СЕРВЕР EVIL TEAM</h3>
                </div>
                <div className="flex-1 p-2 space-y-1">
                  <div className="text-gray-400 text-xs font-semibold px-2 py-1">ТЕКСТОВЫЕ КАНАЛЫ</div>
                  <div className="flex items-center gap-2 px-2 py-1 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                    <Icon name="Hash" className="h-4 w-4" />
                    <span>основной</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 text-gray-300 hover:bg-gray-700 rounded cursor-pointer bg-gray-700">
                    <Icon name="Hash" className="h-4 w-4" />
                    <span>злой-чат</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 text-gray-300 hover:bg-gray-700 rounded cursor-pointer">
                    <Icon name="Hash" className="h-4 w-4" />
                    <span>взлом</span>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 bg-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-600 bg-gray-800">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    <Icon name="Hash" className="h-5 w-5" />
                    злой-чат
                  </h3>
                </div>
                
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <div className={`w-10 h-10 rounded-full bg-${msg.color}-600 flex items-center justify-center text-white font-bold`}>
                        {msg.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-${msg.color}-500 font-semibold`}>{msg.user}</span>
                          <span className="text-gray-400 text-xs">{currentTime.toLocaleTimeString()}</span>
                        </div>
                        <p className="text-gray-300">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-800">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (newMessage.trim()) {
                      setMessages([...messages, {
                        id: messages.length + 1,
                        user: 'Ты',
                        avatar: 'Я',
                        color: 'blue',
                        text: newMessage
                      }]);
                      setNewMessage('');
                    }
                  }}>
                    <Input
                      placeholder="Сообщение в #злой-чат"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-gray-700 border-0 text-white placeholder:text-gray-400"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Windows 10 Taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-900/95 backdrop-blur flex items-center px-2 justify-between">
          <div className="flex items-center gap-2">
            <button className="hover:bg-white/10 p-2 rounded">
              <Icon name="Menu" className="h-6 w-6 text-white" />
            </button>
            <div className="bg-white/20 px-3 py-1 rounded flex items-center gap-2">
              <Icon name="Search" className="h-4 w-4 text-white" />
              <span className="text-white text-sm">Введите здесь для поиска</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="bg-red-600/20 border-2 border-red-600 px-3 py-1 rounded flex items-center gap-2">
              <Icon name="MessageSquare" className="h-5 w-5 text-red-500" />
              <span className="text-white text-xs font-semibold">EVIL DISCORD</span>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3">
            <Icon name="Wifi" className="h-5 w-5 text-white" />
            <Icon name="Volume2" className="h-5 w-5 text-white" />
            <div className="text-white text-sm">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
      </div>
    );
  }

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