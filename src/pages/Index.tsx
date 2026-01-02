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
  const [openApps, setOpenApps] = useState<string[]>(['discord']);
  const [activeApp, setActiveApp] = useState('discord');
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [notepadText, setNotepadText] = useState('');
  const [windowPositions, setWindowPositions] = useState<{[key: string]: {x: number, y: number}}>({
    discord: { x: 100, y: 80 },
    notepad: { x: 150, y: 120 },
    calc: { x: 200, y: 160 },
    browser: { x: 250, y: 100 },
    cs2: { x: 50, y: 50 },
    'died-ssd': { x: 80, y: 60 }
  });
  const [dragging, setDragging] = useState<{app: string, startX: number, startY: number} | null>(null);
  const [csHealth, setCsHealth] = useState(100);
  const [csAmmo, setCsAmmo] = useState(30);
  const [csKills, setCsKills] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newX = e.clientX - dragging.startX;
        const newY = e.clientY - dragging.startY;
        setWindowPositions(prev => ({
          ...prev,
          [dragging.app]: { x: newX, y: newY }
        }));
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

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

  const openApp = (app: string) => {
    if (!openApps.includes(app)) {
      setOpenApps([...openApps, app]);
    }
    setActiveApp(app);
  };

  const closeApp = (app: string) => {
    setOpenApps(openApps.filter(a => a !== app));
    if (activeApp === app) {
      setActiveApp(openApps[0] || '');
    }
  };

  const calcClick = (value: string) => {
    if (value === 'C') {
      setCalcDisplay('0');
    } else if (value === '=') {
      try {
        setCalcDisplay(eval(calcDisplay).toString());
      } catch {
        setCalcDisplay('Ошибка');
      }
    } else {
      setCalcDisplay(calcDisplay === '0' ? value : calcDisplay + value);
    }
  };

  const startDrag = (app: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).closest('.window-card')?.getBoundingClientRect();
    if (rect) {
      setDragging({
        app,
        startX: e.clientX - rect.left,
        startY: e.clientY - rect.top
      });
    }
    setActiveApp(app);
  };

  const shootCS = () => {
    if (csAmmo > 0) {
      setCsAmmo(csAmmo - 1);
      setCsKills(csKills + 1);
    }
  };

  const reloadCS = () => {
    setCsAmmo(30);
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

            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group" onDoubleClick={() => openApp('notepad')}>
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="FileText" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">Блокнот</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group" onDoubleClick={() => openApp('calc')}>
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="Calculator" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">Калькулятор</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group" onDoubleClick={() => openApp('browser')}>
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="Globe" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">Браузер</span>
            </div>

            <div className="flex flex-col items-center gap-1 w-24 cursor-pointer group" onDoubleClick={() => openApp('cs2')}>
              <div className="bg-blue-900/30 p-3 rounded group-hover:bg-blue-900/50 transition-all">
                <Icon name="Crosshair" className="h-12 w-12 text-white" />
              </div>
              <span className="text-white text-xs text-center font-semibold drop-shadow-lg">EVIL CS2</span>
            </div>
          </div>

          {/* EVIL DISCORD Window */}
          {openApps.includes('discord') && (
          <Card 
            className={`window-card absolute w-[800px] h-[600px] shadow-2xl overflow-hidden ${activeApp === 'discord' ? 'z-50' : 'z-40'}`}
            style={{ left: `${windowPositions.discord.x}px`, top: `${windowPositions.discord.y}px` }}
            onClick={() => setActiveApp('discord')}
          >
            {/* Window Title Bar */}
            <div 
              className="bg-gray-800 px-4 py-2 flex items-center justify-between cursor-move"
              onMouseDown={(e) => startDrag('discord', e)}
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-1 rounded">
                  <Icon name="MessageSquare" className="h-4 w-4 text-white" />
                </div>
                <span className="text-white font-semibold">EVIL DISCORD</span>
              </div>
              <div className="flex gap-2">
                <button className="hover:bg-gray-700 px-3 py-1 text-white">_</button>
                <button className="hover:bg-gray-700 px-3 py-1 text-white">□</button>
                <button className="hover:bg-red-600 px-3 py-1 text-white" onClick={(e) => { e.stopPropagation(); closeApp('discord'); }}>×</button>
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
          )}

          {/* Notepad Window */}
          {openApps.includes('notepad') && (
            <Card 
              className={`window-card absolute w-[600px] h-[500px] shadow-2xl overflow-hidden ${activeApp === 'notepad' ? 'z-50' : 'z-40'}`}
              style={{ left: `${windowPositions.notepad.x}px`, top: `${windowPositions.notepad.y}px` }}
              onClick={() => setActiveApp('notepad')}
            >
              <div 
                className="bg-white px-4 py-2 flex items-center justify-between border-b cursor-move"
                onMouseDown={(e) => startDrag('notepad', e)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="FileText" className="h-4 w-4" />
                  <span className="font-semibold">Блокнот</span>
                </div>
                <div className="flex gap-2">
                  <button className="hover:bg-gray-200 px-3 py-1">_</button>
                  <button className="hover:bg-gray-200 px-3 py-1">□</button>
                  <button className="hover:bg-red-600 hover:text-white px-3 py-1" onClick={(e) => { e.stopPropagation(); closeApp('notepad'); }}>×</button>
                </div>
              </div>
              <textarea
                value={notepadText}
                onChange={(e) => setNotepadText(e.target.value)}
                className="w-full h-[calc(100%-48px)] p-4 resize-none focus:outline-none"
                placeholder="Введите текст..."
              />
            </Card>
          )}

          {/* Calculator Window */}
          {openApps.includes('calc') && (
            <Card 
              className={`window-card absolute w-[320px] shadow-2xl overflow-hidden ${activeApp === 'calc' ? 'z-50' : 'z-40'}`}
              style={{ left: `${windowPositions.calc.x}px`, top: `${windowPositions.calc.y}px` }}
              onClick={() => setActiveApp('calc')}
            >
              <div 
                className="bg-gray-800 px-4 py-2 flex items-center justify-between cursor-move"
                onMouseDown={(e) => startDrag('calc', e)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Calculator" className="h-4 w-4 text-white" />
                  <span className="text-white font-semibold">Калькулятор</span>
                </div>
                <button className="hover:bg-red-600 text-white px-3 py-1" onClick={(e) => { e.stopPropagation(); closeApp('calc'); }}>×</button>
              </div>
              <div className="bg-gray-900 p-4">
                <div className="bg-gray-800 text-white text-right text-3xl p-4 mb-4 rounded">{calcDisplay}</div>
                <div className="grid grid-cols-4 gap-2">
                  {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '=', '+'].map((btn) => (
                    <Button
                      key={btn}
                      onClick={() => calcClick(btn)}
                      className={`h-14 text-xl ${btn === '=' ? 'bg-blue-600 hover:bg-blue-700' : btn === 'C' ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    >
                      {btn}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Browser Window */}
          {openApps.includes('browser') && (
            <Card 
              className={`window-card absolute w-[900px] h-[650px] shadow-2xl overflow-hidden ${activeApp === 'browser' ? 'z-50' : 'z-40'}`}
              style={{ left: `${windowPositions.browser.x}px`, top: `${windowPositions.browser.y}px` }}
              onClick={() => setActiveApp('browser')}
            >
              <div 
                className="bg-gray-800 px-4 py-2 flex items-center justify-between cursor-move"
                onMouseDown={(e) => startDrag('browser', e)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Globe" className="h-4 w-4 text-white" />
                  <span className="text-white font-semibold">Evil Browser</span>
                </div>
                <button className="hover:bg-red-600 text-white px-3 py-1" onClick={(e) => { e.stopPropagation(); closeApp('browser'); }}>×</button>
              </div>
              <div className="bg-gray-100 p-2 border-b flex items-center gap-2">
                <Button size="sm" variant="ghost"><Icon name="ChevronLeft" className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost"><Icon name="ChevronRight" className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost"><Icon name="RotateCw" className="h-4 w-4" /></Button>
                <Input 
                  className="flex-1" 
                  value="https://evil-team.com" 
                  readOnly 
                />
              </div>
              <div className="h-[calc(100%-96px)] bg-gradient-to-br from-red-900 to-black flex items-center justify-center overflow-auto">
                <div className="text-center space-y-6 p-8">
                  <h1 className="text-6xl font-bold text-red-500 animate-pulse">EVIL TEAM</h1>
                  <p className="text-3xl text-white">Официальный сайт</p>
                  <p className="text-xl text-gray-400">👾 Добро пожаловать в тёмную сторону 👾</p>
                  
                  <div className="mt-12 space-y-4">
                    <div className="bg-black/50 p-6 rounded-lg border-2 border-red-500 hover:border-red-400 transition-all">
                      <h2 className="text-2xl font-bold text-red-500 mb-3">⚠️ ОПАСНАЯ ЗОНА ⚠️</h2>
                      <p className="text-gray-300 mb-4">Вход только для членов EVIL TEAM</p>
                      <Button 
                        className="bg-red-600 hover:bg-red-700 text-white font-bold"
                        onClick={() => openApp('died-ssd')}
                      >
                        <Icon name="Skull" className="mr-2 h-5 w-5" />
                        Зайти на DIED SSD
                      </Button>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg">
                      <p className="text-red-400 text-sm">
                        ⚠️ Внимание: Вход на свой страх и риск
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* EVIL CS2 Window */}
          {openApps.includes('cs2') && (
            <Card 
              className={`window-card absolute w-[1000px] h-[700px] shadow-2xl overflow-hidden ${activeApp === 'cs2' ? 'z-50' : 'z-40'}`}
              style={{ left: `${windowPositions.cs2.x}px`, top: `${windowPositions.cs2.y}px` }}
              onClick={() => setActiveApp('cs2')}
            >
              <div 
                className="bg-black px-4 py-2 flex items-center justify-between cursor-move border-b-2 border-orange-500"
                onMouseDown={(e) => startDrag('cs2', e)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Crosshair" className="h-4 w-4 text-orange-500" />
                  <span className="text-orange-500 font-bold">EVIL CS2</span>
                </div>
                <button className="hover:bg-red-600 text-white px-3 py-1" onClick={(e) => { e.stopPropagation(); closeApp('cs2'); }}>×</button>
              </div>
              
              {/* CS2 Game Interface */}
              <div className="h-[calc(100%-48px)] bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
                {/* Game Area */}
                <div 
                  className="h-full w-full bg-cover bg-center relative cursor-crosshair"
                  style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23222\'/%3E%3Crect x=\'0\' y=\'0\' width=\'50\' height=\'50\' fill=\'%23333\'/%3E%3Crect x=\'50\' y=\'50\' width=\'50\' height=\'50\' fill=\'%23333\'/%3E%3C/svg%3E")' }}
                  onClick={shootCS}
                >
                  {/* Target Enemy */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="text-6xl animate-bounce-small">👤</div>
                    <div className="text-center text-red-500 font-bold text-sm mt-2">TERRORIST</div>
                  </div>

                  {/* Crosshair */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative w-8 h-8">
                      <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-green-400 transform -translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-green-400 transform -translate-x-1/2"></div>
                      <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-green-400 transform -translate-y-1/2"></div>
                      <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-green-400 transform -translate-y-1/2"></div>
                    </div>
                  </div>

                  {/* HUD Bottom Left - Health & Armor */}
                  <div className="absolute bottom-4 left-4 space-y-2">
                    <div className="flex items-center gap-3 bg-black/80 px-4 py-2 rounded">
                      <Icon name="Heart" className="h-6 w-6 text-green-500" />
                      <div className="text-3xl font-bold text-green-500">{csHealth}</div>
                    </div>
                    <div className="flex items-center gap-3 bg-black/80 px-4 py-2 rounded">
                      <Icon name="Shield" className="h-6 w-6 text-blue-500" />
                      <div className="text-3xl font-bold text-blue-500">100</div>
                    </div>
                  </div>

                  {/* HUD Bottom Right - Weapon & Ammo */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-black/80 px-6 py-3 rounded-lg">
                      <div className="flex items-center gap-4 mb-2">
                        <Icon name="Crosshair" className="h-8 w-8 text-orange-500" />
                        <div>
                          <div className="text-orange-500 text-sm font-bold">AK-47</div>
                          <div className="text-gray-400 text-xs">Автомат</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-4xl font-bold text-white">{csAmmo}</div>
                        <div className="text-gray-400">/</div>
                        <div className="text-2xl text-gray-400">90</div>
                      </div>
                      <Button 
                        className="w-full mt-2 bg-orange-600 hover:bg-orange-700"
                        onClick={(e) => { e.stopPropagation(); reloadCS(); }}
                        disabled={csAmmo === 30}
                      >
                        <Icon name="RotateCw" className="h-4 w-4 mr-2" />
                        Перезарядка [R]
                      </Button>
                    </div>
                  </div>

                  {/* HUD Top - Score & Timer */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/80 px-8 py-3 rounded-lg flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-green-500 text-sm">CT</div>
                        <div className="text-2xl font-bold text-white">5</div>
                      </div>
                      <div className="text-orange-500 text-3xl font-bold">1:45</div>
                      <div className="text-center">
                        <div className="text-red-500 text-sm">T</div>
                        <div className="text-2xl font-bold text-white">4</div>
                      </div>
                    </div>
                  </div>

                  {/* Kill Counter */}
                  <div className="absolute top-4 right-4 bg-black/80 px-4 py-2 rounded">
                    <div className="flex items-center gap-2">
                      <Icon name="Target" className="h-5 w-5 text-red-500" />
                      <span className="text-white font-bold">Убийств: {csKills}</span>
                    </div>
                  </div>

                  {/* Kill Feed */}
                  <div className="absolute top-20 right-4 space-y-1">
                    {csKills > 0 && (
                      <div className="bg-black/80 px-3 py-1 rounded text-sm flex items-center gap-2 animate-fade-in">
                        <span className="text-green-500 font-bold">EvilPlayer</span>
                        <Icon name="Crosshair" className="h-3 w-3 text-orange-500" />
                        <span className="text-red-500">Terrorist</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* DIED SSD Window */}
          {openApps.includes('died-ssd') && (
            <Card 
              className={`window-card absolute w-[950px] h-[700px] shadow-2xl overflow-hidden ${activeApp === 'died-ssd' ? 'z-50' : 'z-40'}`}
              style={{ left: `${windowPositions['died-ssd'].x}px`, top: `${windowPositions['died-ssd'].y}px` }}
              onClick={() => setActiveApp('died-ssd')}
            >
              <div 
                className="bg-black px-4 py-2 flex items-center justify-between cursor-move border-b-2 border-red-600"
                onMouseDown={(e) => startDrag('died-ssd', e)}
              >
                <div className="flex items-center gap-3">
                  <Icon name="Skull" className="h-4 w-4 text-red-600 animate-pulse" />
                  <span className="text-red-600 font-bold">DIED SSD - Danger Zone</span>
                </div>
                <button className="hover:bg-red-600 text-white px-3 py-1" onClick={(e) => { e.stopPropagation(); closeApp('died-ssd'); }}>×</button>
              </div>
              
              <div className="h-[calc(100%-48px)] bg-gradient-to-br from-gray-900 via-red-950 to-black overflow-auto">
                <div className="p-8 space-y-6">
                  {/* Warning Header */}
                  <div className="text-center border-4 border-red-600 bg-black/80 p-6 rounded-lg animate-pulse">
                    <Icon name="AlertTriangle" className="h-16 w-16 text-red-600 mx-auto mb-4" />
                    <h1 className="text-5xl font-bold text-red-600 mb-3">⚠️ DIED SSD ⚠️</h1>
                    <p className="text-xl text-red-400">Система критического повреждения</p>
                  </div>

                  {/* Danger Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-black/60 border-2 border-red-600 p-4 rounded-lg text-center">
                      <Icon name="HardDrive" className="h-12 w-12 text-red-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-red-500">73%</div>
                      <div className="text-sm text-gray-400">SSD Повреждён</div>
                    </div>
                    <div className="bg-black/60 border-2 border-orange-600 p-4 rounded-lg text-center">
                      <Icon name="Flame" className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-orange-500">85°C</div>
                      <div className="text-sm text-gray-400">Температура</div>
                    </div>
                    <div className="bg-black/60 border-2 border-yellow-600 p-4 rounded-lg text-center">
                      <Icon name="Zap" className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                      <div className="text-3xl font-bold text-yellow-500">999+</div>
                      <div className="text-sm text-gray-400">Ошибок</div>
                    </div>
                  </div>

                  {/* Error Messages */}
                  <div className="space-y-3">
                    <div className="bg-red-950/50 border-l-4 border-red-600 p-4 rounded">
                      <div className="flex items-center gap-3">
                        <Icon name="XCircle" className="h-6 w-6 text-red-500" />
                        <div>
                          <div className="font-bold text-red-400">КРИТИЧЕСКАЯ ОШИБКА</div>
                          <div className="text-sm text-gray-400">Системные файлы повреждены</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-950/50 border-l-4 border-orange-600 p-4 rounded">
                      <div className="flex items-center gap-3">
                        <Icon name="AlertTriangle" className="h-6 w-6 text-orange-500" />
                        <div>
                          <div className="font-bold text-orange-400">ПРЕДУПРЕЖДЕНИЕ</div>
                          <div className="text-sm text-gray-400">Все данные могут быть уничтожены</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-950/50 border-l-4 border-red-600 p-4 rounded">
                      <div className="flex items-center gap-3">
                        <Icon name="Skull" className="h-6 w-6 text-red-500 animate-pulse" />
                        <div>
                          <div className="font-bold text-red-400">СИСТЕМА ЗАРАЖЕНА</div>
                          <div className="text-sm text-gray-400">EVIL TEAM получил полный контроль</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Output */}
                  <div className="bg-black border-2 border-red-600 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">root@evil-system:~#</div>
                    <div className="space-y-1 text-gray-300">
                      <div className="text-red-500">[ERROR] Disk failure imminent</div>
                      <div className="text-orange-500">[WARN] Temperature critical: 85°C</div>
                      <div className="text-red-500">[ERROR] SMART status: FAILED</div>
                      <div className="text-red-500">[ERROR] Bad sectors: 9999+</div>
                      <div className="text-yellow-500">[INFO] Evil backdoor installed</div>
                      <div className="text-red-500">[ERROR] System integrity: COMPROMISED</div>
                      <div className="text-green-400 animate-pulse">EVIL TEAM WAS HERE 😈</div>
                    </div>
                  </div>

                  {/* Danger Buttons */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button className="bg-red-600 hover:bg-red-700 h-16 text-lg" disabled>
                      <Icon name="Trash2" className="mr-2 h-6 w-6" />
                      Удалить всё (недоступно)
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-700 h-16 text-lg" disabled>
                      <Icon name="Download" className="mr-2 h-6 w-6" />
                      Восстановить (невозможно)
                    </Button>
                  </div>

                  {/* Evil Message */}
                  <div className="text-center bg-black/80 p-6 rounded-lg border-2 border-red-600">
                    <p className="text-2xl text-red-500 font-bold mb-2">💀 GAME OVER 💀</p>
                    <p className="text-gray-400">Твой SSD принадлежит EVIL TEAM теперь</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

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
            {openApps.includes('discord') && (
              <button
                onClick={() => setActiveApp('discord')}
                className={`px-3 py-1 rounded flex items-center gap-2 ${activeApp === 'discord' ? 'bg-red-600/20 border-2 border-red-600' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="MessageSquare" className="h-5 w-5 text-red-500" />
                <span className="text-white text-xs font-semibold">EVIL DISCORD</span>
              </button>
            )}
            {openApps.includes('notepad') && (
              <button
                onClick={() => setActiveApp('notepad')}
                className={`px-3 py-1 rounded ${activeApp === 'notepad' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="FileText" className="h-5 w-5 text-white" />
              </button>
            )}
            {openApps.includes('calc') && (
              <button
                onClick={() => setActiveApp('calc')}
                className={`px-3 py-1 rounded ${activeApp === 'calc' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="Calculator" className="h-5 w-5 text-white" />
              </button>
            )}
            {openApps.includes('browser') && (
              <button
                onClick={() => setActiveApp('browser')}
                className={`px-3 py-1 rounded ${activeApp === 'browser' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="Globe" className="h-5 w-5 text-white" />
              </button>
            )}
            {openApps.includes('cs2') && (
              <button
                onClick={() => setActiveApp('cs2')}
                className={`px-3 py-1 rounded ${activeApp === 'cs2' ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="Crosshair" className="h-5 w-5 text-orange-500" />
              </button>
            )}
            {openApps.includes('died-ssd') && (
              <button
                onClick={() => setActiveApp('died-ssd')}
                className={`px-3 py-1 rounded ${activeApp === 'died-ssd' ? 'bg-red-600/30 border-2 border-red-600' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <Icon name="Skull" className="h-5 w-5 text-red-500 animate-pulse" />
              </button>
            )}
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