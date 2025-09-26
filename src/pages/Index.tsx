import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/hooks/use-toast";
import { analytics } from "@/lib/analytics";
import { performanceMonitor } from "@/lib/performance";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Start performance tracking
    performanceMonitor.markStart('page-render');
    
    // Track page view
    analytics.pageView('/');
    
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      performanceMonitor.markEnd('page-render');
    }, 100);
    
    // Analyze resource loading performance
    const analyzeTimer = setTimeout(() => {
      performanceMonitor.analyzeResources();
    }, 2000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(analyzeTimer);
    };
  }, []);

  const handleGetStarted = async () => {
    setIsLoading(true);
    performanceMonitor.markStart('user-interaction');
    analytics.buttonClick('Get Started', 'homepage');
    
    try {
      // Simulate API call or navigation logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Welcome to UWC Vote Connect!",
        description: "Your account setup is in progress. Check back soon for voting opportunities.",
      });
      
      analytics.track('user_onboarding_started', 'engagement');
      performanceMonitor.markEnd('user-interaction');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      analytics.error(errorMessage, 'onboarding');
      
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Unable to connect to our servers. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <main 
        className={`w-full max-w-md transition-all duration-700 ease-out ${
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        }`}
        role="main"
      >
        <Card className="card-enhanced hover-lift">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-primary mb-2 text-balance">
              UWC Vote Connect
            </CardTitle>
            <CardDescription className="text-lg text-balance">
              Your democratic participation platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-6 text-balance">
                Connect, vote, and make your voice heard in the UWC community.
              </p>
              
              <div 
                className="flex flex-wrap justify-center gap-2 mb-6"
                role="list"
                aria-label="Platform features"
              >
                <Badge 
                  variant="default"
                  role="listitem"
                  aria-label="Feature: Secure Voting"
                  className="hover-lift animate-bounce-gentle"
                  style={{ animationDelay: '0s' }}
                >
                  🔒 Secure Voting
                </Badge>
                <Badge 
                  variant="secondary"
                  role="listitem"
                  aria-label="Feature: Real-time Results"
                  className="hover-lift animate-bounce-gentle"
                  style={{ animationDelay: '0.2s' }}
                >
                  📊 Real-time Results
                </Badge>
                <Badge 
                  variant="outline"
                  role="listitem"
                  aria-label="Feature: Community Driven"
                  className="hover-lift animate-bounce-gentle"
                  style={{ animationDelay: '0.4s' }}
                >
                  🤝 Community Driven
                </Badge>
              </div>
              
              <Button 
                className="w-full glow-effect" 
                size="lg"
                onClick={handleGetStarted}
                disabled={isLoading}
                aria-describedby="get-started-description"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Setting up...
                  </>
                ) : (
                  "Get Started"
                )}
              </Button>
              
              <p 
                id="get-started-description" 
                className="text-xs text-muted-foreground mt-2 text-balance"
              >
                Click to begin your democratic journey with UWC
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;