import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import ToasterProvider from "../toaster-provider";
import AuthProvider from "../auth-provider";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <main>
            <AuthProvider>
                <Navbar />
                {children}
                <Footer />
                <ToasterProvider />
            </AuthProvider>
        </main>
    );
}
