
const TextoEfectos = () => {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <h1 className="text-center text-2xl text-muted-foreground mb-16">
        Efectos de texto para "PazCar"
      </h1>
      
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* Efecto 1: Speed Lines / Motion Blur */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">1. Speed Lines - Líneas de velocidad</p>
          <div className="relative inline-block">
            <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-primary to-primary blur-sm animate-pulse" />
            <span className="absolute -left-12 top-1/2 -translate-y-1/2 mt-2 w-12 h-0.5 bg-gradient-to-r from-transparent to-primary/60 blur-sm" />
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 -mt-3 w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/40 blur-sm" />
            <h2 className="text-6xl md:text-8xl font-black tracking-tight italic">
              <span className="text-white">Paz</span>
              <span className="text-primary">Car</span>
            </h2>
          </div>
        </div>

        {/* Efecto 2: Neon Racing Glow */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">2. Neon Racing Glow - Brillo neón de carreras</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tight">
            <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Paz</span>
            <span 
              className="text-primary animate-pulse"
              style={{
                textShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary)), 0 0 80px hsl(var(--primary))'
              }}
            >
              Car
            </span>
          </h2>
        </div>

        {/* Efecto 3: Chrome / Metallic */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">3. Chrome Metallic - Cromado metálico</p>
          <h2 
            className="text-6xl md:text-8xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(180deg, #fff 0%, #a0a0a0 40%, #fff 50%, #606060 60%, #a0a0a0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Paz<span className="text-primary" style={{ WebkitTextFillColor: 'hsl(var(--primary))' }}>Car</span>
          </h2>
        </div>

        {/* Efecto 4: Skewed / Dynamic Angle */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">4. Dynamic Angle - Ángulo dinámico</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tight transform -skew-x-12">
            <span className="text-white">Paz</span>
            <span className="text-primary relative">
              Car
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary transform skew-x-12" />
            </span>
          </h2>
        </div>

        {/* Efecto 5: Racing Stripes */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">5. Racing Stripes - Franjas de carrera</p>
          <div className="relative inline-block">
            <div className="absolute inset-0 flex justify-center gap-1 opacity-20 overflow-hidden">
              <div className="w-4 h-full bg-primary transform -skew-x-12" />
              <div className="w-4 h-full bg-primary transform -skew-x-12" />
              <div className="w-4 h-full bg-primary transform -skew-x-12" />
            </div>
            <h2 className="relative text-6xl md:text-8xl font-black tracking-tight">
              <span className="text-white">Paz</span>
              <span className="text-primary">Car</span>
            </h2>
          </div>
        </div>

        {/* Efecto 6: Turbo / Speed Gradient */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground mb-4">6. Turbo Gradient - Gradiente turbo</p>
          <h2 className="text-6xl md:text-8xl font-black tracking-tight">
            <span 
              style={{
                background: 'linear-gradient(90deg, #ffffff 0%, #ff4444 50%, #ff0000 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PazCar
            </span>
          </h2>
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-16 h-1 bg-gradient-to-r from-white to-primary rounded-full" />
            <div className="w-8 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
            <div className="w-4 h-1 bg-primary/30 rounded-full" />
          </div>
        </div>

      </div>
      
      <div className="text-center mt-20">
        <a href="/" className="text-primary hover:underline">← Volver al inicio</a>
      </div>
    </div>
  );
};

export default TextoEfectos;
