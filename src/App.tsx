import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, Lock, Play, Camera, Crown, MoreHorizontal, DollarSign, Instagram, Twitter, Music, X, Copy, Check } from 'lucide-react';
import { logPurchaseEvent, logInitiateCheckoutEvent } from './lib/supabase';

function App() {
  useEffect(() => {
    window.logPurchaseToSupabase = logPurchaseEvent;
    window.logInitiateCheckoutToSupabase = logInitiateCheckoutEvent;

    if (typeof window.fireInitiateCheckoutEvent === 'function') {
      window.fireInitiateCheckoutEvent('visitor');
    }
  }, []);

  const [activeTab, setActiveTab] = useState('feed');
  const [activeMediaTab, setActiveMediaTab] = useState('videos');
  const [showFullBio, setShowFullBio] = useState(false);
  const [showUnlockPopup, setShowUnlockPopup] = useState(false);
  const [copiedField, setCopiedField] = useState<string>('');

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleMediaClick = () => {
    setShowUnlockPopup(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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
                loading="eager"
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
                Sou a Larissa, tenho 22 aninhos toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho
                Tô sempre online, gosto de conversar e trocar ideias quentes… se você me der atenção, eu te mando coisas que nunca mostrei pra ninguém
              </p>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">
                Sou a Larissa, tenho 22 aninhos toda tímida de cara, mas bem safadinha quando me solto… adoro tirar fotinhas íntimas no meu quarto e mandar só pra quem me trata com carinho
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

          <button
            onClick={() => setShowUnlockPopup(true)}
            className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 hover:from-pink-600 hover:via-red-600 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 text-sm"
          >
            <Lock className="w-4 h-4" />
            <span>Desbloquear conteúdo (R$10)</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex space-x-6">
            {['Feed', 'Mídias', 'Stories'].map((tab) => (
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
          <div className="bg-white relative">
            {/* Video Post 1 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 hora</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo1.mp4"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">342 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 28 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>

            {/* Image Post 2 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">3 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <img
                  src="https://s3.chefexpress.site/vortex/imagem1.jpeg"
                  alt="Post"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">189 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 15 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>

            {/* Video Post 3 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">6 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo3.mp4"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                  muted
                  loop
                  playsInline
                  preload="none"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">567 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 42 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>

            {/* Image Post 4 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">12 horas</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <img
                  src="https://s3.chefexpress.site/vortex/imagem2.jpeg"
                  alt="Post"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">234 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 18 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>

            {/* Video Post 5 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 dia</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <video
                  src="https://s3.chefexpress.site/vortex/arquivo5.mp4"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">423 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 35 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>

            {/* Image Post 6 */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center p-4 pb-3">
                <img
                  src="https://s3.chefexpress.site/vortex/fotodeperfil.jpg"
                  alt="Profile"
                  loading="lazy"
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">larissasilva_</div>
                  <div className="text-gray-500 text-xs">1 dia</div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>

              <div className="relative cursor-pointer" onClick={handleMediaClick}>
                <img
                  src="https://s3.chefexpress.site/vortex/imagem3.jpeg"
                  alt="Post"
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'blur(14px)', opacity: 0.6 }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Lock className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-gray-700" />
                    <MessageCircle className="w-6 h-6 text-gray-700" />
                    <Share className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
                <div className="font-semibold text-sm mb-1">298 curtidas</div>
                <div className="text-gray-500 text-sm mt-1">Ver todos os 22 comentários</div>

                <button
                  onClick={() => setShowUnlockPopup(true)}
                  className="w-full mt-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm shadow-md"
                >
                  <Lock className="w-4 h-4" />
                  <span>Desbloquear por R$10</span>
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === 'mídias' ? (
          <div className="bg-white">
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

            {activeMediaTab === 'videos' ? (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num) => (
                    <div key={num} className="relative cursor-pointer" onClick={handleMediaClick}>
                      <video
                        src={`https://s3.chefexpress.site/vortex/arquivo${num}.mp4`}
                        className="w-full h-32 object-cover rounded-lg"
                        style={{ filter: 'blur(14px)', opacity: 0.6 }}
                        muted
                        playsInline
                        preload="none"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Lock className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {['imagem1.jpeg', 'imagem2.jpeg', 'imagem3.jpeg', 'imagem1.jpeg'].map((img, idx) => (
                    <div key={idx} className="relative cursor-pointer" onClick={handleMediaClick}>
                      <img
                        src={`https://s3.chefexpress.site/vortex/${img}`}
                        alt={`Foto ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-48 object-cover rounded-lg"
                        style={{ filter: 'blur(14px)', opacity: 0.6 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                        <Lock className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
        ) : null}

      </div>

      {/* Unlock Popup */}
      {showUnlockPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowUnlockPopup(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">Desbloquear acesso completo</h3>
              <button onClick={() => setShowUnlockPopup(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">
                Para liberar todos os vídeos e fotos, envie o valor de <span className="font-bold text-pink-600">R$10</span> via PIX.
                <br /><br />
                Após o pagamento, envie o comprovante no WhatsApp para liberar seu acesso.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Chave PIX (celular)</p>
                    <p className="font-mono font-bold text-gray-800">44988164843</p>
                  </div>
                  <button
                    onClick={() => handleCopy('44988164843', 'pix')}
                    className="ml-2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition-colors"
                  >
                    {copiedField === 'pix' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copiedField === 'pix' && (
                  <p className="text-green-600 text-sm mt-2 font-medium">Copiado com sucesso</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Nome da Agência</p>
                    <p className="font-bold text-gray-800">VORTEX FUTURO</p>
                  </div>
                  <button
                    onClick={() => handleCopy('VORTEX FUTURO', 'agency')}
                    className="ml-2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition-colors"
                  >
                    {copiedField === 'agency' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                {copiedField === 'agency' && (
                  <p className="text-green-600 text-sm mt-2 font-medium">Copiado com sucesso</p>
                )}
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-4 border border-pink-200">
                <p className="text-sm text-gray-600 mb-1">Valor</p>
                <p className="text-3xl font-bold text-pink-600">R$ 10,00</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700 text-center">
                Envie o comprovante diretamente no WhatsApp onde estamos conversando
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
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
