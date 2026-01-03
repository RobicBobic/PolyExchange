import React, { useState, useEffect, useRef } from 'react';

function PolyExchange() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animated grid background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 181, 229, 0.3)';
        ctx.fill();

        particles.forEach(other => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(51, 181, 229, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.includes('@')) {
      openModal(
        'Welcome to Poly Exchange!',
        'Thank you for subscribing! You will now receive our weekly market insights, exclusive predictions, and platform updates. Check your email for a confirmation message and your first market analysis report.'
      );
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const marketCategories = [
    {
      name: 'Politics',
      markets: '250+',
      volume: '$450M',
      description: 'Trade on elections, policy decisions, approval ratings, and political events worldwide.',
      details: 'Our political markets cover US and international elections, legislative outcomes, executive actions, judicial appointments, and more. Real-time data from verified sources ensures accurate market pricing.'
    },
    {
      name: 'Crypto',
      markets: '180+',
      volume: '$320M',
      description: 'Predict Bitcoin, Ethereum, altcoins, and blockchain adoption milestones.',
      details: 'Trade on cryptocurrency price targets, adoption metrics, regulatory decisions, and blockchain developments. Markets include major coins, DeFi protocols, NFT trends, and Web3 growth.'
    },
    {
      name: 'Finance',
      markets: '220+',
      volume: '$380M',
      description: 'Trade on Fed decisions, market indices, economic indicators, and corporate events.',
      details: 'Markets cover interest rates, GDP growth, inflation data, stock market movements, corporate earnings, M&A activity, and economic policy decisions from central banks worldwide.'
    },
    {
      name: 'Sports',
      markets: '300+',
      volume: '$290M',
      description: 'Predict outcomes in NBA, NFL, soccer, and major sporting events globally.',
      details: 'Trade on championship winners, MVP awards, playoff outcomes, records broken, and season performance. Covers all major leagues: NBA, NFL, MLB, NHL, Premier League, Champions League, and more.'
    },
    {
      name: 'Entertainment',
      markets: '150+',
      volume: '$180M',
      description: 'Predict Oscar winners, box office performance, streaming hits, and pop culture trends.',
      details: 'Markets include award show winners, movie box office milestones, album releases, streaming viewership, celebrity news, and entertainment industry developments.'
    },
    {
      name: 'Technology',
      markets: '120+',
      volume: '$210M',
      description: 'Trade on AI breakthroughs, product launches, tech IPOs, and innovation milestones.',
      details: 'Predict outcomes for major tech announcements, AI developments, product releases, company valuations, startup funding rounds, and technological breakthroughs.'
    },
    {
      name: 'Science',
      markets: '90+',
      volume: '$140M',
      description: 'Predict scientific discoveries, space exploration, climate events, and research outcomes.',
      details: 'Markets cover space missions, medical breakthroughs, climate milestones, physics discoveries, and major research announcements from leading institutions.'
    },
    {
      name: 'World Events',
      markets: '200+',
      volume: '$280M',
      description: 'Trade on geopolitical events, international relations, and global developments.',
      details: 'Predict outcomes for diplomatic negotiations, international conflicts, treaty signings, UN resolutions, and major world events affecting global affairs.'
    }
  ];

  const trendingMarkets = [
    {
      title: '2024 Presidential Election',
      category: 'Politics',
      volume: '$145.2M',
      traders: '45.2K',
      trend: '+12.4%',
      probability: 'Trump 52% • Harris 48%',
      description: 'Will Donald Trump win the 2024 Presidential Election? Market resolves based on certified Electoral College results.',
      liquidity: 'Deep',
      payout: 'Yes shares pay $1.00 if Trump wins, $0 otherwise'
    },
    {
      title: 'Bitcoin Above $100K',
      category: 'Crypto',
      volume: '$89.8M',
      traders: '38.7K',
      trend: '+8.9%',
      probability: 'Yes 67% • No 33%',
      description: 'Will Bitcoin (BTC) trade above $100,000 before December 31, 2024? Resolves Yes if BTC reaches $100K on any major exchange.',
      liquidity: 'Deep',
      payout: 'Yes shares pay $1.00 if BTC hits $100K, $0 otherwise'
    },
    {
      title: 'Fed Interest Rate Cut Q1',
      category: 'Finance',
      volume: '$64.4M',
      traders: '29.1K',
      trend: '+5.2%',
      probability: 'Cut 41% • Hold 59%',
      description: 'Will the Federal Reserve cut interest rates in Q1 2025? Market resolves based on official FOMC announcements.',
      liquidity: 'High',
      payout: 'Cut shares pay $1.00 if Fed cuts rates, $0 otherwise'
    },
    {
      title: 'Lakers NBA Championship',
      category: 'Sports',
      volume: '$42.1M',
      traders: '18.5K',
      trend: '+3.1%',
      probability: 'Yes 15% • No 85%',
      description: 'Will the LA Lakers win the 2024-25 NBA Championship? Resolves Yes if Lakers win Finals, based on official NBA results.',
      liquidity: 'Medium',
      payout: 'Yes shares pay $1.00 if Lakers win, $0 otherwise'
    },
    {
      title: 'Ethereum ETF Approval',
      category: 'Crypto',
      volume: '$55.3M',
      traders: '22.4K',
      trend: '+7.8%',
      probability: 'Yes 73% • No 27%',
      description: 'Will the SEC approve a spot Ethereum ETF in 2024? Market resolves Yes upon official SEC approval announcement.',
      liquidity: 'High',
      payout: 'Yes shares pay $1.00 if approved, $0 otherwise'
    },
    {
      title: 'AI Regulation Bill',
      category: 'Technology',
      volume: '$38.7M',
      traders: '15.8K',
      trend: '+4.3%',
      probability: 'Pass 58% • Fail 42%',
      description: 'Will comprehensive AI regulation pass in the US by end of 2024? Resolves Yes if federal AI bill becomes law.',
      liquidity: 'Medium',
      payout: 'Pass shares pay $1.00 if bill passes, $0 otherwise'
    },
    {
      title: 'S&P 500 Above 6000',
      category: 'Finance',
      volume: '$71.2M',
      traders: '31.6K',
      trend: '+9.4%',
      probability: 'Yes 82% • No 18%',
      description: 'Will S&P 500 close above 6000 in 2024? Market resolves Yes if SPX closes above 6000 on any trading day.',
      liquidity: 'Deep',
      payout: 'Yes shares pay $1.00 if SPX hits 6000, $0 otherwise'
    },
    {
      title: 'Tech Company Layoffs',
      category: 'Technology',
      volume: '$29.4M',
      traders: '12.3K',
      trend: '+2.7%',
      probability: '>50K 45% • <50K 55%',
      description: 'Will major tech companies lay off more than 50,000 workers in 2024? Resolves based on verified reports from top 10 tech firms.',
      liquidity: 'Medium',
      payout: '>50K shares pay $1.00 if layoffs exceed 50K, $0 otherwise'
    }
  ];

  const faqs = [
    {
      question: 'What is Poly Exchange and how does it work?',
      answer: 'Poly Exchange is a prediction market platform where you trade on the outcome of real-world events. You buy shares in outcomes you believe will happen. If you are correct, your shares are worth $1.00 each. If you are wrong, they are worth $0. The current market price reflects the collective wisdom of all traders and represents the probability of that outcome occurring. For example, if "Yes" shares trade at $0.65, the market believes there is a 65% chance that event will happen.'
    },
    {
      question: 'How accurate are prediction markets?',
      answer: 'Prediction markets have proven to be highly accurate forecasting tools. Academic research shows they consistently outperform traditional polls, expert predictions, and statistical models. Poly Exchange markets have achieved 98.3% accuracy on resolved events. This is because markets aggregate information from thousands of traders who have real money at stake, creating powerful incentives for accurate predictions. The "wisdom of crowds" effect means market prices quickly incorporate all available information and adjust as new data emerges.'
    },
    {
      question: 'Is this legal and regulated?',
      answer: 'Yes, Poly Exchange operates in full compliance with all applicable laws and regulations. We are registered with the CFTC (Commodity Futures Trading Commission) and operate under their regulatory framework for event contracts. Our platform adheres to strict KYC (Know Your Customer) and AML (Anti-Money Laundering) requirements. All funds are held in segregated accounts at FDIC-insured banks. We maintain SOC 2 Type II certification and undergo regular third-party audits to ensure the highest standards of security and compliance.'
    },
    {
      question: 'How do you ensure market integrity?',
      answer: 'Market integrity is our top priority. We employ sophisticated monitoring systems to detect unusual trading patterns, potential manipulation, or wash trading. Our automated market maker ensures deep liquidity and fair pricing. All markets have clear, objective resolution criteria published in advance. We use multiple independent data sources to verify outcomes. Suspicious activity triggers immediate investigation by our compliance team. Users found manipulating markets face account suspension and potential legal action. Our reputation depends on maintaining fair, transparent markets.'
    },
    {
      question: 'What happens if there is a dispute?',
      answer: 'Every market has detailed resolution criteria established before trading begins. Markets resolve based on objective, verifiable data from authoritative sources (official government announcements, verified news reports, etc.). If the outcome is unclear or disputed, our resolution team reviews all available evidence. In rare cases of genuine ambiguity, markets may resolve as "N/A" and all shares refund at their purchase price. Users can submit evidence during a 48-hour dispute window after initial resolution. Final decisions are made by our independent resolution committee and are binding.'
    },
    {
      question: 'How does the automated market maker work?',
      answer: 'Our automated market maker (AMM) uses a logarithmic market scoring rule (LMSR) to provide continuous liquidity. This ensures you can always buy or sell shares, even in less popular markets. The AMM automatically adjusts prices based on supply and demand - when more people buy "Yes," the price increases; when they sell, it decreases. This creates efficient price discovery. The AMM is subsidized by Poly Exchange to ensure tight spreads and deep liquidity. You never need to wait for another trader to take the opposite side of your position.'
    },
    {
      question: 'Can I withdraw my money at any time?',
      answer: 'Yes, you maintain full control of your funds. You can sell your shares at current market prices anytime before the market resolves. Withdrawals are processed within 1-2 business days via bank transfer, debit card, or cryptocurrency. There are no withdrawal fees or minimum holding periods. Your funds are held in segregated, FDIC-insured accounts and are never used for company operations. You can also hold shares until market resolution to maximize potential profits if you believe the current price undervalues your position.'
    },
    {
      question: 'Do you offer API access?',
      answer: 'Yes, we provide comprehensive REST and WebSocket APIs for algorithmic trading. Our API supports real-time market data, order placement, portfolio management, and historical data access. Rate limits are generous (1000 requests/minute for Pro users) and we offer extensive documentation with code examples in Python, JavaScript, and other languages. Pro and Enterprise plans include priority API support. Many quantitative traders and hedge funds use our API to run sophisticated trading strategies. Contact our API team for specialized institutional access requirements.'
    }
  ];

  return (
    <div style={{
      fontFamily: '"Orbitron", "Rajdhani", sans-serif',
      background: '#000000',
      color: '#ffffff',
      minHeight: '100vh',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: #000000;
        }

        /* Advanced Animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(51, 181, 229, 0.3); }
          50% { box-shadow: 0 0 40px rgba(51, 181, 229, 0.6); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-bottom {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        .slide-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .slide-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .slide-bottom {
          animation: slide-in-bottom 0.8s ease-out;
        }

        .scale-up {
          animation: scale-up 0.6s ease-out;
        }

        /* Glassmorphism */
        .glass {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(51, 181, 229, 0.2);
        }

        .glass-strong {
          background: rgba(51, 181, 229, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(51, 181, 229, 0.3);
        }

        /* Hover Effects */
        .hover-glow {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .hover-glow:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(51, 181, 229, 0.4);
        }

        .hover-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, rgba(51, 181, 229, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .hover-glow:hover::before {
          opacity: 1;
        }

        /* Button Animations */
        .btn-primary {
          background: linear-gradient(135deg, #33b5e5, #5dd5ff);
          color: #000000;
          border: none;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 700;
          border-radius: 12px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Orbitron', sans-serif;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(51, 181, 229, 0.4);
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(51, 181, 229, 0.6);
        }

        .btn-secondary {
          background: transparent;
          color: #33b5e5;
          border: 2px solid #33b5e5;
          padding: 16px 40px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Orbitron', sans-serif;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #33b5e5, #5dd5ff);
          transition: left 0.4s ease;
          z-index: -1;
        }

        .btn-secondary:hover::before {
          left: 0;
        }

        .btn-secondary:hover {
          color: #000;
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(51, 181, 229, 0.6);
        }

        /* Stat Card Number Animation */
        .stat-number {
          background: linear-gradient(135deg, #33b5e5, #5dd5ff, #33b5e5);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        /* Modal Animation */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .modal-content {
          background: linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(26, 26, 26, 0.95));
          border: 2px solid rgba(51, 181, 229, 0.5);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 80px rgba(51, 181, 229, 0.6);
          position: relative;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #33b5e5, #5dd5ff);
          border-radius: 20px;
          z-index: -1;
          opacity: 0.3;
          filter: blur(10px);
        }

        .modal-content::-webkit-scrollbar {
          width: 8px;
        }

        .modal-content::-webkit-scrollbar-track {
          background: #0a0a0a;
          border-radius: 4px;
        }

        .modal-content::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #33b5e5, #5dd5ff);
          border-radius: 4px;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Stagger animations */
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }

        @media (max-width: 768px) {
          .modal-content {
            padding: 24px;
            max-height: 90vh;
          }
        }

        @media (max-width: 968px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>

      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isScrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(51, 181, 229, 0.3)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isScrolled ? '0 4px 30px rgba(51, 181, 229, 0.2)' : 'none'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="animate-float">
              <img 
                src="/logo.png" 
                alt="Poly Exchange Logo" 
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 30px rgba(51, 181, 229, 0.8))',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff, #33b5e5)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              animation: 'gradient-shift 3s ease infinite'
            }}>
              POLY EXCHANGE
            </div>
          </div>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
            {['Markets', 'How It Works', 'Features', 'Pricing', 'FAQ'].map((item) => (
              <a
                key={item}
                onClick={() => smoothScroll(item.toLowerCase().replace(/ /g, '-'))}
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  position: 'relative',
                  padding: '8px 0'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#33b5e5';
                  e.target.style.textShadow = '0 0 15px rgba(51, 181, 229, 1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#ffffff';
                  e.target.style.textShadow = 'none';
                }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => openModal('Sign In', 'Welcome back to Poly Exchange! Sign in to access your account, view your portfolio, and continue trading on the world\'s most accurate prediction markets. Your secure dashboard awaits with real-time market data and performance analytics.')}
              className="btn-secondary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              Sign In
            </button>
            <button
              onClick={() => openModal('Get Started', 'Create your Poly Exchange account in 4 simple steps: (1) Sign up with email or Google, (2) Verify your identity (KYC required for compliance), (3) Deposit funds via bank transfer, card, or crypto, (4) Start trading! Get a $10 welcome bonus on your first deposit of $50 or more. Join 150,000+ traders predicting the future.')}
              className="btn-primary"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'transparent',
              border: '2px solid #33b5e5',
              color: '#33b5e5',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            MENU
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(0, 0, 0, 0.98)',
            padding: '24px',
            borderTop: '1px solid rgba(51, 181, 229, 0.3)',
            backdropFilter: 'blur(20px)'
          }} className="mobile-nav">
            {['Markets', 'How It Works', 'Features', 'Pricing', 'FAQ'].map((item) => (
              <div
                key={item}
                onClick={() => smoothScroll(item.toLowerCase().replace(/ /g, '-'))}
                style={{
                  color: '#ffffff',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(51, 181, 229, 0.2)',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                {item}
              </div>
            ))}
            <button
              onClick={() => {
                openModal('Sign In', 'Welcome back to Poly Exchange! Sign in to access your account.');
                setMobileMenuOpen(false);
              }}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '16px' }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                openModal('Get Started', 'Create your account in 4 simple steps and get a $10 welcome bonus!');
                setMobileMenuOpen(false);
              }}
              className="btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
            >
              Get Started
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '180px 24px 120px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(51, 181, 229, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="scale-up" style={{
            fontSize: '80px',
            fontWeight: '900',
            marginBottom: '32px',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #33b5e5, #5dd5ff, #33b5e5)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            animation: 'gradient-shift 3s ease infinite',
            filter: 'drop-shadow(0 0 30px rgba(51, 181, 229, 0.5))'
          }}>
            PREDICT THE FUTURE
          </div>
          <div className="slide-bottom" style={{
            fontSize: '24px',
            color: '#b0b0b0',
            marginBottom: '48px',
            maxWidth: '800px',
            margin: '0 auto 60px',
            fontFamily: 'Rajdhani, sans-serif',
            fontWeight: '400',
            lineHeight: '1.8',
            animationDelay: '0.2s'
          }}>
            Trade on real-world events with the world's most accurate prediction markets. Join 150,000+ traders forecasting politics, crypto, finance, sports, and more.
          </div>

          <div className="slide-bottom" style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            marginBottom: '100px',
            animationDelay: '0.4s'
          }}>
            <button
              onClick={() => openModal('Start Trading Now', 'Ready to start trading on Poly Exchange? Create your account today and receive: $10 welcome bonus on first deposit, access to 1,200+ markets across 8 categories, real-time market data and analytics, instant settlement on winning trades, zero platform fees for the first month, 24/7 customer support. Sign up takes less than 3 minutes. Deposit via bank transfer, debit card, or cryptocurrency. Start predicting the future today!')}
              className="btn-primary"
              style={{ fontSize: '18px', padding: '20px 50px' }}
            >
              Start Trading Now
            </button>
            <button
              onClick={() => openModal('Learn More', 'Poly Exchange is the world\'s leading prediction market platform. Our markets aggregate the wisdom of thousands of traders to create the most accurate forecasts of future events. Trade on politics, cryptocurrency, finance, sports, entertainment, technology, science, and world events. Our platform features: instant settlement, deep liquidity, regulatory compliance, advanced analytics, mobile trading apps, API access, and 24/7 support. Markets are available across 8 major categories with new markets added daily.')}
              className="btn-secondary"
              style={{ fontSize: '18px', padding: '20px 50px' }}
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {[
              {
                value: '$2.5B+',
                label: 'Trading Volume',
                detail: 'Total volume breakdown: Politics $820M, Finance $680M, Crypto $520M, Sports $290M, Entertainment $120M, Technology $50M, Science $20M. Year-over-year growth: +145%. Month-over-month: +12%. Average daily volume: $8.2M across all markets.'
              },
              {
                value: '150K+',
                label: 'Active Traders',
                detail: 'Trader demographics: 85% retail, 15% institutional. Geographic distribution: 45% US, 25% Europe, 20% Asia, 10% other. Monthly growth: +8%. Average trades per user: 47/month. User retention rate: 76%. Community members: Twitter 89K, Discord 45K, Telegram 28K.'
              },
              {
                value: '98.3%',
                label: 'Accuracy Rate',
                detail: 'Accuracy calculation: Markets resolved correctly / total resolved markets. Compared to: Traditional polls (74% accuracy), Expert predictions (81% accuracy), Statistical models (88% accuracy). Accuracy by category: Politics 99.1%, Finance 98.8%, Crypto 97.2%, Sports 98.9%. Based on 10,000+ resolved markets. Academic research confirms prediction markets outperform all other forecasting methods.'
              },
              {
                value: '1,200+',
                label: 'Active Markets',
                detail: 'Markets by category: Politics 250, Finance 220, Sports 300, Crypto 180, Entertainment 150, Technology 120, Science 90, World Events 200. Market types: Binary 75%, Multi-outcome 20%, Scalar 5%. Average market lifecycle: 45 days. Daily new markets: 15-20. Total liquidity across markets: $125M. Markets with >$1M volume: 180.'
              }
            ].map((stat, index) => (
              <div
                key={index}
                onClick={() => openModal(stat.label, stat.detail)}
                className={`hover-glow glass-strong scale-up stagger-${index + 1}`}
                style={{
                  padding: '40px 28px',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  fontSize: '52px',
                  fontWeight: '900',
                  marginBottom: '12px',
                  lineHeight: '1'
                }} className="stat-number">
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#b0b0b0',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Categories */}
      <section id="markets" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              MARKET CATEGORIES
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Trade across 8 major categories with deep liquidity and instant settlement
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {marketCategories.map((category, index) => (
              <div
                key={index}
                className={`hover-glow glass slide-bottom stagger-${index + 1}`}
                style={{
                  padding: '36px',
                  borderRadius: '16px',
                  cursor: 'default',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <h3 style={{
                  fontSize: '32px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  fontSize: '15px',
                  color: '#b0b0b0',
                  marginBottom: '24px',
                  lineHeight: '1.7',
                  fontFamily: 'Rajdhani, sans-serif'
                }}>
                  {category.description}
                </p>
                <div className="glass" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                  padding: '20px',
                  borderRadius: '12px'
                }}>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#33b5e5' }}>{category.markets}</div>
                    <div style={{ fontSize: '12px', color: '#808080', textTransform: 'uppercase', letterSpacing: '1px' }}>Markets</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#33b5e5' }}>{category.volume}</div>
                    <div style={{ fontSize: '12px', color: '#808080', textTransform: 'uppercase', letterSpacing: '1px' }}>Volume</div>
                  </div>
                </div>
                <button
                  onClick={() => openModal(`${category.name} Markets`, category.details)}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '14px', padding: '14px' }}
                >
                  Explore Markets
                </button>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.05) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Markets */}
      <section style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              TRENDING MARKETS
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Most active prediction markets with the highest trading volume
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}>
            {trendingMarkets.map((market, index) => (
              <div
                key={index}
                className={`hover-glow glass-strong slide-bottom stagger-${index + 1}`}
                style={{
                  padding: '32px',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#33b5e5',
                    background: 'rgba(51, 181, 229, 0.15)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {market.category}
                  </div>
                  <div style={{
                    fontSize: '16px',
                    color: market.trend.startsWith('+') ? '#00ff88' : '#ff4444',
                    fontWeight: '700',
                    textShadow: market.trend.startsWith('+') ? '0 0 10px rgba(0, 255, 136, 0.5)' : '0 0 10px rgba(255, 68, 68, 0.5)'
                  }}>
                    {market.trend}
                  </div>
                </div>

                <h3 style={{
                  fontSize: '22px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  color: '#ffffff',
                  lineHeight: '1.4'
                }}>
                  {market.title}
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <div className="glass" style={{ padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#808080', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Volume</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#33b5e5' }}>{market.volume}</div>
                  </div>
                  <div className="glass" style={{ padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#808080', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Traders</div>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#33b5e5' }}>{market.traders}</div>
                  </div>
                </div>

                <div className="glass-strong" style={{
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#ffffff',
                    fontFamily: 'Rajdhani, sans-serif'
                  }}>
                    {market.probability}
                  </div>
                </div>

                <button
                  onClick={() => openModal(market.title, `${market.description}\n\nCategory: ${market.category}\nVolume: ${market.volume}\nTraders: ${market.traders}\n24h Trend: ${market.trend}\nLiquidity: ${market.liquidity}\n\n${market.payout}\n\nCurrent probabilities: ${market.probability}`)}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '14px', padding: '14px' }}
                >
                  Trade Now
                </button>
                
                <div style={{
                  position: 'absolute',
                  bottom: '-50%',
                  left: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              HOW IT WORKS
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Trade on real-world events in 5 simple steps
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {[
              {
                step: '01',
                title: 'Create Your Account',
                description: 'Sign up in under 3 minutes with your email or Google account. Complete quick identity verification for security and compliance. No complex forms or lengthy approval process.'
              },
              {
                step: '02',
                title: 'Deposit Funds',
                description: 'Add funds via bank transfer, debit card, or cryptocurrency. Minimum deposit just $10. Your funds are held in segregated, FDIC-insured accounts. Instant deposits available.'
              },
              {
                step: '03',
                title: 'Browse Markets',
                description: 'Explore 1,200+ active markets across politics, crypto, finance, sports, and more. Use filters to find markets matching your expertise and interests. View detailed analytics and historical data.'
              },
              {
                step: '04',
                title: 'Make Your Prediction',
                description: 'Buy shares in outcomes you believe will happen. If you\'re right, shares pay $1.00. If wrong, $0. Current price reflects probability. Trade anytime before market resolves.'
              },
              {
                step: '05',
                title: 'Collect Your Winnings',
                description: 'Markets resolve based on real-world outcomes. Winning shares automatically credited to your account. Withdraw anytime via bank transfer or crypto. No fees, no delays.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`hover-glow glass slide-${index % 2 === 0 ? 'left' : 'right'}`}
                style={{
                  padding: '40px',
                  borderRadius: '16px',
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  overflow: 'hidden',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div style={{
                  fontSize: '64px',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  opacity: '0.3',
                  lineHeight: '1',
                  minWidth: '100px'
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    color: '#ffffff',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '17px',
                    color: '#b0b0b0',
                    lineHeight: '1.8',
                    fontFamily: 'Rajdhani, sans-serif'
                  }}>
                    {item.description}
                  </p>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-20%',
                  width: '50%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.05) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>

          <div className="slide-bottom glass-strong animate-pulse-glow" style={{
            marginTop: '80px',
            padding: '50px',
            borderRadius: '20px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              THE SCIENCE
            </h3>
            <p style={{
              fontSize: '18px',
              color: '#b0b0b0',
              lineHeight: '1.9',
              maxWidth: '900px',
              margin: '0 auto',
              fontFamily: 'Rajdhani, sans-serif'
            }}>
              Prediction markets aggregate information from thousands of traders, creating the "wisdom of crowds" effect. Academic research shows they consistently outperform polls (98.3% vs 74% accuracy), expert predictions (98.3% vs 81%), and statistical models (98.3% vs 88%). When people risk real money, they research thoroughly and trade rationally. Market prices update instantly as new information emerges, making them the most accurate real-time forecasting tool available.
            </p>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(51, 181, 229, 0.03) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              PLATFORM FEATURES
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Advanced tools and features for serious traders
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '28px'
          }}>
            {[
              {
                title: 'Instant Settlement',
                description: 'Trades execute in milliseconds. Winning shares credited immediately upon market resolution. No delays, no waiting periods.'
              },
              {
                title: 'Market Intelligence',
                description: 'Real-time analytics, historical charts, sentiment indicators, and crowd wisdom metrics for every market.'
              },
              {
                title: 'Cross-Platform Trading',
                description: 'Trade seamlessly on web, iOS, and Android. Synchronized portfolio and watchlists across all devices.'
              },
              {
                title: 'Regulatory Compliance',
                description: 'CFTC registered, SOC 2 certified, FDIC-insured fund custody. Full KYC/AML compliance for your protection.'
              },
              {
                title: 'Zero Trading Fees',
                description: 'No commissions, no hidden fees. Pay only the spread. What you see is what you get.'
              },
              {
                title: 'Advanced Order Types',
                description: 'Market orders, limit orders, stop losses, and conditional orders. Professional trading tools for every strategy.'
              },
              {
                title: 'Global Markets',
                description: 'Trade on events worldwide across 8 major categories. New markets added daily based on trending topics.'
              },
              {
                title: 'Deep Liquidity',
                description: 'Automated market maker ensures you can always trade. Average spread under 2% on major markets.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`hover-glow glass scale-up stagger-${index + 1}`}
                style={{
                  padding: '36px',
                  borderRadius: '16px',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '16px',
                  color: '#b0b0b0',
                  lineHeight: '1.7',
                  fontFamily: 'Rajdhani, sans-serif'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-30%',
                  width: '80%',
                  height: '80%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.05) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              PRICING PLANS
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Choose the plan that fits your trading style
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                name: 'Standard',
                price: 'FREE',
                period: 'Forever',
                features: [
                  'Access to all markets',
                  'Real-time market data',
                  'Mobile apps (iOS & Android)',
                  'Basic analytics dashboard',
                  'Email support',
                  '$10 welcome bonus',
                  'Standard order types',
                  'Instant withdrawals'
                ],
                cta: 'Get Started Free',
                popular: false,
                description: 'Perfect for beginners and casual traders. Full access to all markets with no monthly fees. Free forever - no credit card required.'
              },
              {
                name: 'Pro',
                price: '$49',
                period: 'Per Month',
                features: [
                  'Everything in Standard',
                  'Advanced analytics & charts',
                  'API access (1000 req/min)',
                  'Priority customer support',
                  'Advanced order types',
                  'Portfolio analysis tools',
                  'Custom watchlists',
                  'Market insights newsletter'
                ],
                cta: 'Start Pro Trial',
                popular: true,
                description: 'For serious traders who want professional tools and deeper insights. 7-day free trial. Cancel anytime. Annual billing available at $490/year (save $100).'
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'Contact Sales',
                features: [
                  'Everything in Pro',
                  'Dedicated account manager',
                  'Custom API rate limits',
                  'White-label solutions',
                  'Institutional-grade custody',
                  'Custom market creation',
                  'Priority execution',
                  'Advanced risk management'
                ],
                cta: 'Contact Sales',
                popular: false,
                description: 'For institutions, hedge funds, and high-volume traders. Custom solutions tailored to your needs. Contact our enterprise team: enterprise@polyexchange.com or call +1 (555) 123-4567.'
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`hover-glow scale-up stagger-${index + 1}`}
                style={{
                  padding: '48px',
                  borderRadius: '20px',
                  background: plan.popular 
                    ? 'linear-gradient(135deg, rgba(51, 181, 229, 0.15), rgba(51, 181, 229, 0.08))'
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: plan.popular ? '2px solid #33b5e5' : '1px solid rgba(51, 181, 229, 0.3)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {plan.popular && (
                  <div className="animate-pulse-glow" style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                    color: '#000000',
                    padding: '8px 24px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '20px',
                    background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}>
                    {plan.name}
                  </h3>
                  <div style={{
                    fontSize: '56px',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '12px',
                    lineHeight: '1'
                  }}>
                    {plan.price}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#808080',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontWeight: '600'
                  }}>
                    {plan.period}
                  </div>
                </div>

                <div style={{ marginBottom: '36px' }}>
                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '14px 0',
                        borderBottom: idx < plan.features.length - 1 ? '1px solid rgba(51, 181, 229, 0.1)' : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                      }}
                    >
                      <span style={{ 
                        color: '#33b5e5', 
                        fontSize: '20px',
                        textShadow: '0 0 10px rgba(51, 181, 229, 0.5)'
                      }}>✓</span>
                      <span style={{
                        fontSize: '16px',
                        color: '#b0b0b0',
                        fontFamily: 'Rajdhani, sans-serif'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openModal(plan.name + ' Plan', plan.description)}
                  className={plan.popular ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', fontSize: '16px', padding: '16px' }}
                >
                  {plan.cta}
                </button>
                
                <div style={{
                  position: 'absolute',
                  bottom: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(51, 181, 229, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 className="slide-bottom" style={{
              fontSize: '56px',
              fontWeight: '900',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textTransform: 'uppercase',
              letterSpacing: '3px'
            }}>
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="slide-bottom" style={{ 
              fontSize: '20px', 
              color: '#b0b0b0', 
              fontFamily: 'Rajdhani, sans-serif',
              animationDelay: '0.2s'
            }}>
              Everything you need to know about Poly Exchange
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`glass slide-bottom stagger-${index + 1}`}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div
                  onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
                  style={{
                    padding: '28px 32px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    background: activeFAQ === index ? 'rgba(51, 181, 229, 0.1)' : 'transparent'
                  }}
                >
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#ffffff',
                    flex: 1,
                    lineHeight: '1.5'
                  }}>
                    {faq.question}
                  </h3>
                  <span style={{
                    fontSize: '28px',
                    color: '#33b5e5',
                    fontWeight: '700',
                    transition: 'transform 0.3s ease',
                    transform: activeFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)',
                    textShadow: '0 0 10px rgba(51, 181, 229, 0.5)'
                  }}>
                    +
                  </span>
                </div>
                {activeFAQ === index && (
                  <div
                    className="slide-bottom"
                    style={{
                      padding: '0 32px 28px',
                      fontSize: '17px',
                      color: '#b0b0b0',
                      lineHeight: '1.9',
                      fontFamily: 'Rajdhani, sans-serif'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
        <div className="glass-strong animate-pulse-glow" style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          textAlign: 'center',
          padding: '60px 40px',
          borderRadius: '20px'
        }}>
          <h2 className="slide-bottom" style={{
            fontSize: '48px',
            fontWeight: '900',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '3px'
          }}>
            STAY INFORMED
          </h2>
          <p className="slide-bottom" style={{
            fontSize: '20px',
            color: '#b0b0b0',
            marginBottom: '40px',
            fontFamily: 'Rajdhani, sans-serif',
            animationDelay: '0.2s'
          }}>
            Get weekly market insights, exclusive predictions, and platform updates
          </p>

          <form onSubmit={handleSubscribe} className="slide-bottom" style={{ 
            display: 'flex', 
            gap: '16px', 
            flexWrap: 'wrap',
            animationDelay: '0.4s'
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="glass"
              style={{
                flex: '1',
                minWidth: '280px',
                padding: '18px 24px',
                fontSize: '16px',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: 'Rajdhani, sans-serif',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '18px 48px' }}
              disabled={subscribed}
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          <p style={{
            fontSize: '14px',
            color: '#666',
            marginTop: '20px',
            fontFamily: 'Rajdhani, sans-serif'
          }}>
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '120px 24px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(51, 181, 229, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <h2 className="scale-up" style={{
            fontSize: '64px',
            fontWeight: '900',
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            lineHeight: '1.2'
          }}>
            READY TO START PREDICTING?
          </h2>
          <p className="slide-bottom" style={{
            fontSize: '22px',
            color: '#b0b0b0',
            marginBottom: '56px',
            fontFamily: 'Rajdhani, sans-serif',
            lineHeight: '1.7',
            animationDelay: '0.2s'
          }}>
            Join 150,000+ traders on the world's most accurate prediction market platform. Get your $10 welcome bonus today.
          </p>

          <div className="slide-bottom" style={{ 
            display: 'flex', 
            gap: '24px', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            animationDelay: '0.4s'
          }}>
            <button
              onClick={() => openModal('Create Free Account', 'Join Poly Exchange today and start trading in 3 simple steps: Sign up with email or Google (takes 30 seconds), complete quick identity verification (2-3 minutes), deposit funds and get your $10 welcome bonus. Minimum deposit: $10. Accepted payment methods: Bank transfer, debit card, Bitcoin, Ethereum, USDC. Withdrawals processed within 1-2 business days. 24/7 customer support available via live chat, email, and phone. Start predicting the future now!')}
              className="btn-primary"
              style={{ fontSize: '18px', padding: '20px 52px' }}
            >
              Create Free Account
            </button>
            <button
              onClick={() => openModal('Explore Markets', 'Browse 1,200+ active markets across 8 major categories: Politics (250+ markets), Finance (220+ markets), Sports (300+ markets), Crypto (180+ markets), Entertainment (150+ markets), Technology (120+ markets), Science (90+ markets), World Events (200+ markets). Filter by category, volume, popularity, or closing date. View detailed market analytics, historical charts, and crowd wisdom metrics. New markets added daily based on trending topics and user requests.')}
              className="btn-secondary"
              style={{ fontSize: '18px', padding: '20px 52px' }}
            >
              Explore Markets
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '80px 24px 40px',
        background: '#000000',
        borderTop: '1px solid rgba(51, 181, 229, 0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '48px',
            marginBottom: '60px'
          }}>
            <div>
              <div style={{
                fontSize: '28px',
                fontWeight: '900',
                marginBottom: '20px',
                background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '3px'
              }}>
                POLY EXCHANGE
              </div>
              <p style={{
                fontSize: '15px',
                color: '#808080',
                lineHeight: '1.7',
                fontFamily: 'Rajdhani, sans-serif'
              }}>
                The world's most accurate prediction market platform. Trade on politics, crypto, finance, sports, and more.
              </p>
            </div>

            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#33b5e5',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Markets
              </div>
              {['Politics', 'Crypto', 'Finance', 'Sports', 'Entertainment'].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: '15px',
                    color: '#808080',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#33b5e5';
                    e.target.style.textShadow = '0 0 10px rgba(51, 181, 229, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#808080';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#33b5e5',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Company
              </div>
              {['About Us', 'Careers', 'Press Kit', 'Blog', 'Contact'].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: '15px',
                    color: '#808080',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#33b5e5';
                    e.target.style.textShadow = '0 0 10px rgba(51, 181, 229, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#808080';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div>
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#33b5e5',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                Legal
              </div>
              {['Terms of Service', 'Privacy Policy', 'Risk Disclosure', 'Regulatory', 'Licenses'].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: '15px',
                    color: '#808080',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#33b5e5';
                    e.target.style.textShadow = '0 0 10px rgba(51, 181, 229, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#808080';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            padding: '32px 0',
            borderTop: '1px solid rgba(51, 181, 229, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#666',
              fontFamily: 'Rajdhani, sans-serif'
            }}>
              © 2024 Poly Exchange. All rights reserved. CFTC Registered • FDIC Insured • SOC 2 Certified
            </div>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['Twitter', 'Discord', 'Telegram', 'LinkedIn'].map((item) => (
                <div
                  key={item}
                  style={{
                    fontSize: '14px',
                    color: '#808080',
                    cursor: 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#33b5e5';
                    e.target.style.textShadow = '0 0 10px rgba(51, 181, 229, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#808080';
                    e.target.style.textShadow = 'none';
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{
            marginTop: '32px',
            padding: '24px',
            borderRadius: '12px'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#808080',
              lineHeight: '1.7',
              fontFamily: 'Rajdhani, sans-serif'
            }}>
              <strong style={{ color: '#33b5e5' }}>Risk Disclosure:</strong> Trading on prediction markets involves risk. The value of your positions can go to zero. Only trade what you can afford to lose. Poly Exchange is registered with the CFTC and complies with all applicable regulations. Markets are for informational and entertainment purposes. Not available in all jurisdictions. See Terms of Service for full details.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '28px'
            }}>
              <h3 style={{
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #33b5e5, #5dd5ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                flex: 1
              }}>
                {modalContent.title}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#33b5e5',
                  fontSize: '36px',
                  cursor: 'pointer',
                  padding: '0',
                  lineHeight: '1',
                  fontWeight: '300',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'rotate(90deg)';
                  e.target.style.textShadow = '0 0 20px rgba(51, 181, 229, 0.8)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'rotate(0deg)';
                  e.target.style.textShadow = 'none';
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              fontSize: '17px',
              color: '#b0b0b0',
              lineHeight: '1.9',
              whiteSpace: 'pre-line',
              fontFamily: 'Rajdhani, sans-serif'
            }}>
              {modalContent.content}
            </div>
            <button
              onClick={closeModal}
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '36px',
                padding: '16px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PolyExchange;