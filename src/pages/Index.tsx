import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-primary mb-2">UWC Vote Connect</CardTitle>
          <CardDescription className="text-lg">
            Your democratic participation platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Connect, vote, and make your voice heard in the UWC community.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="default">Secure Voting</Badge>
              <Badge variant="secondary">Real-time Results</Badge>
              <Badge variant="outline">Community Driven</Badge>
            </div>
            <Button className="w-full" size="lg">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;