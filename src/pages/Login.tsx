import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // ⬅️ Return to previous page or home

  const handleLogin = () => {
    // You can set auth token or user context here if needed
    navigate(from, { replace: true }); // ⬅️ Go back to previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
