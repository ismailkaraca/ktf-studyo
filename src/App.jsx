import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, Zap, Upload, AlertTriangle, Download, Share2, BookOpen, BrainCircuit, Sparkles, Copy, RefreshCw, Languages, Wand2, Trash2, History, Gift, ExternalLink, Cpu, ScanLine } from 'lucide-react';

// --- I18n Translations ---
const translations = {
  en: {
    appTitle: "Library and Technology Festival Studio",
    appSubtitle_part1: "This application was developed as part of the ",
    appSubtitle_link: "3rd International Library and Technology Festival",
    appSubtitle_part2: ".",
    appWebsite: "www.kutuphaneveteknoloji.com",
    languageToggle: "Türkçe'ye Geç",
    step1Title: "Step 1: Choose Your Photo",
    cameraOff: "Camera is off or waiting for a photo",
    cameraPermissionError: "Camera permission denied. Please refresh the page.",
    cameraStartError: "Could not start camera.",
    fileReadError: "Could not read the selected file.",
    openCamera: "Open Camera",
    takePhoto: "Take Photo",
    uploadPhoto: "Upload Photo",
    retake: "Retake/Re-upload",
    photoTip: "For best results, upload a photo with a clear face view.",
    step2Title: "Step 2: Define Your Style",
    promptLabel: "Enter your favorite novel or character:",
    promptInspiration: "Or choose one for inspiration:",
    promptPlaceholder: "e.g., Mysterious and atmospheric like Sherlock Holmes...",
    generateButton: "Create Artistic Portrait",
    generateTip: "Transform your photo into a literary masterpiece!",
    step3Title: "Step 3: Review Your Result",
    resultPlaceholder: "Your legend begins here...",
    downloadImage: "Download Image",
    shareOnSocial: "Share Image",
    yourStory: "Behold, Your Legend!",
    copyStory: "Copy Story",
    copyImageShareText: "Copy Text",
    copyStoryShareText: "Copy Text with Story",
    loadingImage: "Digitizing your imagination...",
    loadingImageMessages: ["Scanning literary archives...","Synthesizing digital textures...","Applying artistic algorithms...","Rendering final masterpiece..."],
    loadingStory: "Writing your legend...",
    autoStoryLoadingMessages: ["Consulting the digital oracle...","Weaving narrative threads...","Finalizing the chronicles..."],
    errorPrefix: "Error: ",
    imageGenerationError: "Could not generate image. Please try again.",
    safetyError: "Safety restrictions triggered. Please try a different prompt.",
    invalidResponseError: "Invalid response from AI.",
    noImageError: "No clear face detected.",
    storyGenerationError: "Could not generate story.",
    storyNeedsImageError: "Please generate an image first.",
    imageGeneratedSuccess: "Portrait ready!",
    generateStoryPrompt: "Curious about your character's backstory?",
    generateStoryButton: "Create Story",
    textCopied: "Copied!",
    copyError: "Failed to copy!",
    shareModalTitle: "Share on Social Media",
    instagramTip: "For Instagram: Download image and upload manually.",
    copyShareText: "Copy Text",
    copyShareTextWithStory: "Copy with Story",
    close: "Close",
    shareText: "I'm at the 3rd International Library and Technology Festival as \"{prompt}\". Create your own AI avatar at www.kutuphaneveteknoloji.com! @tckulturturizm @kygmktb #ktf #ktfstudyo #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (AI Generated). Create yours at www.kutuphaneveteknoloji.com! @tckulturturizm @kygmktb #ktf #ktfstudyo #kutuphaneveteknolojifest\n\nMy Story:\n{story}",
    canvasLine1: "I'm at the 3rd Int'l Library & Technology Festival, as \"{prompt}\".",
    canvasLine2: "You too can register for our festival and create your own AI character at kutuphaneveteknoloji.com",
   imagePrompt: `Create an artistic portrait inspired by the person in this photo. The theme of the portrait should be "{prompt}". The background should combine library and technology elements. The style should be like a non-photorealistic digital art piece.`,
    storyPrompt: `Write a short (max 3 paragraphs) story about the character '{prompt}' at the 3rd International Library and Technology Festival. Theme: "Producing Libraries".`,
    samplePrompts: [
      "Curious like Alice in Wonderland",
      "Conflicted like Raskolnikov",
      "Captain Ahab from Moby Dick",
      "Romantic like Jane Eyre",
      "A dystopian character from 1984",
      "Thoughtful like The Little Prince",
      "A Steampunk inventor",
      "A Fremen from Dune",
      "Adventurous like Don Quixote",
      "Mysterious and clever like Sherlock Holmes"
    ],
    galleryTitle: "My Past Designs",
    galleryEmpty: "Your designs will be saved here.",
    delete: "Delete",
    share: "Share",
    giftTitle: "🎁 Surprise Gifts!",
    giftBody: "Share your image, especially on Instagram, with #ktfstudyo and tag @tckulturturizm @kygmktb. Show your post at the General Directorate booth in the festival area to claim your surprise gift! You can also share on other social media platforms. Use the 'Share' button below for quick sharing.",
  },
  tr: {
    appTitle: "Kütüphane ve Teknoloji Festivali Stüdyosu",
    appSubtitle_part1: "Bu uygulama ",
    appSubtitle_link: "3. Uluslararası Kütüphane ve Teknoloji Festivali",
    appSubtitle_part2: " kapsamında geliştirilmiştir.",
    appWebsite: "www.kutuphaneveteknoloji.com",
    languageToggle: "Switch to English",
    step1Title: "Adım 1: Fotoğrafınızı Seçin",
    cameraOff: "Kamera kapalı veya fotoğraf bekleniyor",
    cameraPermissionError: "Kamera izni reddedildi. Lütfen sayfayı yenileyin.",
    cameraStartError: "Kamera başlatılamadı.",
    fileReadError: "Dosya okunamadı.",
    openCamera: "Kamera Aç",
    takePhoto: "Fotoğraf Çek",
    uploadPhoto: "Fotoğraf Yükle",
    retake: "Tekrar Çek/Yükle",
    photoTip: "En iyi sonuç için yüzün net göründüğü bir fotoğraf yükleyin.",
    step2Title: "Adım 2: Tarzınızı Belirleyin",
    promptLabel: "En sevdiğiniz roman veya karakteri girin:",
    promptInspiration: "Veya ilham almak için birini seçin:",
    promptPlaceholder: "Örn: Sherlock Holmes gibi gizemli bir havada...",
    generateButton: "Sanatsal Portre Oluştur",
    generateTip: "Fotoğrafınızı kütüphane ve teknoloji temalı bir sanat eserine dönüştürün!",
    step3Title: "Adım 3: Sonucu İnceleyin",
    resultPlaceholder: "Oluşturulan görseliniz burada görünecek.",
    downloadImage: "Görseli İndir",
    shareOnSocial: "Paylaş",
    yourStory: "İşte Senin Efsanen!",
    copyStory: "Hikayeyi Kopyala",
    copyImageShareText: "Metni Kopyala",
    copyStoryShareText: "Hikayeli Metni Kopyala",
    loadingImage: "Hayal gücün DİJİTALLEŞİYOR...",
    loadingImageMessages: ["KÜTÜPHANE ARŞİVLERİ TARANIYOR...","DİJİTAL DOKULAR SENTEZLENİYOR...","SANATSAL ALGORİTMALAR İŞLENİYOR...","EFSANEVİ PORTRENİZ OLUŞTURULUYOR..."],
    loadingStory: "Efsaneniz yazılıyor...",
    autoStoryLoadingMessages: ["Dijital kâhinlere danışılıyor...","Hikaye örgüleri birleşiyor...","Son satırlar kaleme alınıyor..."],
    errorPrefix: "Hata: ",
    imageGenerationError: "Görsel oluşturulamadı. Lütfen tekrar deneyin.",
    safetyError: "Güvenlik kısıtlaması. Lütfen farklı bir tarif deneyin.",
    invalidResponseError: "Geçersiz yanıt.",
    noImageError: "Yüz algılanamadı.",
    storyGenerationError: "Hikaye oluşturulamadı.",
    storyNeedsImageError: "Önce görsel oluşturmalısınız.",
    imageGeneratedSuccess: "Portreniz hazır!",
    generateStoryPrompt: "Karakterinin hikayesini merak ediyor musun?",
    generateStoryButton: "Hikayesini Oluştur",
    textCopied: "Kopyalandı!",
    copyError: "Kopyalanamadı!",
    shareModalTitle: "Sosyal Medyada Paylaş",
    instagramTip: "Instagram için: Görseli indirin ve uygulamadan yükleyin.",
    copyShareText: "Metni Kopyala",
    copyShareTextWithStory: "Hikaye ile Kopyala",
    close: "Kapat",
    shareText: "Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de \"{prompt}\" olarak. Kendi yapay zekâ karakterinizi oluşturmak ve kayıt olmak için: www.kutuphaneveteknoloji.com @tckulturturizm @kygmktb #ktf #ktfstudyo #kutuphaneveteknolojifest",
    shareTextWithStory: "\"{prompt}\" (Yapay Zekâ). Kendi karakterini oluştur: www.kutuphaneveteknoloji.com @tckulturturizm @kygmktb #ktf #ktfstudyo #kutuphaneveteknolojifest\n\nİşte hikayem:\n{story}",
    canvasLine1: "Ben de 3. Uluslararası Kütüphane ve Teknoloji Festivali'ndeyim, hem de \"{prompt}\" olarak.",
    canvasLine2: "Siz de kutuphaneveteknoloji.com adresinden festivalimize kayıt olabilir, kendi yapay zekâ karakterinizi oluşturabilirsiniz.",
    imagePrompt: `Bu fotoğraftaki kişiden ilham alarak sanatsal bir portre oluştur. Portrenin teması "{prompt}" olmalı. Arka plan, kütüphane ve teknoloji öğelerini birleştirmeli. Stil, fotogerçekçi olmayan bir dijital sanat eseri gibi olmalı.`,
    storyPrompt: `Yaratıcı bir hikaye anlatıcısısın. Sana vereceğim festival bilgilerini kullanarak, kullanıcının orijinal istemi olan '{prompt}' ve bu istemle oluşturulan görseldeki karakterden yola çıkarak, bu karakterin 3. Uluslararası Kütüphane ve Teknoloji Festivali'nde geçen kısa (en fazla 3 paragraflık), büyüleyici ve Türkçe bir hikayesini yaz. Hikaye, festivalin "Üreten Kütüphaneler" ana temasıyla, görseldeki atmosferle ve karakterin ruh haliyle uyumlu olsun.`,
    samplePrompts: [
      "Alice Harikalar Diyarında gibi meraklı",
      "Raskolnikov gibi çatışmalı",
      "Moby Dick'ten Kaptan Ahab",
      "Jane Eyre gibi romantik",
      "1984 romanından distopik bir karakter",
      "Küçük Prens gibi düşünceli",
      "Steampunk bir mucit",
      "Dune evreninden bir Fremen",
      "Don Kişot gibi maceraperest",
      "Sherlock Holmes gibi gizemli ve zeki"
    ],
    galleryTitle: "Geçmiş Tasarımlarım",
    galleryEmpty: "Oluşturduğunuz görseller burada saklanır.",
    delete: "Sil",
    share: "Paylaş",
    giftTitle: "🎁 Sürpriz Hediyeler Seni Bekliyor!",
    giftBody: "Görselini öncelikle Instagram'da #ktfstudyo etiketiyle ve @tckulturturizm @kygmktb hesaplarını etiketleyerek paylaş. Paylaşımını festival alanındaki Genel Müdürlük standına gelip göster, sürpriz hediyeni hemen al! Diğer sosyal medya hesaplarında da paylaşabilirsin. Aşağıdaki 'Paylaş' butonundan hızlıca paylaşım yapabilirsin.",
  }
};

