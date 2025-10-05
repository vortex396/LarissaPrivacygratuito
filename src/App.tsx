import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Heart, MessageCircle, Share, Lock, Users, Play, Camera, Crown, Star, Gift, MoreHorizontal, DollarSign, Instagram, Twitter, Music, ChevronUp, ChevronDown } from 'lucide-react';
import { logPurchaseEvent, logInitiateCheckoutEvent } from './lib/supabase';

function App() {
  useEffect(() => {
    window.logPurchaseToSupabase = logPurchaseEvent;
    window.logInitiateCheckoutToSupabase = logInitiateCheckoutEvent;

    // Dispara InitiateCheckout ao carregar a primeira vez
    if (typeof window.fireInitiateCheckoutEvent === 'function') {
      window.fireInitiateCheckoutEvent('visitor');
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [activeTab, setActiveTab] = useState('feed');
  const [activeMediaTab, setActiveMediaTab] = useState('videos');
  const [showFullBio, setShowFullBio] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<{[key: number]: number}>({
    1: 342,
    2: 189,
    3: 567,
    4: 234,
    5: 423,
    6: 298,
    7: 445,
    8: 167,
    9: 389,
    10: 512,
    11: 276,
    12: 534,
    13: 298,
    14: 421,
    15: 367,
    16: 489,
    17: 512,
    18: 378,
    19: 445,
    20: 291,
    21: 398,
    22: 467,
    23: 523,
    24: 356,
    25: 412,
    26: 489,
    27: 334,
    28: 478,
    29: 401,
    30: 523,
    31: 387,
    32: 456,
    33: 398,
    34: 512,
    35: 423,
    36: 467,
    37: 389,
    38: 501,
    39: 434,
    40: 478,
    41: 356,
    42: 489,
    43: 412,
    44: 523,
    45: 378,
    46: 445,
    47: 398,
    48: 467,
    49: 423,
    50: 512,
    51: 389,
    52: 456,
    53: 401,
    54: 478,
    55: 367,
    56: 501,
    57: 434,
    58: 489,
    59: 412,
    60: 523,
    61: 398
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validPasswords = [
      '142536',
      '147852',
      '369852',
      '258741',
      '963741',
      '741852',
      '852963',
      '456789',
      '789456',
      '321654',
      '654321',
      '159753',
      '357159',
      '951357',
      '753951'
    ];

    if (validPasswords.includes(password)) {
      const email = `user_${password}@privacy.local`;
      setUserEmail(email);

      if (typeof window.firePurchaseEvent === 'function') {
        await window.firePurchaseEvent(email);
      }

      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  const handleLike = (postId: number) => {
    const newLikedPosts = new Set(likedPosts);
    const newLikeCounts = { ...likeCounts };
    
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
      newLikeCounts[postId] = newLikeCounts[postId] - 1;
    } else {
      newLikedPosts.add(postId);
      newLikeCounts[postId] = newLikeCounts[postId] + 1;
    }
    
    setLikedPosts(newLikedPosts);
    setLikeCounts(newLikeCounts);
  };

  const handleVideoDoubleClick = (postId: number, videoUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    handleLike(postId);
    // Pequeno delay para mostrar o like antes de abrir fullscreen
    setTimeout(() => {
      setFullscreenVideo(videoUrl);
    }, 100);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600&fit=crop)',
            filter: 'blur(8px)'
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/80" />
        
        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            {/* Profile Section */}
            <div className="text-center mb-8">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-pink-500 shadow-2xl shadow-pink-500/50"
                />
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full p-2">
                  <Crown className="w-6 h-6 text-white" />
                </div>
              </div>
              <h1 className="text-gray-800 text-2xl font-bold mb-2">
                Larissa Silva
              </h1>
              <p className="text-blue-600 text-lg font-medium">
                @larissasilva_
              </p>
              <p className="text-gray-700 text-sm mt-3 leading-relaxed px-4 text-center">
                Amor, seu acesso já tá liberado 😘 digita sua senha abaixo e aproveita mais de 70 vídeos e muitas fotinhas só minhas…
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-pink-500/30 p-8 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha..."
                    className="w-full bg-gray-100 border border-pink-500/50 rounded-lg px-4 py-4 pr-12 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {error && (
                  <p className="text-red-600 text-sm text-center bg-red-100 rounded-lg p-2 border border-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 hover:from-pink-600 hover:via-red-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/50 text-lg"
                >
                  ENTRAR
                </button>
              </form>

              <div className="flex justify-center space-x-6 mt-6">
                <button className="text-pink-600 text-sm hover:text-pink-700 underline underline-offset-2 transition-colors duration-200">
                  Criar conta
                </button>
                <button className="text-pink-600 text-sm hover:text-pink-700 underline underline-offset-2 transition-colors duration-200">
                  Esqueci minha senha
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-xs">
                Conteúdo exclusivo para maiores de 18 anos 🔞
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-lg font-bold text-gray-800">
              Larissa Privacy
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img
                src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">
                Larissa Silva
              </h2>
              <div className="flex items-center space-x-2">
                <p className="text-blue-600 font-medium">@larissasilva_</p>
                <span className="text-green-500 text-sm font-medium">• Online</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            {showFullBio ? (
              <p className="text-gray-700 text-sm leading-relaxed">
                Sou a Larissa, tenho 22 aninhos 😘✨ toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho 💋
                Tô sempre online, gosto de conversar e trocar ideias quentes… se você me der atenção, eu te mando coisas que nunca mostrei pra ninguém 🔒🔥
              </p>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">
                Sou a Larissa, tenho 22 aninhos 😘✨ toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho 💋
              </p>
            )}
            <button 
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-orange-500 text-sm font-medium mt-2"
            >
              {showFullBio ? 'Ler menos' : 'Ler mais'}
            </button>
          </div>


          <div className="flex items-center space-x-4 mb-6">
            <Instagram className="w-5 h-5 text-gray-600" />
            <Twitter className="w-5 h-5 text-gray-600" />
            <Music className="w-5 h-5 text-gray-600" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Mimo</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex space-x-6">
            {['Feed', 'Mídias', 'Ao Vivo', 'Stories', 'Mensagens'].map((tab) => (
              <button
                key={tab}
                className={`font-medium pb-2 border-b-2 transition-colors ${
                  activeTab === tab.toLowerCase().replace(' ', '')
                    ? 'text-orange-600 border-orange-500' 
                    : 'text-gray-600 hover:text-gray-800 border-transparent hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase().replace(' ', ''))}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'feed' ? (
          /* Instagram-style Feed for Postagens */
          <div className="bg-white relative">
            {/* Video Post 1 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 hora</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo1.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo1.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(1, 'https://s3.chefexpress.site/vortex/arquivo1.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(1)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(1) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[1]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 28 comentários</div>
              </div>
            </div>

            {/* Image Post 2 - Imagem */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">3 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <img
                src="https://s3.chefexpress.site/vortex/imagem1.jpeg"
                alt="Post"
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => setFullscreenImage('https://s3.chefexpress.site/vortex/imagem1.jpeg')}
                onDoubleClick={() => handleLike(2)}
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(2)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(2) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[2]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 15 comentários</div>
              </div>
            </div>

            {/* Video Post 3 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">6 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo3.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo3.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(3, 'https://s3.chefexpress.site/vortex/arquivo3.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(3)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(3) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[3]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 42 comentários</div>
              </div>
            </div>

            {/* Image Post 4 - Imagem */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">12 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <img
                src="https://s3.chefexpress.site/vortex/imagem2.jpeg"
                alt="Post"
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => setFullscreenImage('https://s3.chefexpress.site/vortex/imagem2.jpeg')}
                onDoubleClick={() => handleLike(4)}
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(4)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(4) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[4]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 18 comentários</div>
              </div>
            </div>

            {/* Video Post 5 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 dia</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo5.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo5.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(5, 'https://s3.chefexpress.site/vortex/arquivo5.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(5)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(5) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[5]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 35 comentários</div>
              </div>
            </div>

            {/* Image Post 6 - Imagem */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 dia</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <img
                src="https://s3.chefexpress.site/vortex/imagem3.jpeg"
                alt="Post"
                className="w-full aspect-square object-cover cursor-pointer"
                onClick={() => setFullscreenImage('https://s3.chefexpress.site/vortex/imagem3.jpeg')}
                onDoubleClick={() => handleLike(6)}
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(6)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(6) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[6]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 22 comentários</div>
              </div>
            </div>

            {/* Video Post 7 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">2 dias</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo7.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo7.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(7, 'https://s3.chefexpress.site/vortex/arquivo7.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(7)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(7) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[7]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 51 comentários</div>
              </div>
            </div>

            {/* Image Post 8 - Imagem */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">2 dias</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <img
                src="https://s3.chefexpress.site/vortex/imagem2.jpeg"
                alt="Post"
                className="w-full aspect-square object-cover cursor-pointer"
                onDoubleClick={() => handleLike(8)}
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(8)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(8) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[8]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 13 comentários</div>
              </div>
            </div>

            {/* Video Post 9 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">3 dias</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo9.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo9.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(9, 'https://s3.chefexpress.site/vortex/arquivo9.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(9)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(9) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[9]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 37 comentários</div>
              </div>
            </div>

            {/* Image Post 10 - Imagem */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">3 dias</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <img
                src="https://s3.chefexpress.site/vortex/imagem3.jpeg"
                alt="Post"
                className="w-full aspect-square object-cover cursor-pointer"
                onDoubleClick={() => handleLike(10)}
              />

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(10)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(10) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[10]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 64 comentários</div>
              </div>
            </div>

            {/* Video Post 11 - Vídeo */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">4 dias</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={() => setFullscreenVideo('https://s3.chefexpress.site/vortex/arquivo11.mp4')}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo11.mp4"
                  className="w-full aspect-square object-cover"
                  muted
                  loop
                  playsInline
                  onDoubleClick={(e) => handleVideoDoubleClick(11, 'https://s3.chefexpress.site/vortex/arquivo11.mp4', e)}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/50 rounded-full p-3">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleLike(11)}>
                      <Heart className={`w-6 h-6 ${likedPosts.has(11) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                    </button>
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">{likeCounts[11]} curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 29 comentários</div>
              </div>
            </div>

            {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61].map((postId) => {
              const timeTexts = ['5 dias', '6 dias', '1 semana', '1 semana', '2 semanas', '2 semanas', '3 semanas'];
              const timeIndex = Math.floor((postId - 12) / 7);
              const timeText = timeTexts[timeIndex] || '3 semanas';
              const commentCount = Math.floor(Math.random() * 50) + 20;

              return (
                <div key={postId} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center p-4 pb-3">
                    <img
                      src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-sm">larissasilva_</div>
                      <div className="text-gray-500 text-xs">{timeText}</div>
                    </div>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="relative cursor-pointer" onClick={() => setFullscreenVideo(`https://s3.chefexpress.site/vortex/arquivo${postId}.mp4`)}>
                    <video
                      src={`https://s3.chefexpress.site/vortex/arquivo${postId}.mp4`}
                      className="w-full aspect-square object-cover"
                      muted
                      loop
                      playsInline
                      onDoubleClick={(e) => handleVideoDoubleClick(postId, `https://s3.chefexpress.site/vortex/arquivo${postId}.mp4`, e)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <button onClick={() => handleLike(postId)}>
                          <Heart className={`w-6 h-6 ${likedPosts.has(postId) ? 'text-red-500 fill-current' : 'text-gray-700'}`} />
                        </button>
                        <MessageCircle className="w-6 h-6 text-gray-700" />
                        <Share className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                    <div className="font-semibold text-sm mb-1">{likeCounts[postId]} curtidas</div>
                    <div className="text-gray-500 text-sm mt-1">Ver todos os {commentCount} comentários</div>
                  </div>
                </div>
              );
            })}

            {/* Fullscreen Video Modal */}
            {fullscreenVideo && (
              <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                <button
                  onClick={() => setFullscreenVideo(null)}
                  className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>
                <video
                  src={fullscreenVideo}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  playsInline
                />
              </div>
            )}

            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
              <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                <button
                  onClick={() => setFullscreenImage(null)}
                  className="absolute top-4 right-4 text-white text-2xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>
                <img
                  src={fullscreenImage}
                  className="w-full h-full object-contain"
                  alt="Fullscreen"
                />
              </div>
            )}
          </div>
        ) : activeTab === 'mídias' ? (
          /* Grid Layout for Mídias */
          <div className="bg-white">
            {/* Sub-navegação para Mídias */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex space-x-4">
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMediaTab === 'videos' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveMediaTab('videos')}
                >
                  <Play className="w-5 h-5" />
                  <span>Vídeos</span>
                </button>
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMediaTab === 'fotos' 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveMediaTab('fotos')}
                >
                  <Camera className="w-5 h-5" />
                  <span>Fotos</span>
                </button>
              </div>
            </div>

            {/* Conteúdo baseado na aba ativa */}
            {activeMediaTab === 'videos' ? (
              /* Álbum de Vídeos */
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                    <div key={num} className="relative cursor-pointer" onClick={() => setFullscreenVideo(`https://s3.chefexpress.site/vortex/arquivo${num}.mp4`)}>
                      <video
                        src={`https://s3.chefexpress.site/vortex/arquivo${num}.mp4`}
                        className="w-full h-32 object-cover rounded-lg"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-2">
                          <Play className="w-6 h-6 text-white fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 left-1 text-white text-xs bg-black/70 px-2 py-1 rounded">
                        {Math.floor(Math.random() * 3) + 1}:{String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Álbum de Fotos */
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <img
                      src="https://s3.chefexpress.site/vortex/imagem1.jpeg"
                      alt="Foto 1"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/70 px-2 py-1 rounded">
                      ❤️ 234
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://s3.chefexpress.site/vortex/imagem2.jpeg"
                      alt="Foto 2"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/70 px-2 py-1 rounded">
                      ❤️ 189
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://s3.chefexpress.site/vortex/imagem3.jpeg"
                      alt="Foto 3"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/70 px-2 py-1 rounded">
                      ❤️ 156
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://s3.chefexpress.site/vortex/imagem1.jpeg"
                      alt="Foto 4"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 text-white text-xs bg-black/70 px-2 py-1 rounded">
                      ❤️ 298
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'aovivo' ? (
          <div className="bg-white p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Conteúdo Bloqueado</h3>
            <p className="text-gray-600 mb-4">Recurso disponível em breve</p>
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Esta função está temporariamente indisponível</p>
            </div>
          </div>
        ) : activeTab === 'stories' ? (
          <div className="bg-white p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Conteúdo Bloqueado</h3>
            <p className="text-gray-600 mb-4">Recurso disponível em breve</p>
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Esta função está temporariamente indisponível</p>
            </div>
          </div>
        ) : activeTab === 'mensagens' ? (
          <div className="bg-white p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Conteúdo Bloqueado</h3>
            <p className="text-gray-600 mb-4">Recurso disponível em breve</p>
            <div className="bg-gray-100 rounded-lg p-4 mt-4">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Esta função está temporariamente indisponível</p>
            </div>
          </div>
        ) : null}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          {[
            { icon: '⚡', label: 'Mural', active: true, available: true },
            { icon: '📱', label: 'Feed', active: false, available: false },
            { icon: '📈', label: 'Em alta', active: false, available: false },
            { icon: '💬', label: 'Chat', active: false, available: false },
            { icon: '☰', label: 'Menu', active: false, available: false }
          ].map((item, index) => (
            <button
              key={index}
              className={`flex flex-col items-center py-2 px-1 relative ${
                item.active ? 'text-orange-500' : item.available ? 'text-gray-400' : 'text-gray-300'
              }`}
              disabled={!item.available}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
              {!item.available && (
                <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 rounded-full">
                  🔒
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;