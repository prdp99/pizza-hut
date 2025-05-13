import { AuthContext } from "@/app/auth-provider";
import { useContext } from "react";

export default function useAuth() {
    return useContext(AuthContext);
}