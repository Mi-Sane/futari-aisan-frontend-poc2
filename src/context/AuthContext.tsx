"use client"

import { createContext, useState, useEffect, ReactNode } from "react";

type AuthContextType = {
  userId: string;
  coupleId: string;
  userName: string;
  setUserId: (id: string) => void;
  setCoupleId: (id: string) => void;
  setUserName: (userName: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  userId: "",
  coupleId: "",
  userName: "",
  setUserId: () => {},
  setCoupleId: () => {},
  setUserName: (userName: string) => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const [coupleId, setCoupleId] = useState("");
  const [userName, setUserName] = useState(""); 

  // 初回マウントで localStorage から読み込み
  useEffect(() => {
    const u = localStorage.getItem("userId");
    const c = localStorage.getItem("coupleId");
    const n = localStorage.getItem("userName");
    if (u) setUserId(u);
    if (c) setCoupleId(c);
    if (n) setUserName(n);
  }, []);

  // userId/coupleId が更新されるたびに localStorage に書き出し
  useEffect(() => { if (userId) localStorage.setItem("userId", userId); }, [userId]);
  useEffect(() => { if (coupleId) localStorage.setItem("coupleId", coupleId); }, [coupleId]);
  useEffect(() => { if (userName) localStorage.setItem("userName", userName); }, [userName]);

  return (
    <AuthContext.Provider value={{ userId, coupleId, userName, setUserId, setCoupleId, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
}