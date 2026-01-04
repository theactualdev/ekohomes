import "./App.css";

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <main className="body w-full flex flex-col items-center py-12 md:py-20 px-6 mx-30 flex-1">
        <div className="text flex flex-col items-center mb-12 md:mb-16 animate-fade-in justify-center">
          <h1 className="font-bold text-center text-3xl mb-4 leading-tight md:text-5xl">
            Welcome to <span className="text-sea-green">Ekohomesng</span>
          </h1>
          <p className="text-dark-gray text-xl md:text-2xl">
            How can we help you today?
          </p>
        </div>
        <div className="cta grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <a
            href="/shortlet"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-bed w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors"
                >
                  <path d="M2 4v16"></path>
                  <path d="M2 8h18a2 2 0 0 1 2 2v10"></path>
                  <path d="M2 17h20"></path>
                  <path d="M6 8v9"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Book a Shortlet</h2>
              <p className="text-dark-gray">
                Find luxurious short-term stays across Lagos
              </p>
              <div className="mt-6 text-primary font-medium group-hover:underline">
                Get Started
              </div>
            </div>
          </a>
          <a
            href="/sales"
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 animate-fade-in"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-house w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-3">Buy a Home</h2>
              <p className="text-muted-foreground">
                Discover your dream property in Lagos
              </p>
              <div className="mt-6 text-primary font-medium group-hover:underline">
                Get started →
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
