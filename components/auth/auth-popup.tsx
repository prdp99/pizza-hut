'use client'
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";
import useAuth from "@/hooks/use-auth";

const AuthPopup = () => {
    const { isOpen, setIsOpen, togglePopup } = useAuth()
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Welcome</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="login">
                        <TabsList className="flex justify-center mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Signup</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <LoginForm />
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignupForm />
                        </TabsContent>

                    </Tabs>
                    <DialogFooter>
                        <Button variant="ghost" onClick={togglePopup}>
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AuthPopup;