// --- Helper: Draw Watermark Logic (Shared) ---
const drawWatermarkOnCanvas = async (canvas, ctx, img, prompt, t) => {
    // Sabit Instagram Hikaye Boyutları
    const targetWidth = 1080;
    const targetHeight = 1920;

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // --- 1. ARKA PLAN (Background) ---
    const imgRatio = img.width / img.height;
    const canvasRatio = targetWidth / targetHeight;
    
    let renderWidth, renderHeight, offsetX, offsetY;

    if (imgRatio > canvasRatio) {
        renderHeight = targetHeight;
        renderWidth = img.width * (targetHeight / img.height);
        offsetX = (targetWidth - renderWidth) / 2;
        offsetY = 0;
    } else {
        renderWidth = targetWidth;
        renderHeight = img.height * (targetWidth / img.width);
        offsetX = 0;
        offsetY = (targetHeight - renderHeight) / 2;
    }

    // Arka planı çiz ve bulanıklaştır
    ctx.filter = 'blur(40px) brightness(0.5)';
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    ctx.filter = 'none';

    // --- 2. ÖN PLAN (Foreground) ---
    const padding = 80; 
    const availableWidth = targetWidth - (padding * 2);
    const availableHeight = targetHeight * 0.70; 

    let drawWidth, drawHeight, drawX, drawY;

    const scaleFactor = Math.min(availableWidth / img.width, availableHeight / img.height);
    drawWidth = img.width * scaleFactor;
    drawHeight = img.height * scaleFactor;
    drawX = (targetWidth - drawWidth) / 2;
    drawY = 200 + (availableHeight - drawHeight) / 2; 

    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 50;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 20;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(drawX - 10, drawY - 10, drawWidth + 20, drawHeight + 20);

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // --- 3. METİNLER ---
    const gradient = ctx.createLinearGradient(0, targetHeight * 0.6, 0, targetHeight);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.5, "rgba(0,0,0,0.8)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, targetHeight * 0.6, targetWidth, targetHeight * 0.4);

    // --- Helper: Centered Text (for Top Line) ---
    const drawTextCentered = (text, y, fontSize, fontStyle = "bold", color = "#FFFFFF", addBg = false) => {
        const textPadding = 100;
        const maxTextWidth = targetWidth - (textPadding * 2);
        ctx.font = `${fontStyle} ${fontSize}px "Inter", Arial, sans-serif`;
        ctx.textAlign = 'center';
        
        const words = text.split(' ');
        let line = '';
        const lines = [];
        for (const word of words) {
            const testLine = line + word + ' ';
            if (ctx.measureText(testLine).width > maxTextWidth && line.length > 0) {
                lines.push(line.trim());
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line.trim());

        const lineHeight = fontSize * 1.3;

        if (addBg) {
            const bgPadding = 40;
            let maxLineWidth = 0;
            lines.forEach(l => {
                const m = ctx.measureText(l);
                if (m.width > maxLineWidth) maxLineWidth = m.width;
            });
            
            const bgWidth = maxLineWidth + (bgPadding * 2);
            const bgHeight = (lines.length * lineHeight) + bgPadding;
            const bgX = (targetWidth - bgWidth) / 2;
            const bgY = y - fontSize; 

            ctx.save();
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; 
            // Manual rounded rect
            const r = 20;
            ctx.beginPath();
            ctx.moveTo(bgX + r, bgY);
            ctx.lineTo(bgX + bgWidth - r, bgY);
            ctx.quadraticCurveTo(bgX + bgWidth, bgY, bgX + bgWidth, bgY + r);
            ctx.lineTo(bgX + bgWidth, bgY + bgHeight - r);
            ctx.quadraticCurveTo(bgX + bgWidth, bgY + bgHeight, bgX + bgWidth - r, bgY + bgHeight);
            ctx.lineTo(bgX + r, bgY + bgHeight);
            ctx.quadraticCurveTo(bgX, bgY + bgHeight, bgX, bgY + bgHeight - r);
            ctx.lineTo(bgX, bgY + r);
            ctx.quadraticCurveTo(bgX, bgY, bgX + r, bgY);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        ctx.fillStyle = color;
        ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        lines.forEach((l, index) => {
            ctx.fillText(l, targetWidth / 2, y + (index * lineHeight) + (addBg ? 15 : 0));
        });

        ctx.shadowColor = "transparent";
        return lines.length * lineHeight;
    };

    // QR ve Metin Yerleşimi Hesaplamaları
    const qrSize = 160;
    const qrMarginLeft = 100; // QR sol boşluk (biraz daha sağa)
    const qrMarginBottom = 100; // QR alt boşluk (biraz daha yukarı)
    const gap = 40; // QR ile yazı arası boşluk
    
    // QR Konumu (Sol Alt)
    const qrX = qrMarginLeft;
    const qrY = targetHeight - qrSize - qrMarginBottom;

    // --- 1. Ana Metin (Üstte Ortalanmış) ---
    const line1Text = t('canvasLine1', { prompt: prompt });
    // Ana metni biraz daha yukarı taşıyoruz ki alttaki alana yer açılsın
    drawTextCentered(line1Text, targetHeight - 450, 48, "bold", "#ffffff", true);

    // --- 2. Alt Bilgi Metni (Sola Dayalı, QR Yanında) ---
    const line2Text = t('canvasLine2');
    
    // Metin Stili
    const fontSize = 30;
    ctx.font = `normal ${fontSize}px "Inter", Arial, sans-serif`;
    ctx.textAlign = 'left'; // Sola dayalı
    ctx.textBaseline = 'middle'; // Dikey ortalama için
    ctx.fillStyle = "#cbd5e1";
    ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    // Metin Alanı Hesaplama (QR'ın bittiği yerden başla)
    const textX = qrX + qrSize + gap; 
    const maxTextWidth = targetWidth - textX - qrMarginLeft; // Sağdan da aynı boşluğu bırakalım
    const lineHeight = fontSize * 1.4;

    // Kelime Sarma (Word Wrap)
    const words = line2Text.split(' ');
    let line = '';
    const lines = [];

    for (const word of words) {
        const testLine = line + word + ' ';
        if (ctx.measureText(testLine).width > maxTextWidth && line.length > 0) {
            lines.push(line.trim());
            line = word + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line.trim());

    // Metni QR Koduna Göre Dikey Ortala
    const qrCenterY = qrY + (qrSize / 2);
    // Çok satırlı metnin dikey merkezi: Başlangıç Y + (Toplam Yükseklik / 2)
    // textBaseline middle olduğu için, her satırın merkezi y noktasındadır.
    // 1. satır: startY
    // 2. satır: startY + lineHeight
    // n. satır: startY + (n-1)*lineHeight
    // Blok merkezi: startY + (n-1)*lineHeight / 2
    // Bu merkezi qrCenterY'ye eşitleyelim:
    // startY = qrCenterY - ((lines.length - 1) * lineHeight) / 2
    
    let textY = qrCenterY - ((lines.length - 1) * lineHeight) / 2;

    // Satırları Çiz
    lines.forEach((l) => {
        ctx.fillText(l, textX, textY);
        textY += lineHeight;
    });


    // --- 4. QR CODE (Bottom Left) ---
    const customQrUrl = "https://kutuphaneveteknoloji.com/qr.png";
    const fallbackQrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.kutuphaneveteknoloji.com&bgcolor=ffffff&color=000000&margin=10";

    const loadQrImage = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    };

    try {
        let qrImgToDraw;
        try {
            // Öncelikli olarak özel görseli dene
            qrImgToDraw = await loadQrImage(customQrUrl);
        } catch (error) {
            console.warn("Custom QR failed, using fallback.", error);
            // Hata verirse generate edilen QR'a geç
            qrImgToDraw = await loadQrImage(fallbackQrUrl);
        }

        // Add shadow for better visibility
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        // Hesaplanan koordinatlarda çiz
        ctx.drawImage(qrImgToDraw, qrX, qrY, qrSize, qrSize);
        ctx.shadowBlur = 0; // Reset
    } catch (e) {
        console.error("All QR Code loading attempts failed", e);
    }
};


// --- Global Styles ---
const GlobalStyles = () => (
    <style>{`
        :root { --safe-top: env(safe-area-inset-top, 0px); }
        .section { scroll-margin-top: calc(84px + var(--safe-top)); }
        @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
        
        /* Modern Spinner Styles - SVG Filling Effect */
        .modern-spinner-wrapper { position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center; }
        
        .spinner-svg {
            position: absolute;
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }

        .spinner-track-circle {
            fill: none;
            stroke: rgba(99, 102, 241, 0.1);
            stroke-width: 6;
        }

        .spinner-fill-circle {
            fill: none;
            stroke: url(#spinner-gradient);
            stroke-width: 6;
            stroke-linecap: round;
            stroke-dasharray: 300; /* Approx 2 * PI * 48 */
            stroke-dashoffset: 300;
            animation: svg-fill-animation 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes svg-fill-animation {
            0% {
                stroke-dashoffset: 300;
                transform: rotate(0deg);
            }
            50% {
                stroke-dashoffset: 0;
                transform: rotate(0deg); /* Dolsun */
            }
            100% {
                stroke-dashoffset: -300;
                transform: rotate(360deg); /* Dönerken kaybolsun */
            }
        }
        
        .spinner-logo { 
            z-index: 10; 
            color: #4f46e5; 
            /* animation güncellendi: hem pulse hem rotate */
            animation: spin-logo-rotate-pulse 3s linear infinite; 
        }
        
        @keyframes spin-logo-rotate-pulse { 
            0% { transform: scale(1) rotate(0deg); opacity: 0.8; } 
            50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 0.8; } 
        }
        
        .gallery-scroll::-webkit-scrollbar { height: 6px; }
        .gallery-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .animate-bounce-gentle { animation: bounce-gentle 2.5s infinite; }
    `}</style>
);

const getScrollBehavior = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
};


// --- Components ---

const Header = ({ t, toggleLanguage }) => (
    <header className="w-full text-center p-6 md:p-8 bg-white/80 backdrop-blur-xl rounded-b-3xl shadow-sm border-b border-indigo-50 relative z-20">
        {/* Dil Değiştirme Butonu: Mobilde akışta (relative), Masaüstünde sağ üstte (absolute) */}
        <button 
            onClick={toggleLanguage} 
            className="
                relative mx-auto mb-4 w-fit
                md:absolute md:top-4 md:right-4 md:mb-0 md:mx-0
                flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm
            "
        >
            <Languages size={14}/> {t('languageToggle')}
        </button>

        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-transparent bg-clip-text drop-shadow-sm pb-1">
            {t('appTitle')}
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-3 font-medium">
           {t('appSubtitle_part1')}<a href="https://www.kutuphaneveteknoloji.com/" target="_blank" rel="noopener noreferrer" className="font-bold text-[#241bc6] hover:text-[#bf24c6] transition-colors hover:underline decoration-2 underline-offset-2">{t('appSubtitle_link')}</a>{t('appSubtitle_part2')}
        </p>
    </header>
);

const CameraView = ({ onCapture, imageSrc, t }) => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [cameraError, setCameraError] = useState(null);

    const startCamera = async () => {
        setCameraError(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } });
            if (videoRef.current) { videoRef.current.srcObject = stream; }
            setStream(stream);
        } catch (err) {
            console.error("Kamera erişim hatası:", err);
            if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") { setCameraError(t('cameraPermissionError'));
            } else { setCameraError(t('cameraStartError')); }
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
            ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            onCapture(dataUrl); stopCamera();
        }
    };
    
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => { onCapture(e.target.result); stopCamera(); };
            reader.onerror = (err) => { console.error("Dosya okuma hatası:", err); setCameraError(t('fileReadError')); };
            reader.readAsDataURL(file);
        }
    };

    const stopCamera = () => { if (stream) { stream.getTracks().forEach(track => track.stop()); setStream(null); } };
    useEffect(() => { return () => stopCamera(); }, [stream]);
    const handleRetake = () => { setCameraError(null); onCapture(null); };

    return (
        <div id="cameraSection" className="section w-full p-6 border border-indigo-50 shadow-xl rounded-3xl bg-white flex flex-col items-center gap-5 transition-all hover:shadow-2xl">
            <h2 tabIndex="-1" className="text-2xl font-bold text-center text-gray-800 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">1</div>
                {t('step1Title')}
            </h2>
            <div className="w-full aspect-[9/16] md:aspect-video bg-gray-50 rounded-2xl overflow-hidden relative shadow-inner border border-gray-100 group">
                {imageSrc ? <img src={imageSrc} alt="Seçilen Fotoğraf" className="w-full h-full object-contain" /> : (<> <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${!stream ? 'hidden' : ''}`}></video> {!stream && <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-3"><Camera size={48} className="opacity-20"/> <span className="text-sm font-medium">{t('cameraOff')}</span></div>} </>)}
            </div>
            {cameraError && <div className="w-full p-4 my-2 bg-red-50 text-red-600 rounded-xl text-center text-sm flex items-center justify-center gap-2 border border-red-100"><AlertTriangle size={20} /><span>{cameraError}</span></div>}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                {imageSrc ? (<button onClick={handleRetake} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#bf24c6] text-white rounded-xl hover:bg-[#a61fab] transition-all transform hover:scale-105 font-semibold shadow-lg shadow-purple-200"><RefreshCw size={20} />{t('retake')}</button>) : (<> {!stream ? (<button onClick={startCamera} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#241bc6] text-white rounded-xl hover:bg-[#1e16a6] transition-all transform hover:scale-105 font-semibold shadow-lg shadow-indigo-200"><Camera size={20} />{t('openCamera')}</button>) : (<button onClick={captureImage} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#bf24c6] text-white rounded-xl hover:bg-[#a61fab] transition-all transform hover:scale-105 font-semibold shadow-lg shadow-purple-200"><Zap size={20} />{t('takePhoto')}</button>)} <button onClick={() => fileInputRef.current.click()} className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-semibold"><Upload size={20} />{t('uploadPhoto')}</button> </>)}
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg, image/png" className="hidden" />
            <p className="text-center text-xs text-gray-400 mt-1 max-w-md">{t('photoTip')}</p>
        </div>
    );
};

const PromptControls = React.forwardRef(({ onGenerate, imageSrc, t, language }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [samplePrompts, setSamplePrompts] = useState([]);
    
    useEffect(() => {
        const allPrompts = translations[language].samplePrompts;
        const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
        setSamplePrompts(shuffled.slice(0, 10));
    }, [imageSrc, language]);

    const handleSampleClick = (sample) => {
        setPrompt(sample);
        onGenerate('character', sample);
    };

    return (
        <div id="characterInputSection" className="section w-full flex flex-col gap-5 p-6 border border-purple-100 shadow-xl rounded-3xl bg-white transition-all hover:shadow-2xl">
            <h2 tabIndex="-1" className="text-2xl font-bold text-center text-gray-800 flex items-center gap-2 justify-center">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">2</div>
                {t('step2Title')}
            </h2>
            <div className="flex-grow flex flex-col">
                <label htmlFor="characterInput" className="mb-2 font-semibold text-gray-700 flex items-center gap-2"><Wand2 size={16} className="text-purple-500"/> {t('promptLabel')}</label>
                <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">{t('promptInspiration')}</p>
                    <div className="flex flex-wrap gap-2">
                        {samplePrompts.map((sample, index) => (<button key={index} onClick={() => handleSampleClick(sample)} disabled={!imageSrc} className="px-3 py-1.5 text-xs bg-gray-50 text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium">{sample}</button>))}
                    </div>
                </div>
                <textarea id="characterInput" ref={ref} value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder={t('promptPlaceholder')} className="w-full h-40 p-4 rounded-xl bg-gray-50 border-2 border-gray-100 focus:border-purple-400 focus:ring-0 text-gray-800 resize-none transition-all placeholder:text-gray-400 font-medium shadow-inner" rows="4" disabled={!imageSrc}></textarea>
                <button id="btnCreateArt" onClick={() => onGenerate('character', prompt)} disabled={!imageSrc || !prompt} className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"><Sparkles size={24} /> {t('generateButton')}</button>
                <p className="text-center text-xs text-gray-400 mt-4 px-4 leading-relaxed">{t('generateTip')}</p>
            </div>
        </div>
    );
});

const Toast = ({ message, type, onClose }) => { useEffect(() => { const timer = setTimeout(() => { onClose(); }, 3000); return () => clearTimeout(timer); }, [onClose]); const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600'; return (<div className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50`}>{message}</div>); };

