import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useGetUser from "@/hooks/useGetUser";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const user = useGetUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LocalHost}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      toast({
        title: "Logout successful",
        description: "Redirecting to login page",
      });
      setTimeout(() => {
        window.location.reload();
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            FLow Mailer
          </Link>
          <nav>
            {user?.email ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{user.name}</span>
                <Button variant="outline" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
