"use client";

import UserProvider from "@/context/UserContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
    console.log(children)
    return <>{children}</>
    // return <UserProvider>{children}</UserProvider>;
};

export default Providers;