const ShareModal = ({ shareText, onClose, onCopy, story, onCopyStoryShare, t }) => {
    // ... same as before
    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-40" onClick={onClose}>
            <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-100" onClick={e => e.stopPropagation()}>
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">{t('shareModalTitle')}</h3>
                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800 text-center"><strong>Instagram:</strong> {t('instagramTip')}</div>
                <button onClick={onCopy} className="mt-6 w-full bg-[#241bc6] hover:bg-[#1e16a6] text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100">{t('copyImageShareText')}</button>
                {story && (<button onClick={onCopyStoryShare} className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-100">{t('copyStoryShareText')}</button>)}
                <button onClick={onClose} className="mt-3 w-full text-gray-500 hover:text-gray-800 py-2 font-medium">{t('close')}</button>
            </div>
        </div>
    );
};

const LoadingAnimation = ({ t, language, step }) => {
    const [loadingText, setLoadingText] = useState('');

    useEffect(() => {
        const messagesKey = step === 'story' ? 'autoStoryLoadingMessages' : 'loadingImageMessages';
        const initialText = step === 'story' ? t('loadingStory') : t('loadingImage');
        const loadingMessages = translations[language][messagesKey];
        setLoadingText(initialText);
        let index = 0;
        const intervalId = setInterval(() => {
            setLoadingText(loadingMessages[index]);
            index = (index + 1) % loadingMessages.length;
        }, 2500);
        return () => clearInterval(intervalId);
    }, [language, t, step]);

    return (
        <div className="mb-8 relative z-10 w-full flex items-center justify-center h-full">
            <div id="subCategoryLoader" className="flex flex-col items-center justify-center py-8">
                {/* İstenilen Loader Yapısı */}
                                <p className="text-[10px] text-cyan-600 animate-pulse font-mono uppercase tracking-widest font-semibold">{loadingText}</p>
            </div>
        </div>
    );
};

const GallerySection = ({ gallery, onDelete, onDownload, onShare, t }) => {
    if (gallery.length === 0) return null;
    return (
        <div className="section w-full p-6 border border-gray-200 shadow-lg rounded-3xl bg-white flex flex-col mt-8 transition-all hover:shadow-xl">
             <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-sm font-bold"><History size={16}/></div>
                {t('galleryTitle')}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 gallery-scroll snap-x">
                {gallery.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-48 snap-center group relative bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                        <img src={item.image} alt={item.prompt} className="w-full h-32 object-cover" />
                        <div className="p-3">
                            <p className="text-xs text-gray-600 font-medium truncate mb-2">{item.prompt}</p>
                            <p className="text-[10px] text-gray-400 mb-2">{new Date(item.date).toLocaleDateString()}</p>
                            <div className="flex gap-2 justify-between">
                                <button onClick={() => onDownload(item, item.date)} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors" title={t('downloadImage')}><Download size={14} /></button>
                                <button onClick={() => onShare(item)} className="p-1.5 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors" title={t('share')}><Share2 size={14} /></button>
                                <button onClick={() => onDelete(item.id)} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors" title={t('delete')}><Trash2 size={14} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ImageOutput = ({ generatedImage, isLoading, isStoryLoading, onGenerateStory, error, userPrompt, story, t, language, generationStep }) => {
    const canvasRef = useRef(null);
    const downloadButtonRef = useRef(null);
    const errorRef = useRef(null);
    const [toast, setToast] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    
    useEffect(() => { if (generatedImage && !isLoading && downloadButtonRef.current) { setTimeout(() => downloadButtonRef.current.focus({ preventScroll: true }), 100); } }, [generatedImage, isLoading]);
    useEffect(() => { if (error && errorRef.current) { setTimeout(() => errorRef.current.focus({ preventScroll: true }), 100); } }, [error]);

    useEffect(() => {
         if (generatedImage && !isLoading && canvasRef.current) { 
             const canvas = canvasRef.current; const ctx = canvas.getContext('2d'); const img = new Image(); img.src = generatedImage; 
             img.onload = async () => { 
                // Use shared helper for consistency
                await drawWatermarkOnCanvas(canvas, ctx, img, userPrompt, t);
             }; 
        }
    }, [generatedImage, isLoading, userPrompt, t]);
    
    const handleShare = async () => {
        if (!canvasRef.current) return;
        try {
            const blob = await new Promise(resolve => canvasRef.current.toBlob(resolve, 'image/png'));
            const file = new File([blob], 'ktf-studyosu-gorsel.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: t('appTitle'), text: t('shareText', { prompt: userPrompt }), });
            } else { throw new Error("Cannot share files on this browser."); }
        } catch (error) { setShowShareModal(true); }
    };
    
    const copyToClipboard = (textToCopy) => {
        const textArea = document.createElement("textarea"); textArea.value = textToCopy; textArea.style.position = "fixed"; textArea.style.top = "-9999px"; textArea.style.left = "-9999px"; document.body.appendChild(textArea); textArea.focus(); textArea.select();
        try { if (document.execCommand('copy')) { setToast({ message: t('textCopied'), type: 'success' }); return true; } return false;
        } catch (err) { setToast({ message: t('copyError'), type: 'error' }); return false;
        } finally { document.body.removeChild(textArea); }
    };
    
    const handleCopyToClipboard = () => { copyToClipboard(t('shareText', { prompt: userPrompt })); };
    const handleCopyStory = () => { if (story) { copyToClipboard(story); } };
    const handleCopyStoryShareText = () => { copyToClipboard(t('shareTextWithStory', { prompt: userPrompt, story: story })); };
    
    const downloadImage = () => { 
        if (canvasRef.current) { 
            const now = new Date();
            const timestamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}-${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
            const link = document.createElement('a'); 
            link.href = canvasRef.current.toDataURL('image/png'); 
            link.download = `ktf-studyosu-gorsel-${timestamp}.png`; 
            document.body.appendChild(link); link.click(); document.body.removeChild(link); 
        } 
    };

    return (
        <div id="resultSection" className="section w-full p-6 border border-purple-50 shadow-xl rounded-3xl bg-white flex flex-col items-center justify-center min-h-[400px] transition-all hover:shadow-2xl">
            <h2 tabIndex="-1" className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">3</div>
                {t('step3Title')}
            </h2>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            {showShareModal && <ShareModal shareText={t('shareText', { prompt: userPrompt })} onClose={() => setShowShareModal(false)} onCopy={handleCopyToClipboard} story={story} onCopyStoryShare={handleCopyStoryShareText} t={t} />}
            
            <div className="w-full mx-auto flex items-center justify-center cursor-pointer max-w-[400px]" onClick={generatedImage && !isLoading ? handleShare : undefined} title={t('shareOnSocial')}>
                {isLoading && (
                    <div className="w-full aspect-[9/16] bg-gray-50 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-inner border border-gray-100">
                        <LoadingAnimation t={t} language={language} step={generationStep} />
                    </div>
                )}
                {error && (
                    <div ref={errorRef} tabIndex="-1" role="alert" className="w-full aspect-[9/16] bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-4 text-red-500 p-8 text-center border border-red-200">
                        <AlertTriangle size={48} /><p className="font-semibold">{error}</p>
                    </div>
                )}
                {!isLoading && !error && !generatedImage && (
                    <div className="w-full aspect-[9/16] bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 border border-gray-200">
                        <Sparkles size={48} className="opacity-20"/><p className="font-medium text-center px-4">{t('resultPlaceholder')}</p>
                    </div>
                )}
                {generatedImage && !isLoading && (
                    <canvas ref={canvasRef} className="w-full h-auto object-contain drop-shadow-lg rounded-xl" />
                )}
            </div>
            
             {generatedImage && !isLoading && (
                <div className="mt-6 flex flex-col items-center gap-5 w-full">
                    <div className="flex flex-wrap justify-center gap-4 w-full">
                        {/* hover:scale-105 removed from buttons below */}
                        <button ref={downloadButtonRef} onClick={downloadImage} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all font-semibold shadow-lg shadow-gray-200"><Download size={20} /> {t('downloadImage')}</button>
                        <button onClick={handleShare} aria-label={t('shareOnSocial')} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all font-semibold shadow-lg shadow-blue-200"><Share2 size={20} /> {t('shareOnSocial')}</button>
                    </div>

                    <div onClick={handleShare} className="w-full max-w-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] rounded-2xl animate-bounce-gentle cursor-pointer transition-transform hover:scale-105">
                        <div className="bg-white rounded-[14px] p-4 flex items-center gap-4">
                            <div className="bg-red-100 p-3 rounded-full text-red-500"><Gift size={32} className="animate-pulse" /></div>
                            <div><h4 className="font-bold text-gray-800 text-sm md:text-base">{t('giftTitle')}</h4><p className="text-xs md:text-sm text-gray-600 mt-1">{t('giftBody')}</p></div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 w-full max-w-md">
                        <button onClick={handleCopyToClipboard} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"><Copy size={18}/> {t('copyImageShareText')}</button>
                        {story && !isStoryLoading && ( <button onClick={handleCopyStoryShareText} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-purple-700 border border-purple-100 rounded-xl font-medium hover:bg-purple-50 transition-colors"><Copy size={18}/> {t('copyStoryShareText')}</button> )}
                    </div>
                    {!story && !isStoryLoading && !error && (
                        <div className="mt-4 text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border border-indigo-100 rounded-2xl w-full max-w-lg shadow-sm">
                             <p className="mb-4 text-indigo-900 font-semibold">{t('generateStoryPrompt')}</p>
                             <button onClick={onGenerateStory} className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#bf24c6] to-[#241bc6] text-white rounded-xl font-bold hover:shadow-lg hover:shadow-purple-200 transition-all transform hover:scale-105"><BookOpen size={20}/> {t('generateStoryButton')}</button>
                        </div>
                    )}
                    {isStoryLoading && ( <div className="mt-4 p-6 bg-white border border-gray-100 rounded-2xl w-full max-w-lg flex flex-col items-center justify-center gap-4 shadow-sm"><p className="text-gray-600 font-semibold animate-pulse">{t('loadingStory')}</p><div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full animate-pulse"></div></div></div> )}
                    {story && !isStoryLoading && (
                        <div className="mt-4 p-8 bg-white border border-purple-100 rounded-2xl w-full max-w-lg prose prose-p:text-gray-600 prose-headings:text-purple-800 relative shadow-md">
                            <h4 className="font-bold text-xl text-purple-800 mb-4 flex items-center gap-2"><BookOpen size={20}/> {t('yourStory')}</h4>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{story}</p>
                            <button onClick={handleCopyStory} className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-purple-600 transition-colors border border-gray-100" aria-label={t('copyStory')}><Copy size={18} /></button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};


// --- Ana Uygulama ---
export default function App() {
    const [imageSrc, setImageSrc] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isStoryLoading, setIsStoryLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [isMobile, setIsMobile] = useState(false);
    const [liveRegionText, setLiveRegionText] = useState("");
    const [story, setStory] = useState("");
    const [language, setLanguage] = useState('tr');
    const [generationStep, setGenerationStep] = useState(null);
    const [gallery, setGallery] = useState([]);
    const promptInputRef = useRef(null);

    // Load gallery on mount
    useEffect(() => { 
        const browserLang = navigator.language || navigator.userLanguage; 
        if (browserLang.startsWith('tr')) { setLanguage('tr'); } else { setLanguage('en'); }
        try { const savedGallery = localStorage.getItem('ktf_gallery'); if (savedGallery) { setGallery(JSON.parse(savedGallery)); } } catch (e) { console.error("Failed to load gallery", e); }
    }, []);
    
    const t = useCallback((key, replacements = {}) => { let text = (translations[language] && translations[language][key]) || key; for (const placeholder in replacements) { text = text.replace(`{${placeholder}}`, replacements[placeholder]); } return text; }, [language]);

    const toggleLanguage = () => { setLanguage(prevLang => prevLang === 'tr' ? 'en' : 'tr'); };

    const addToGallery = (img, prompt) => {
        try {
            const newItem = { id: Date.now(), image: img, prompt: prompt, date: new Date().toISOString() };
            const updatedGallery = [newItem, ...gallery].slice(0, 6);
            setGallery(updatedGallery);
            localStorage.setItem('ktf_gallery', JSON.stringify(updatedGallery));
        } catch (e) { console.error("Gallery save error", e); }
    };

    const deleteFromGallery = (id) => {
        const updatedGallery = gallery.filter(item => item.id !== id);
        setGallery(updatedGallery);
        localStorage.setItem('ktf_gallery', JSON.stringify(updatedGallery));
    };

    const handleGalleryShare = async (item) => {
        try {
            // Create a canvas to draw the watermark on the gallery image before sharing
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = item.image;

            await new Promise((resolve, reject) => {
                img.onload = () => resolve();
                img.onerror = (e) => reject(e);
            });

            // Apply the watermark logic (same as main view)
            await drawWatermarkOnCanvas(canvas, ctx, img, item.prompt, t);

            // Convert canvas to blob for sharing
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            const file = new File([blob], 'ktf-galeri-share.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: t('appTitle'),
                    text: t('shareText', { prompt: item.prompt }),
                });
            } else {
               // Fallback if native sharing is not supported
               alert("Sharing not supported on this browser.");
            }
        } catch (e) {
            console.error("Gallery share failed", e);
        }
    };

    const downloadFromGallery = (item, date) => {
        const d = new Date(date);
        const timestamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${String(d.getHours()).padStart(2, '0')}${String(d.getMinutes()).padStart(2, '0')}`;
        
        // Create a canvas to draw the watermark on the gallery image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = "Anonymous"; 
        img.src = item.image;
        
        img.onload = async () => {
            // Use shared helper for consistency
            await drawWatermarkOnCanvas(canvas, ctx, img, item.prompt, t);
            
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `ktf-galeri-${timestamp}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };

    const handleGenerateStory = useCallback(async (promptForStory, imageForStory) => {
        if (!imageForStory || !promptForStory) return;
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // API Key from environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const festivalInfo = `3. Uluslararası Kütüphane ve Teknoloji Festivali, 30 Mart – 5 Nisan 2026 tarihleri arasında İstanbul Rami Kütüphanesi’nde “Üreten Kütüphaneler” ana temasıyla gerçekleştirilecektir.`;
        const storyPrompt = t('storyPrompt', { prompt: promptForStory, festivalInfo });
        const payload = { contents: [{ parts: [{ text: storyPrompt }] }] };
        
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) { throw new Error(t('storyGenerationError')); }
            const result = await response.json(); const storyText = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (storyText) { setStory(storyText); } else { throw new Error(t('invalidResponseError')); }
        } catch (err) { setError(err.message); setLiveRegionText(`${t('errorPrefix')}${err.message}`); throw err; }
    }, [t]);

    const onGenerateStory = async () => {
        if (!generatedImage || !userPrompt) { setError(t('storyNeedsImageError')); return; }
        setLiveRegionText(t('loadingStory')); setIsStoryLoading(true); setStory(''); setError(null);
        try { await handleGenerateStory(userPrompt, generatedImage); } catch (e) {} finally { setIsStoryLoading(false); }
    };

    useEffect(() => {
        const checkIsMobile = () => { setIsMobile(matchMedia("(pointer: coarse)").matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)); };
        checkIsMobile(); window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const handleCapture = (dataUrl) => {
        setImageSrc(dataUrl); setGeneratedImage(null); setError(null); setStory("");
        if (isMobile && dataUrl && promptInputRef.current) {
             const promptSection = document.getElementById('characterInputSection');
             if (promptSection) { setTimeout(() => { promptSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }); setTimeout(() => { promptInputRef.current.focus({ preventScroll: true }); }, 400); }, 100); }
        }
    };
    
    const handleGenerateImage = async (mode, prompt) => {
        if (!imageSrc) { setError(t('photoTip')); return; }
        const resultSection = document.getElementById('resultSection');
        if (resultSection) { resultSection.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' }); }
        setLiveRegionText(t('loadingImage')); setUserPrompt(prompt); setIsLoading(true); setGenerationStep('image'); setError(null); setGeneratedImage(null); setStory("");
        
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // API Key from environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`;
        const base64ImageData = imageSrc.split(',')[1];
        const fullPrompt = t('imagePrompt', { prompt });
        const payload = { contents: [{ parts: [ { text: fullPrompt }, { inlineData: { mimeType: "image/jpeg", data: base64ImageData } } ] }], generationConfig: { responseModalities: ['IMAGE'] }, };
        
        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) { throw new Error(t('imageGenerationError')); }
            const result = await response.json(); const candidate = result?.candidates?.[0]; const problematicFinishReasons = ['NO_IMAGE', 'SAFETY', 'IMAGE_OTHER', 'RECITATION'];
            if (!candidate || problematicFinishReasons.includes(candidate.finishReason)) {
                let userMessage = t('imageGenerationError');
                if (candidate?.finishReason === 'SAFETY' || candidate?.finishReason === 'IMAGE_OTHER') userMessage = t('safetyError');
                if (candidate?.finishReason === 'NO_IMAGE') userMessage = t('noImageError');
                throw new Error(userMessage);
            }
            const base64Data = candidate?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (base64Data) {
                const newImageSrc = `data:image/png;base64,${base64Data}`;
                setGeneratedImage(newImageSrc); setLiveRegionText(t('imageGeneratedSuccess'));
                addToGallery(newImageSrc, prompt);
            } else { throw new Error(t('invalidResponseError')); }
        } catch (err) { setError(err.message); setLiveRegionText(`${t('errorPrefix')}${err.message}`); } finally { setIsLoading(false); setGenerationStep(null); }
    };

    return (
        <div className="min-h-screen w-full bg-slate-50 text-gray-900 font-sans flex flex-col items-center gap-8 pb-12">
            <GlobalStyles />
            <div className="sr-only" aria-live="polite" aria-atomic="true">{liveRegionText}</div>
            <Header t={t} toggleLanguage={toggleLanguage} />
            <main className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-6">
                <CameraView onCapture={handleCapture} imageSrc={imageSrc} t={t} />
                <PromptControls ref={promptInputRef} onGenerate={handleGenerateImage} imageSrc={imageSrc} t={t} language={language} />
                <div className="flex flex-col gap-8">
                    <ImageOutput 
                        generatedImage={generatedImage} 
                        isLoading={isLoading} 
                        isStoryLoading={isStoryLoading}
                        onGenerateStory={onGenerateStory}
                        error={error} 
                        userPrompt={userPrompt} 
                        story={story} 
                        t={t} 
                        language={language}
                        generationStep={generationStep}
                    />
                    <GallerySection gallery={gallery} onDelete={deleteFromGallery} onDownload={downloadFromGallery} onShare={handleGalleryShare} t={t} />
                </div>
            </main>
        </div>
    );
}
